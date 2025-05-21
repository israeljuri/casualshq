'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import { StatsDisplay } from '@/features/(dashboard)/components/dashboard/StatsDisplay';
import { HoursWorkedChart } from '@/features/(dashboard)/components/charts/HoursWorkedChart';
import { WageDistributionPieChart } from '@/features/(dashboard)/components/charts/WageDistributionPieChart';
import { AdjustmentsTable } from '@/features/(dashboard)/components/dashboard/AdjustmentsTable';
import { AdjustmentRequestModal } from '@/features/(dashboard)/components/modals/AdjustmentRequestModal';
import { AdjustmentModalData } from '@/features/(dashboard)/types';

import useAlert from '@/hooks/useAlert';

import { useHoursWorkedData } from '@/features/(dashboard)/hooks/useHoursWorkedData';
import { useWageDistributionData } from '@/features/(dashboard)/hooks/useWageDistributionData';
import { useRecentAdjustments } from '@/features/(dashboard)/hooks/useRecentAdjustments';

import { useStatsData } from '@/features/(dashboard)/hooks/useStatsData';
import { DateRange } from 'react-day-picker';

interface AppliedFilters {
  teams: Record<string, boolean>;
  roles: Record<string, boolean>;
 
}

export default function AdminDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [currentAdjustmentData, setCurrentAdjustmentData] =
    useState<AdjustmentModalData | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    teams: {},
    roles: {},
 
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  }); 
 
  const alert = useAlert();
  const pathname = usePathname(); // Get current path

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

  // Fetch hours worked data from GraphQL API
  const {
    data: hoursWorkedData,
    isLoading: isHoursDataLoading,
    error: hoursDataError,
  } = useHoursWorkedData({
    filter: {
      // startDate: dateRange?.startDate?.toISOString() || '',
      // endDate: dateRange?.endDate?.toISOString() || '',
      teams: appliedFilters.teams|| [],
      roles: appliedFilters.roles || [],
    },
  });

  // Fetch wage distribution data from GraphQL API
  const {
    data: wageDistributionData,
    isLoading: isWageDataLoading,
    error: wageDataError,
  } = useWageDistributionData({
    filter: {
      startDate: dateRange?.startDate?.toISOString() || '',
      endDate: dateRange?.endDate?.toISOString() || '',
      teams: appliedFilters.teams || [],
      roles: appliedFilters.roles || [],
    },
  });

  // Fetch recent adjustments data from GraphQL API
  const {
    adjustments,
    isLoading: isAdjustmentsLoading,
    error: adjustmentsError,
  } = useRecentAdjustments();

  const {
    data: statsData,
    isLoading: isStatsLoading,
    error: statsError,
  } = useStatsData();

  // console.log({ statsData, wageDistributionData, hoursWorkedData});

  // Handle errors from API
  useMemo(() => {
    if (hoursDataError) {
      alert.showAlert('Error loading hours chart data', 'error', {
        subtext: hoursDataError.message,
      });
    }
    if (wageDataError) {
      alert.showAlert('Error loading wage distribution data', 'error', {
        subtext: wageDataError.message,
      });
    }
    if (adjustmentsError) {
      alert.showAlert('Error loading recent adjustments data', 'error', {
        subtext: adjustmentsError.message,
      });
    }
    if (statsError) {
      alert.showAlert('Error loading stats data', 'error', {
        subtext: statsError.message,
      });
    }
  }, [
    // hoursDataError,
    wageDataError,
    adjustmentsError,
    statsError,
    alert,
  ]);

  const renderDashboardContent = () => (
    <>
      <div className="mb-6 md:mb-8">
        <StatsDisplay stats={statsData} isLoading={isStatsLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] mb-6 md:mb-8">
        <HoursWorkedChart
          data={hoursWorkedData}
          isLoading={isHoursDataLoading}
        />
       

        <WageDistributionPieChart
          data={wageDistributionData}
          isLoading={isWageDataLoading}
        />
      </div>

      <AdjustmentsTable
        adjustments={adjustments}
        onOpenModal={handleOpenAdjustmentModal}
        onApprove={handleApproveAdjustmentFromTable}
        onDeny={handleDenyAdjustmentFromTable}
        isLoading={isAdjustmentsLoading}
      />
    </>
  );

  return (
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
          appliedFilters={appliedFilters}
          dateRange={dateRange}
          onDateRangeChange={(range) => {
            setDateRange(range);
          }}
          onApplyFilters={(filters) => {
            setAppliedFilters({
              ...filters,
            });
          }}
          onCancelFilters={() => {
            setAppliedFilters({
              teams: {},
              roles: {},
            });
            setDateRange({
              startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              endDate: new Date(),
            });
          }}
          onSidebarOpen={() => setIsSidebarOpen(true)}
          
        />

        <section className="container mx-auto">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {renderDashboardContent()}
          </div>
        </section>
      </main>

      <AdjustmentRequestModal
        isOpen={isAdjustmentModalOpen}
        onClose={handleCloseAdjustmentModal}
        data={currentAdjustmentData}
        onApprove={handleApproveAdjustment}
        onDeny={handleDenyAdjustment}
      />
    </div>
  );
}
