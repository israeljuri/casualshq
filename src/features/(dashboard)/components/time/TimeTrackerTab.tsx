/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/molecules/Table';
import { Button } from '@/components/molecules/Button';
import { SearchInput } from '@/components/molecules/SearchInput';
import { FilterDropdown } from '@/features/(dashboard)/components/FilterDropdown';
import { PaginationControls } from '@/features/(dashboard)/components/tables/PaginationControls';
import { Skeleton } from '@/components/atoms/skeleton';
import { DateRange } from 'react-day-picker';
import { Filters } from '@/features/(dashboard)/types';
import { SearchSchema, SearchData } from '@/features/(dashboard)/types/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/molecules/Form';

import { staffsMockData, getTeamOptionsMockData } from '@/lib/mockData';
import { Staff } from '@/features/(dashboard)/types/staff.type';
import { Checkbox } from '@/components/atoms/checkbox';
import { TimeTrackerDetailsModal } from '@/features/(dashboard)/components/modals/TimeTrackerDetailsModal';

// Define the structure for time tracker data
interface TimeTrackerData {
  id: string;
  firstName: string;
  lastName: string;
  team: string;
  totalHoursWorked: string;
  status: 'Approved' | 'Unapproved' | string;
}

// Props for the TimeTrackerTab component
interface TimeTrackerTabProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  onDateRangeSave: () => void;
}

