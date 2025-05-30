'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import { StaffListTable } from '@/features/(dashboard)/components/tables/StaffListTable';
import { AddStaffModal } from '@/features/(dashboard)/components/modals/AddStaffModal';
import { ImportStaffModal } from '@/features/(dashboard)/components/modals/ImportStaffModal';

import { Button } from '@/components/molecules/Button';
import Image from 'next/image';

import { StaffDetailsModal } from '@/features/(dashboard)/components/modals/StaffDetailsModal';
 
import { DateRange } from 'react-day-picker';
import { getRoleOptionsMockData, getTeamOptionsMockData, staffsMockData } from '@/lib/mockData';
import { getPaginatedStaffList } from '@/features/(dashboard)/lib/utils';
import { Staff } from '@/features/(dashboard)/types/staff.type';
import { Filters } from '@/features/(dashboard)/types';

export default function StaffPage() {
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle = 'Staff';
  const pageDescription = 'Manage staff profiles and track individual details.';
  const pageSize = 2;

  // Utils
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    teams: {},
    roles: {},
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    // Start of the month
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  // Modals
  const [isImportStaffModalOpen, setIsImportStaffModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  // Modals data
  const [staff, setStaff] = useState<Staff | null>(null);

  // Table data
  const [isLoading, setIsLoading] = useState(false);
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStaffCount, setTotalStaffCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const paginateData = (page: number) => {
    setIsLoading(true);
    const result = getPaginatedStaffList(staffsMockData, page, pageSize);
    setStaffMembers(result.data);
    setTotalPages(result.totalPages);
    setTotalStaffCount(result.totalStaffCount);
    setIsLoading(false);
  };

  useEffect(() => {
    paginateData(currentPage);
  }, [currentPage]);

  const openStaffSummaryModal = (staff: Staff) => {
    setStaff(staff);
    setIsStaffModalOpen(true);
  };

  const handleDeleteStaff = (id: string) => {
    // TODO: implement API call
    console.log(id)
  };

  const handleEditStaff = (staffId: string) => {
    router.push(`/staff/${staffId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath={pathname}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          appliedFilters={filters}
          dateRange={dateRange}
          onDateRangeChange={(range) => {
            setDateRange(range);
          }}
          onApplyFilters={(filters) => {
            setFilters({
              ...filters,
            });
          }}
          onCancelFilters={() => {
            setFilters({
              teams: {},
              roles: {},
            });
            setDateRange({
              from: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
              ),
              to: new Date(),
            });
          }}
          onSidebarOpen={() => setIsSidebarOpen(true)}
          showDatePicker={false}
          // Custom action buttons for Staff page
          customActions={
            <div className="flex items-center flex-wrap w-full gap-4">
              <Button
                variant="secondary"
                onClick={() => setIsImportStaffModalOpen(true)}
                leftIcon={
                  <Image
                    src="/admin-staff/import.svg"
                    alt="Import"
                    width={20}
                    height={20}
                  />
                }
              >
                Import staff
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsAddStaffModalOpen(true)}
                leftIcon={
                  <Image
                    src="/admin-staff/plus.svg"
                    alt="Import"
                    width={20}
                    height={20}
                  />
                }
              >
                Add staff
              </Button>
            </div>
          }
        />

        <section className="container mx-auto">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <StaffListTable
              staffMembers={staffMembers}
              isLoading={isLoading}
              onAddStaff={() => setIsAddStaffModalOpen(true)}
              onEditStaff={(staffId) => handleEditStaff(staffId)}
              onDeleteStaff={(id) => handleDeleteStaff(id)}
              onViewDetails={(staffId) => openStaffSummaryModal(staffId)}
              // Pagination props
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              totalStaffCount={totalStaffCount}
              pageSize={pageSize}
            />
          </div>
        </section>
      </main>

      {isAddStaffModalOpen && (
        <AddStaffModal
          isOpen={isAddStaffModalOpen}
          onClose={() => setIsAddStaffModalOpen(false)}
          teamOptions={getTeamOptionsMockData().data}
          roleOptions={getRoleOptionsMockData().data}
        />
      )}

      {isImportStaffModalOpen && (
        <ImportStaffModal
          isOpen={isImportStaffModalOpen}
          onClose={() => setIsImportStaffModalOpen(false)}
        />
      )}

      {isStaffModalOpen && staff && (
        <StaffDetailsModal
          staffMember={staff}
          isOpen={isStaffModalOpen}
          onClose={() => {
            setIsStaffModalOpen(false);
            setStaff(null);
          }}
          onEdit={(staffId) => {
            handleEditStaff(staffId);
          }}
          onDelete={(id) => {
            handleDeleteStaff(id);
          }}
        />
      )}
    </div>
  );
}
