'use client';

import React, { useState } from 'react';

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
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [staffId, setStaffId] = useState<string | null>(null);

  const handleApprove = () => {
    setIsConfirmOpen(false);
    if (!staffId) return;
    onDeleteStaff(staffId);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ConfirmDialog
        open={!!isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        content={
          <article className="p-5 bg-white rounded-2xl">
            <article className="space-y-3">
              <h4 className="font-medium text-2xl text-black">Delete user</h4>
              <p className="text-base text-custom-gray">
                Are you sure you want to delete this user?
              </p>
            </article>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <Button
                variant="secondary"
                size="md"
                onClick={handleCancel}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleApprove}
                className="bg-[#D42620] text-white w-full hover:bg-[#D42620] active:bg-[#D42620]"
              >
                Delete
              </Button>
            </div>
          </article>
        }
      />
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email address</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Role</TableHead>
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
                  className="cursor-pointer hover:bg-slate-50 transition-colors duration-150 group"
                >
                  <TableCell onClick={() => onViewDetails(staff)}>
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
                    onClick={() => onViewDetails(staff)}
                    className={
                      staff.status === 'pending_onboarding'
                        ? 'text-gray-300'
                        : ''
                    }
                  >
                    {staff.email || '--'}
                  </TableCell>

                  <TableCell onClick={() => onViewDetails(staff)}>
                    {staff.team || '--'}
                  </TableCell>

                  <TableCell onClick={() => onViewDetails(staff)}>
                    {staff.role || '--'}
                  </TableCell>

                  <TableCell className="text-right">
                    <StaffActionDropdown
                      staff={staff}
                      onEdit={() => onEditStaff(staff.id)}
                      onDelete={() => {
                        setStaffId(staff.id);
                        setIsConfirmOpen(true);
                      }}
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
    </>
  );
};
