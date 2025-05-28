'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/molecules/Table';
import Image from 'next/image';

import { Staff } from '@/features/(dashboard)/types/staff.type';

import { PaginationControls } from './PaginationControls';
import { StaffActionDropdown } from './StaffActionDropdown';
import { Button } from '@/components/molecules/Button';
import { StaffNameDropdown } from './StaffNameDropdown';
import { Skeleton } from '@/components/atoms/skeleton';

interface StaffListTableProps {
  staffMembers: Staff[];
  isLoading: boolean;
  onEditStaff: (staffId: string) => void;
  onDeleteStaff: (staffId: string) => void;
  onViewDetails: (staffMember: Staff) => void;
  onAddStaff: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalStaffCount: number;
  pageSize: number;
}

export const StaffListTable: React.FC<StaffListTableProps> = ({
  staffMembers,
  isLoading,
  onEditStaff,
  onDeleteStaff,
  onViewDetails,
  onAddStaff,
  currentPage,
  totalPages,
  onPageChange,
  totalStaffCount,
  pageSize,
}) => {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email address</TableHead>
            <TableHead>Team</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading && (
          <TableCaption>
            <Skeleton className="h-[calc(100vh-250px)]"></Skeleton>
          </TableCaption>
        )}

        {!isLoading && staffMembers.length === 0 && (
          <TableCaption className="py-10 text-base">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-center ">
              <Image
                src="/table/empty-table.svg"
                alt="No staff members found"
                width={90}
                height={90}
              />

              <p className="font-medium mt-6 mb-1.5 text-lg text-black">
                No staff member added yet.
              </p>

              <p className="font-medium text-[#667185] mb-8">
                Import a CSV containing staff details or add staff manually to
                begin.
              </p>

              <Button
                variant="primary"
                onClick={() => onAddStaff()}
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
          </TableCaption>
        )}

        <TableBody>
          {!isLoading &&
            staffMembers.map((staff) => (
              <TableRow
                key={staff.id}
                onClick={() => onViewDetails(staff)}
                className="cursor-pointer hover:bg-slate-50 transition-colors duration-150 group"
              >
                <TableCell>
                  {staff.status !== 'pending_onboarding' && (
                    <span>
                      {staff.firstName} {staff.lastName}
                    </span>
                  )}
                  {staff.status === 'pending_onboarding' && (
                    <StaffNameDropdown
                      name={`${staff.firstName} ${staff.lastName}`}
                    />
                  )}
                </TableCell>

                <TableCell
                  className={
                    staff.status === 'pending_onboarding' ? 'text-gray-300' : ''
                  }
                >
                  {staff.email || 'N/A'}
                </TableCell>

                <TableCell>{staff.team || 'N/A'}</TableCell>

                <TableCell className="text-right">
                  <StaffActionDropdown
                    staff={staff}
                    onEdit={onEditStaff}
                    onDelete={onDeleteStaff}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {totalStaffCount > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalStaffCount}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
