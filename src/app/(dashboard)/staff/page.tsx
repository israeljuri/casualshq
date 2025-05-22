'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import { StaffListTable } from '@/features/(dashboard)/components/tables/StaffListTable';
import { AddStaffModal } from '@/features/(dashboard)/components/modals/AddStaffModal';
// import { ImportStaffModal } from '@/features/(dashboard)/components/modals/ImportStaffModal';

import { Button } from '@/components/molecules/Button';
import Image from 'next/image';

import { StaffDetailsModal } from '@/features/(dashboard)/components/modals/StaffDetailsModal';
import { StaffMember } from '@/features/(dashboard)/types';
// import { AdjustmentModalData } from '@/features/(dashboard)/types';
import { Filters } from '@/features/(dashboard)/types';
import { DateRange } from 'react-day-picker';
import { getStaffMockData, getTeamOptionsMockData } from '@/lib/mockData';

export default function StaffPage() {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  // const [currentAdjustmentData, setCurrentAdjustmentData] =
  //   useState<AdjustmentModalData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    teams: {},
    roles: {},
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    // Start of the month
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [staff, setStaff] = useState<StaffMember | null>(null);

  const openStaffSummaryModal = (staff: StaffMember) => {
    setStaff(staff);
    setIsStaffModalOpen(true);
  };
  const closeStaffSummaryModal = () => {
    setIsStaffModalOpen(false);
    setStaff(null);
  };

  const handleDeleteStaff = (id: string) => {
    // API Call to delete
    console.log(id);
  };

  const handleAddStaff = (
    data: Omit<StaffMember, 'id' | 'timeLogs' | 'latestAdjustment' | 'status'>
  ) => {
    // API Call to add
    console.log(data);
  };

  const pageTitle = 'Staff';
  const pageDescription = 'Manage staff profiles and track individual details.';

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
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {}}
                // TODO: Implement import staff
                // onClick={openImportStaffModal}
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
            {/* TODO: Implement error state */}

            {/* // !error && */}
            {/* // TODO: Get staffs from API */}
            {/* // [].length > 0 && */}
            {/* // TODO: Implement loading state  */}
            {/* // !isLoading && (   */}
            <StaffListTable
              // TODO: Get staffs from API
              staffMembers={getStaffMockData().data}
              isLoading={getStaffMockData().isLoading}
              // TODO: Implement edit, delete staff
              onEditStaff={() => {}}
              onDeleteStaff={() => {}}
              onViewDetails={(staffId) => openStaffSummaryModal(staffId)}
              // Pagination props
              // TODO: Implement pagination (currentPage, totalPages, onPageChange, totalStaffCount, pageSize)
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              totalStaffCount={0}
              pageSize={10}
            />
          </div>
        </section>
      </main>

      {isAddStaffModalOpen && (
        <AddStaffModal
          isOpen={isAddStaffModalOpen}
          onClose={() => setIsAddStaffModalOpen(false)}
          onSubmit={handleAddStaff}
          initialData={null}
          teamOptions={getTeamOptionsMockData().data}
        />
      )}

      {/* TODO: Implement import staff modal */}
      {/* {isImportStaffModalOpen && ( */}
      {/* <ImportStaffModal
        isOpen={false}
        onClose={() => {}}
        importStep={''}
        importedFile={null}
        staffToImport={[]}
        importError={''}
        importSummary={''}
        onFileSelect={() => {}}
        onRemoveStaffFromReview={() => {}}
        onConfirmImport={() => {}}
        onResetImport={() => {}}
        setImportStep={() => {}}
      /> */}
      {/* )} */}

      {isStaffModalOpen && staff && (
        <StaffDetailsModal
          staffMember={staff}
          onClose={closeStaffSummaryModal}
          onDelete={(id) => {
            closeStaffSummaryModal();
            handleDeleteStaff(id);
          }}
        />
      )}
    </div>
  );
}
