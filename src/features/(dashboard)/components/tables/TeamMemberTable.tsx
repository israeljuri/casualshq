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

import { TeamMemberDisplay } from '@/features/(dashboard)/types/teams.type';
import { PaginationControls } from './PaginationControls';
// import { TeamMemberActionDropdown } from './TeamMemberActionDropdown';
import { Skeleton } from '@/components/atoms/skeleton';

interface TeamMemberTableProps {
  teamMembers: TeamMemberDisplay[];
  isLoading: boolean;
  onEditMember: (memberId: string) => void;
  onDeleteMember: (memberId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalMemberCount: number;
  pageSize: number;
}

export const TeamMemberTable: React.FC<TeamMemberTableProps> = ({
  teamMembers,
  isLoading,
  // onEditMember,
  // onDeleteMember,
  currentPage,
  totalPages,
  onPageChange,
  totalMemberCount,
  pageSize,
}) => {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Wage ($)</TableHead>
            {/* <TableHead></TableHead> */}
          </TableRow>
        </TableHeader>

        {isLoading && (
          <TableCaption>
            <Skeleton className="h-[calc(100vh-250px)]"></Skeleton>
          </TableCaption>
        )}

        {!isLoading && teamMembers.length === 0 && (
          <TableCaption className="py-10 text-base">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-center ">
              <Image
                src="/table/empty-table.svg"
                alt="No team members found"
                width={90}
                height={90}
              />

              <p className="font-medium mt-6 mb-1.5 text-lg text-black">
                No team members added yet.
              </p>

              <p className="font-medium text-[#667185] mb-8">
                Add staff members to this team to begin.
              </p>
            </div>
          </TableCaption>
        )}

        <TableBody>
          {!isLoading &&
            teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <span>
                    {member.firstName} {member.lastName}
                  </span>
                </TableCell>
                <TableCell>{member.email || 'N/A'}</TableCell>
                <TableCell>{member.role || 'N/A'}</TableCell>
                <TableCell>${member.effectiveWage.toFixed(2)}</TableCell>
                {/* <TableCell>
                  <TeamMemberActionDropdown
                    member={member}
                    onEdit={onEditMember}
                    onDelete={onDeleteMember}
                  />
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {totalMemberCount > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalMemberCount}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
