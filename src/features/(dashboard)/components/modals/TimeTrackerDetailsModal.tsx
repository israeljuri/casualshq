'use client';

import React, { useState } from 'react';
import { Staff } from '@/features/(dashboard)/types/staff.type';
import { Button } from '@/components/molecules/Button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/atoms/dialog';
import { DialogHeader } from '@/components/atoms/dialog';
import { Status } from '@/components/molecules/Status';

import { DateRange } from 'react-day-picker';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { DatePicker } from '@/components/molecules/DatePicker';

interface TimeEntry {
  date: string;
  clockIn: string;
  clockOut: string;
  break: string;
  hoursWorked: string;
  overtime: string;
}

interface TimeTrackerDetailsModalProps {
  staffMember: Staff | null;
  onClose: () => void;
  isOpen: boolean;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  saveRangeChanges: () => void;
}

const timeEntries: TimeEntry[] = [
  {
    date: '07/01/2025',
    clockIn: '9:12 AM',
    clockOut: '5:12 PM',
    break: '50 mins',
    hoursWorked: '8 hours',
    overtime: '2 hours',
  },
  {
    date: '06/01/2025',
    clockIn: '9:02 AM',
    clockOut: '5:02 PM',
    break: '45 mins',
    hoursWorked: '7 hours 45 mins',
    overtime: '1 hour 45 mins',
  },
  {
    date: '05/01/2025',
    clockIn: '9:00 AM',
    clockOut: '5:00 PM',
    break: '55 mins',
    hoursWorked: '8 hours',
    overtime: '1 hour',
  },
  {
    date: '04/01/2025',
    clockIn: '9:05 AM',
    clockOut: '5:05 PM',
    break: '52 mins',
    hoursWorked: '7 hours 52 mins',
    overtime: '1 hour 45 mins',
  },
  {
    date: '03/01/2025',
    clockIn: '9:12 AM',
    clockOut: '5:12 PM',
    break: '45 mins',
    hoursWorked: '7 hours 45 mins',
    overtime: '1 hour 45 mins',
  },
  {
    date: '02/01/2025',
    clockIn: '9:02 AM',
    clockOut: '5:02 PM',
    break: '55 mins',
    hoursWorked: '8 hours',
    overtime: '1 hour',
  },
  {
    date: '01/01/2025',
    clockIn: '9:00 AM',
    clockOut: '5:00 PM',
    break: '50 mins',
    hoursWorked: '7 hours 50 mins',
    overtime: '1 hour 50 mins',
  },
];

export const TimeTrackerDetailsModal: React.FC<
  TimeTrackerDetailsModalProps
> = ({
  staffMember,
  onClose,
  isOpen,
  saveRangeChanges,
  dateRange,
  onDateRangeChange,
}) => {
  const [localDateRange] = useState(dateRange);
  const getWage = (staffMember: Staff): string | number => {
    if (staffMember.wageType === 'manual') {
      if (staffMember.manualRatePerHour)
        return `$${staffMember.manualRatePerHour}/hr`;
      return 'N/A';
    } else if (staffMember.wageType === 'team_based') {
      if (staffMember.teamBasedRatePerHour)
        return `$${staffMember.teamBasedRatePerHour}/hr`;
      return 'N/A';
    } else if (staffMember.wageType === 'award_rate') {
      if (staffMember.awardBasedRatePerHour)
        return `$${staffMember.awardBasedRatePerHour}/hr`;
      return 'N/A';
    }
    return 'N/A';
  };
  if (!staffMember) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex flex-col justify-stretch w-full items-start sm:max-w-lg bg-white p-4 h-[calc(100vh-50px)] ">
        <DialogHeader className="px-4 pt-4 w-full">
          <DialogTitle className="text-xl font-medium">
            Staff details
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 py-6 space-y-5 overflow-y-auto flex-grow w-full">
          <ul className="space-y-5">
            <InfoItem
              label="Name"
              value={`${staffMember.firstName} ${staffMember.lastName}`}
              image="/admin-time/name.svg"
            />
            <InfoItem
              label="Email address"
              value={staffMember.email}
              image="/admin-time/email.svg"
            />
            <InfoItem
              label="Role"
              value={staffMember.role || 'N/A'}
              image="/admin-time/role.svg"
            />
            <InfoItem
              label="Team"
              value={staffMember.team || 'N/A'}
              image="/admin-time/team.svg"
            />
            <InfoItem
              label="Status"
              value={<Status status={staffMember.status} />}
              image="/admin-time/clock.svg"
            />
            <InfoItem
              label="Wage"
              value={getWage(staffMember)}
              image="/admin-time/wage.svg"
              others={
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Rate card
                </span>
              }
            />
          </ul>

          <div className="mt-8">
            <section className="flex gap-4 flex-wrap items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Timer History</h3>

              <div className="flex items-center gap-2">
                <DatePicker
                  variant="range"
                  initialDateRange={dateRange}
                  onDateRangeChange={(range) => {
                    onDateRangeChange(range);
                  }}
                />

                {localDateRange !== dateRange && (
                  <Button
                    onClick={saveRangeChanges}
                    variant="primary"
                    leftIcon={
                      <Image
                        src="/admin-time/save-white.svg"
                        alt=""
                        width={12}
                        height={12}
                      />
                    }
                  >
                    Save
                  </Button>
                )}
              </div>
            </section>

            <div className="overflow-x-auto">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock-in</TableHead>
                    <TableHead>Clock-out</TableHead>
                    <TableHead>Break</TableHead>
                    <TableHead>Hours worked</TableHead>
                    <TableHead>Overtime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {timeEntries.map((entry, index) => (
                    <TableRow
                      key={index}
                      className={index === 0 ? 'bg-gray-50' : ''}
                    >
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.clockIn}</TableCell>
                      <TableCell>{entry.clockOut}</TableCell>
                      <TableCell>{entry.break}</TableCell>
                      <TableCell>{entry.hoursWorked}</TableCell>
                      <TableCell>{entry.overtime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface InfoItemProps {
  label: string;
  value: string | number | React.ReactNode;
  image: string;
  others?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, image, others }) => (
  <li className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-4 items-start">
    <span className="flex items-center gap-2">
      {image && <Image src={image} alt="" width={22} height={22} />}
      <span className="text-[#98A2B3]">{label}</span>
    </span>
    <div className="flex items-center justify-start gap-2">
      <span>{value}</span>
      {others}
    </div>
  </li>
);