export const TimeTrackerTab: React.FC<TimeTrackerTabProps> = ({
  dateRange,
  onDateRangeChange,
  onDateRangeSave
}) => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);


  useEffect(() => {
    console.log("Rendered!")
  }, [])

  // State for filters
  const [filters, setFilters] = useState<Filters>({
    teams: {},
    roles: {},
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  // State for data
  const [timeTrackerData, setTimeTrackerData] = useState<TimeTrackerData[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  // State for staff details modal
  const [selectedStaffMember, setSelectedStaffMember] = useState<Staff | null>(
    null
  );
  const [isStaffDetailsModalOpen, setIsStaffDetailsModalOpen] = useState(false);

  // Setup form for search
  const form = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: '',
    },
  });

  // Initialize mock data
  useEffect(() => {
    const data = staffsMockData.map((staff) => {
      // Calculate total hours worked from time logs
      const totalHoursWorked = calculateTotalHours(staff);

      // Randomly assign approval status for demo purposes
      const status = Math.random() > 0.5 ? 'Approved' : 'Unapproved';

      return {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        team: staff.team || 'Unassigned',
        totalHoursWorked,
        status,
      };
    });

    setTimeTrackerData(data);
  }, []);

  // Calculate total hours worked from time logs
  const calculateTotalHours = (staff: Staff): string => {
    let totalMinutes = 0;
    let totalHours = 0;

    staff.timeLogs.forEach((log) => {
      if (log.clockInTime && log.clockOutTime) {
        const clockIn = new Date(log.clockInTime);
        const clockOut = new Date(log.clockOutTime);

        // Calculate duration in minutes
        let durationMinutes =
          (clockOut.getTime() - clockIn.getTime()) / (1000 * 60);

        // Subtract break times
        log.breaks.forEach((breakItem) => {
          if (breakItem.from && breakItem.to) {
            const breakStart = new Date(breakItem.from);
            const breakEnd = new Date(breakItem.to);
            const breakDuration =
              (breakEnd.getTime() - breakStart.getTime()) / (1000 * 60);
            durationMinutes -= breakDuration;
          }
        });

        totalMinutes += durationMinutes;
      }
    });

    // Convert to hours and minutes
    totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = Math.round(totalMinutes % 60);

    // Format the output
    if (remainingMinutes > 0) {
      return `${totalHours} hours ${remainingMinutes} minutes`;
    }
    return `${totalHours} hours`;
  };

  // Handle search form submission
  const onSubmit: SubmitHandler<SearchData> = (data) => {
    if (data.search && data.search.trim().length > 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredData = timeTrackerData.filter(
          (item) =>
            `${item.firstName} ${item.lastName}`
              .toLowerCase()
              .includes(data.search.toLowerCase()) ||
            item.team.toLowerCase().includes(data.search.toLowerCase())
        );
        setTimeTrackerData(filteredData);
        setIsLoading(false);
        setHasSearched(true);
      }, 500);
    } else {
      // Reset to full data if search is cleared
      const data = staffsMockData.map((staff) => {
        const totalHoursWorked = calculateTotalHours(staff);
        const status = Math.random() > 0.5 ? 'Approved' : 'Unapproved';

        return {
          id: staff.id,
          firstName: staff.firstName,
          lastName: staff.lastName,
          team: staff.team || 'Unassigned',
          totalHoursWorked,
          status,
        };
      });

      setTimeTrackerData(data);
      setHasSearched(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Handle search result selection
  const handleSearchSelect = (resultId: string) => {
    const selectedResult = searchResults?.find((r) => r.id === resultId);
    if (selectedResult) {
      form.reset();
      setSearchTerm('');
    }
  };

  // Handle checkbox selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStaff(timeTrackerData.map((item) => item.id));
    } else {
      setSelectedStaff([]);
    }
    setAllSelected(checked);
  };

  // Handle individual checkbox selection
  const handleSelectStaff = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStaff((prev) => [...prev, id]);
    } else {
      setSelectedStaff((prev) => prev.filter((staffId) => staffId !== id));
    }
    setAllSelected(selectedStaff.length === timeTrackerData.length);
  };

  // Handle row click to open staff details modal
  const handleRowClick = (staffId: string) => {
    const staff = staffsMockData.find((staff) => staff.id === staffId);
    if (staff) {
      setSelectedStaffMember(staff);
      setIsStaffDetailsModalOpen(true);
    }
  };

  // Handle approve hours button click
  const handleApproveHours = () => {
    // In a real app, this would send a request to approve hours for selected staff
    console.log('Approving hours for:', selectedStaff);

    // Update local state for demo
    const updatedData = timeTrackerData.map((item) => {
      if (selectedStaff.includes(item.id)) {
        return { ...item, status: 'Approved' };
      }
      return item;
    });

    setTimeTrackerData(updatedData);
    setSelectedStaff([]);
  };

 

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return timeTrackerData.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();
  const totalPages = Math.ceil(timeTrackerData.length / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="grid grid-cols-[1fr_auto] items-start gap-4 w-full">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <SearchInput
                          hasSearched={hasSearched}
                          placeholder="Search by name..."
                          value={searchTerm}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            field.onChange(e);
                            handleSearchChange(e.target.value);
                          }}
                          isLoading={isLoading}
                          results={searchResults || []}
                          onResultSelect={handleSearchSelect}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex items-center justify-between gap-4">
          <FilterDropdown
            appliedFilters={filters}
            roleOptions={[]}
            teamOptions={getTeamOptionsMockData().data}
            statusOptions={[
              { value: 'Approved', label: 'Approved' },
              { value: 'Unapproved', label: 'Unapproved' },
            ]}
            onApplyFilters={(newFilters) => setFilters(newFilters)}
            onCancelFilters={() => setFilters({ teams: {}, roles: {} })}
          />

          {selectedStaff.length > 0 && (
            <Button onClick={handleApproveHours}>Approve hours</Button>
          )}
        </div>
      </div>

      {/* Empty State */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                className="border-olive-100"
                checked={allSelected}
                onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Total hours worked</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading && (
          <TableCaption>
            <Skeleton className="h-[calc(100vh-250px)]"></Skeleton>
          </TableCaption>
        )}

        {!isLoading && paginatedData.length === 0 && (
          <TableCaption className="py-10 text-base">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-center">
              <Image
                src="/table/empty-table.svg"
                alt="No information yet"
                width={90}
                height={90}
              />

              <p className="font-medium mt-6 mb-1.5 text-lg text-black">
                No time tracker data available.
              </p>

              <p className="font-medium text-[#667185] mb-8">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          </TableCaption>
        )}

        <TableBody>
          {!isLoading &&
            paginatedData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-slate-50 transition-colors duration-150 group cursor-pointer"
                onClick={() => handleRowClick(item.id)}
              >
                <TableCell className="w-12">
                  <Checkbox
                    className="border-olive-100"
                    checked={selectedStaff.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleSelectStaff(item.id, Boolean(checked))
                    }
                    aria-label="Select all rows"
                  />
                </TableCell>
                <TableCell>
                  <span>
                    {item.firstName} {item.lastName}
                  </span>
                </TableCell>
                <TableCell>{item.totalHoursWorked}</TableCell>
                <TableCell>{item.team}</TableCell>
                <TableCell>
                  {item.status === 'Approved' ? (
                    <span className="bg-green-100 text-green-700 py-1 px-4 rounded-full inline-block">
                      Approved
                    </span>
                  ) : (
                    <span className="bg-[#FBEAE9] text-[#9E0A05] py-1 px-4 rounded-full inline-block">
                      Unapproved
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {timeTrackerData.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={timeTrackerData.length}
          pageSize={pageSize}
        />
      )}

      {/* Staff Details Modal */}
      <TimeTrackerDetailsModal
        staffMember={selectedStaffMember}
        isOpen={isStaffDetailsModalOpen}
        onClose={() => setIsStaffDetailsModalOpen(false)}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        saveRangeChanges={onDateRangeSave}
      />
    </div>
  );
};
