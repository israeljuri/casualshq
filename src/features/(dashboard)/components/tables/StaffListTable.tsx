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

import { StaffMember } from '@/features/(dashboard)/types';

import { PaginationControls } from './PaginationControls';
import { StaffActionDropdown } from './StaffActionDropdown';
import { Button } from '@/components/molecules/Button';

interface StaffListTableProps {
  staffMembers: StaffMember[];
  isLoading: boolean;
  onEditStaff: (staff: StaffMember) => void;
  onDeleteStaff: (staffId: string) => void;
  onViewDetails: (staffId: StaffMember) => void;
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
  currentPage,
  totalPages,
  onPageChange,
  totalStaffCount,
  pageSize,
}) => {
  return (
    <div className="">
      <Table>
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
                onClick={() => {}}
                // TODO: Implement add staff
                // onClick={() => openAddStaffModal()}
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
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email address</TableHead>
            <TableHead>Team</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            staffMembers.map((staff) => (
              <TableRow
                key={staff.id}
                onClick={() => onViewDetails(staff)}
                className="cursor-pointer hover:bg-slate-50 transition-colors duration-150 group"
              >
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {staff.status !== 'active' && (
                      <Image
                        src="/admin-staff/warning.svg"
                        alt="Pending onboarding"
                        width={16}
                        height={16}
                        className="text-yellow-500"
                        title="Pending onboarding"
                      />
                    )}
                    <span
                      className={
                        staff.status !== 'active' ? 'text-gray-300' : ''
                      }
                    >
                      {staff.firstName} {staff.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={staff.status !== 'active' ? 'text-gray-300' : ''}
                >
                  {staff.email || 'N/A'}
                </TableCell>
                <TableCell>{staff.team || 'N/A'}</TableCell>

                <TableCell className="text-right">
                  <StaffActionDropdown
                    staff={staff}
                    onEdit={onEditStaff}
                    onDelete={onDeleteStaff}
                    onViewDetails={onViewDetails}
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
