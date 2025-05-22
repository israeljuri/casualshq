'use client';

import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import { StatsDisplay } from '@/features/(dashboard)/components/dashboard/StatsDisplay';
import { HoursWorkedChart } from '@/features/(dashboard)/components/charts/HoursWorkedChart';
import { WageDistributionPieChart } from '@/features/(dashboard)/components/charts/WageDistributionPieChart';
import { AdjustmentsTable } from '@/features/(dashboard)/components/dashboard/AdjustmentsTable';
import { AdjustmentRequestModal } from '@/features/(dashboard)/components/modals/AdjustmentRequestModal';
import { AdjustmentModalData, Filters } from '@/features/(dashboard)/types';

import useAlert from '@/hooks/useAlert';

import { DateRange } from 'react-day-picker';

// MOCK DATA
import {
  getAdjustmentsMockData,
  getDashboardStatsMockData,
  getHoursWorkedMockData,
  getWageDistributionMockData,
} from '@/lib/mockData';

const result = getHoursWorkedMockData();
console.log({ result });

export default function AdminDashboardPage() {
  const alert = useAlert();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [currentAdjustmentData, setCurrentAdjustmentData] =
    useState<AdjustmentModalData | null>(null);
  const [filters, setFilters] = useState<Filters>({
    teams: {},
    roles: {},
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    // Start of the month
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const handleOpenAdjustmentModal = useCallback((data: AdjustmentModalData) => {
    setCurrentAdjustmentData(data);
    setIsAdjustmentModalOpen(true);
  }, []);

  const handleCloseAdjustmentModal = useCallback(() => {
    setIsAdjustmentModalOpen(false);
    setCurrentAdjustmentData(null);
  }, []);

  // Placeholder actions for modal
  const handleApproveAdjustment = (data: AdjustmentModalData) => {
    console.log('Approved:', data);
    alert.showAlert('Approve', 'success', {
      subtext: `Approving adjustment for ${data?.name}`,
    });
  };

  const handleDenyAdjustment = (data: AdjustmentModalData) => {
    console.log('Denied:', data);
    alert.showAlert('Deny', 'success', {
      subtext: `Denying adjustment for ${data?.name}`,
    });
  };

  // Placeholder actions for table row buttons
  const handleApproveAdjustmentFromTable = (staffId: string) => {
    alert.showAlert('Approve', 'success', {
      subtext: `Approving adjustment for ${staffId}`,
    });
  };

  const handleDenyAdjustmentFromTable = (staffId: string) => {
    alert.showAlert('Deny', 'success', {
      subtext: `Denying adjustment for ${staffId}`,
    });
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activePath={pathname} // Pass current path
        />

        <main className="flex-1 flex flex-col overflow-y-auto">
          <Header
            pageTitle="Dashboard"
            pageDescription="Track staff performance and manage team operations."
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
                startDate: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1
                ),
                endDate: new Date(),
              });
            }}
            onSidebarOpen={() => setIsSidebarOpen(true)}
          />

          <section className="container mx-auto">
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="mb-6 md:mb-8">
                <StatsDisplay
                  stats={getDashboardStatsMockData().stats}
                  isLoading={getDashboardStatsMockData().isLoading}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] mb-6 md:mb-8">
                <HoursWorkedChart
                  data={getHoursWorkedMockData().data}
                  isLoading={getHoursWorkedMockData().isLoading}
                />

                <WageDistributionPieChart
                  data={getWageDistributionMockData().data}
                  isLoading={getWageDistributionMockData().isLoading}
                />
              </div>

              <AdjustmentsTable
                adjustments={getAdjustmentsMockData().data}
                onOpenModal={handleOpenAdjustmentModal}
                onApprove={handleApproveAdjustmentFromTable}
                onDeny={handleDenyAdjustmentFromTable}
                isLoading={getAdjustmentsMockData().isLoading}
              />
            </div>
          </section>
        </main>
      </div>
      
      <AdjustmentRequestModal
        isOpen={isAdjustmentModalOpen}
        onClose={handleCloseAdjustmentModal}
        data={currentAdjustmentData}
        onApprove={handleApproveAdjustment}
        onDeny={handleDenyAdjustment}
      />
    </>
  );
}
