'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';

import { DateRange } from 'react-day-picker';

import { staffsMockData } from '@/lib/mockData';
import { format, parseISO } from 'date-fns';
import { ClockInsTab } from '@/features/(dashboard)/components/time/ClockInsTab';
import { TimeTrackerTab } from '@/features/(dashboard)/components/time/TimeTrackerTab';
import { ActivityLogTab } from '@/features/(dashboard)/components/time/ActivityLogTab';
import { AdjustmentsRequestTab } from '@/features/(dashboard)/components/time/AdjustmentsRequestTab';

export default function TimePage() {
  const pathname = usePathname();
  const pageTitle = 'Time';
  const pageDescription =
    'Monitor and manage staff clock-ins, breaks, and hours worked in real-time.';

  // Utils
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('clock-ins');

  const [dateRange, setDateRange] = useState<DateRange>({
    // Start of the month
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  // Table data
  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // As requested in the TODO

  // Stats
  const [totalClockedIn] = useState(25);
  const [staffOnBreak] = useState(8);
  const [hoursLoggedToday] = useState(152);
  const [hoursLoggedWeek] = useState(800);

  // Process staff data to get the latest clock-in time
  const processStaffData = () => {
    return staffsMockData.map((staff) => {
      // Find the latest time log
      const sortedTimeLogs = [...staff.timeLogs].sort((a, b) => {
        return (
          new Date(b.clockInTime).getTime() - new Date(a.clockInTime).getTime()
        );
      });

      const latestTimeLog = sortedTimeLogs[0];

      // Format clock-in time for display
      const clockInTime = latestTimeLog
        ? format(parseISO(latestTimeLog.clockInTime), 'h:mm a')
        : 'N/A';

      return {
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        team: staff.team || 'Unassigned',
        status: staff.status,
        breakType: latestTimeLog?.breaks?.[0]?.type,
        clockInTime,
        latestTimeLog,
      };
    });
  };

  // Get paginated data
  const getPaginatedData = () => {
    const processedData = processStaffData();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return processedData.slice(startIndex, endIndex);
  };

  const totalStaffCount = staffsMockData.length;
  const totalPages = Math.ceil(totalStaffCount / pageSize);

  const renderClockInsTab = () => {
    const paginatedData = getPaginatedData();
    return (
      <ClockInsTab
        data={paginatedData}
        isLoading={isLoading}
        totalPages={totalPages}
        totalStaffCount={totalStaffCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      />
    );
  };

  const renderTimeTrackerTab = () => (
    <TimeTrackerTab
      dateRange={dateRange}
      onDateRangeChange={(range) => setDateRange(range)}
      onDateRangeSave={() => {
        // TODO: Save date range to API
      }}
    />
  );

  const renderAdjustmentRequestsTab = () => {
    return <AdjustmentsRequestTab />;
  };

  const renderActivityLogTab = () => <ActivityLogTab />;

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
          dateRange={dateRange}
          onDateRangeChange={(range) => {
            setDateRange(range);
          }}
          onSidebarOpen={() => setIsSidebarOpen(true)}
          showDatePicker={true}
          showFilter={false}
          showSearch={false}
        />

        <section className="container mx-auto">
          <div className="flex-1 px-4 sm:px-6 lg:px-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Total staff clocked in
                </h3>
                <p className="text-3xl font-medium">
                  {totalClockedIn.toLocaleString()} staff
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
                <h3 className="text-sm text-gray-500 mb-2">Staff on break</h3>
                <p className="text-3xl font-medium">
                  {staffOnBreak.toLocaleString()} staff
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Total hours logged today
                </h3>
                <p className="text-3xl font-medium">
                  {hoursLoggedToday.toLocaleString()} hours
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-4">
                <h3 className="text-sm text-gray-500 mb-2">
                  Total hours logged this week
                </h3>
                <p className="text-3xl font-medium">
                  {hoursLoggedWeek.toLocaleString()} hours
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex flex-wrap space-x-8">
                <button
                  onClick={() => setActiveTab('clock-ins')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'clock-ins'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Clock Ins
                </button>
                <button
                  onClick={() => setActiveTab('time-tracker')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'time-tracker'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Time tracker
                </button>
                <button
                  onClick={() => setActiveTab('adjustment-requests')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'adjustment-requests'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Adjustment Requests
                </button>
                <button
                  onClick={() => setActiveTab('activity-log')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'activity-log'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Activity Log
                </button>
              </nav>
            </div>

            {/* Content */}
            <div>
              {activeTab === 'clock-ins' && renderClockInsTab()}
              {activeTab === 'time-tracker' && renderTimeTrackerTab()}
              {activeTab === 'adjustment-requests' &&
                renderAdjustmentRequestsTab()}
              {activeTab === 'activity-log' && renderActivityLogTab()}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
