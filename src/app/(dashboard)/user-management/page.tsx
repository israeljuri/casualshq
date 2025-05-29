'use client';

import React, { useState, useEffect } from 'react';
import { UserManagementDataTable } from '@/features/(dashboard)/components/userManagement/UserManagementTable';
import { UserFormModal } from '@/features/(dashboard)/components/userManagement/UserFormModal';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import {
  ManagedUser,
  UserFormValues,
} from '@/features/(dashboard)/types/userManagement.type';
import {
  managedUsersMockData,
  addManagedUser,
  updateManagedUser,
  deleteManagedUser,
  toggleUserStatus,
} from '@/features/(dashboard)/lib/userManagement.mockdata';
import { Button } from '@/components/molecules/Button';
import Image from 'next/image';

export default function UserManagementPage() {
  const pageTitle = 'User management';
  const pageDescription = 'Assign roles to members of your business.';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // User management state
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentUser, setCurrentUser] = useState<ManagedUser | undefined>(
    undefined
  );

  // Pagination state
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedUsers, setPaginatedUsers] = useState<ManagedUser[]>([]);

  // Load initial data
  useEffect(() => {
    setUsers(managedUsersMockData);
  }, []);

  // Pagination function
  const paginateData = (page: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = users.slice(start, end);

    setPaginatedUsers(paginatedItems);
    setTotalPages(Math.ceil(users.length / pageSize));
    setTotalItems(users.length);
  };

  // Fetch paginated data when currentPage or users change
  useEffect(() => {
    paginateData(currentPage);
  }, [currentPage, users]);

  // User management functions
  const handleAddUser = () => {
    setModalMode('add');
    setCurrentUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: ManagedUser) => {
    setModalMode('edit');
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const success = deleteManagedUser(userId);
    if (success) {
      // Update users state to reflect deletion
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId: string) => {
    const updatedUser = toggleUserStatus(userId);
    if (updatedUser) {
      // Update users state to reflect status change
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? updatedUser : u))
      );
    }
  };

  const handleFormSubmit = (values: UserFormValues) => {
    if (modalMode === 'add') {
      const newUser = addManagedUser({
        name: values.name,
        email: values.email,
        role: values.role,
      });
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    } else if (currentUser) {
      const userToUpdate = {
        ...currentUser,
        name: values.name,
        email: values.email,
        role: values.role,
      };
      const updatedUser = updateManagedUser(userToUpdate);
      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
      }
    }
    setIsModalOpen(false);
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
          onSidebarOpen={() => setIsSidebarOpen(true)}
          showSearch={true}
          showFilter={false}
          customActions={
            <Button
              onClick={handleAddUser}
              leftIcon={
                <Image
                  src="/admin-user-management/plus.svg"
                  alt="Add user"
                  width={16}
                  height={16}
                />
              }
            >
              Add user
            </Button>
          }
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UserManagementDataTable
            users={paginatedUsers}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            totalItems={totalItems}
            pageSize={pageSize}
          />

          {/* User form modal */}
          <UserFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            defaultValues={currentUser}
            mode={modalMode}
          />
        </div>
      </main>
    </div>
  );
}
