'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Button } from '@/components/molecules/Button';
import { Switch } from '@/components/atoms/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ManagedUser } from '@/features/(dashboard)/types/userManagement.type';

import { PaginationControls } from '../tables/PaginationControls';
import Image from 'next/image';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

interface UserManagementDataTableProps {
  users: ManagedUser[];

  onEditUser: (user: ManagedUser) => void;
  onDeleteUser: (userId: string) => void;
  onToggleStatus: (userId: string) => void;

  // Pagination props
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export function UserManagementDataTable({
  users,

  onEditUser,
  onDeleteUser,
  onToggleStatus,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: UserManagementDataTableProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleApprove = () => {
    setIsConfirmOpen(false);
    if (!userId) return;
    onDeleteUser(userId);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ConfirmDialog
        open={!!isConfirmOpen}
        onOpenChange={(open) => setIsConfirmOpen(open)}
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
                className="bg-[#D42620] hover:bg-[#D42620] focus:bg-[#D42620] text-white"
                size="md"
                onClick={handleApprove}
              >
                Delete
              </Button>
            </div>
          </article>
        }
      />
      <div className="w-full">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          {users.length > 0 ? (
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex items-center justify-between">
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => onToggleStatus(user.id)}
                      aria-label={
                        user.isActive ? 'Deactivate user' : 'Activate user'
                      }
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditUser(user)}>
                          <Image
                            src="/admin-user-management/edit.svg"
                            alt="Edit"
                            width={16}
                            height={16}
                          />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setUserId(user.id);
                            setIsConfirmOpen(true);
                          }}
                          className="text-red-600 hover:!text-red-600 hover:!bg-red-50 focus:!text-red-600 focus:!bg-red-50"
                        >
                          <Image
                            src="/admin-user-management/trash.svg"
                            alt="Delete"
                            width={16}
                            height={16}
                          />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableCaption aria-label="empty" className="py-20">
              <Image
                src="/table/empty-table.svg"
                alt="Empty state"
                width={100}
                height={100}
              />

              <h2 className="text-xl font-medium text-gray-700 my-2">
                No users found.
              </h2>
            </TableCaption>
          )}
        </Table>

        {totalItems > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={totalItems}
            pageSize={pageSize}
          />
        )}
      </div>
    </>
  );
}
