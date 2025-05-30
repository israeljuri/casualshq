'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Define the types for activity log entries
type ActivityType = 'clock-in' | 'clock-out' | 'break' | 'adjustment';

interface ActivityLogEntry {
  id: string;
  timestamp: string;
  adminName?: string;
  staffName: string;
  type: ActivityType;
  details?: {
    from?: string;
    to?: string;
  };
  isManual?: boolean;
}

// Mock data for the activity log based on the image
const activityLogMockData: ActivityLogEntry[] = [
  {
    id: '1',
    timestamp: '5:20 PM • January 7, 2025',
    adminName: 'Admin (Bolaji Folarin)',
    staffName: 'Oluwaseun Adebayo',
    type: 'adjustment',
    details: {
      from: '5:20 PM',
      to: '5:15 PM',
    },
  },
  {
    id: '2',
    timestamp: '5:15 PM • January 7, 2025',
    staffName: 'Chinwe Okeke',
    type: 'clock-out',
  },
  {
    id: '3',
    timestamp: '8:50 AM • January 7, 2025',
    adminName: 'Admin (Bolaji Folarin)',
    staffName: 'Oluwaseun Adebayo',
    type: 'clock-in',
    isManual: true,
  },
  {
    id: '4',
    timestamp: '12:15 PM • January 7, 2025',
    staffName: 'Ibrahim Yusuf',
    type: 'break',
  },
  {
    id: '5',
    timestamp: '8:30 AM • January 7, 2025',
    staffName: 'Temitope Ige',
    type: 'clock-in',
  },
];

export const ActivityLogTab: React.FC = () => {
  // Group activities by day
  const today = activityLogMockData.slice(0, 5); // First 5 entries for today
  const thisWeek = activityLogMockData; // All entries for this week (same data for demo)

  // Function to render activity icon based on type
  const renderActivityIcon = (type: ActivityType) => {
    return (
      <div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full bg-gray-100',
          {
            'bg-[#FBEAE9]': type === 'clock-out',
            'bg-[#E7F6EC]': type === 'clock-in',
            'bg-[#FEF6E7]': type === 'break',
            'bg-[#E8EDEB]': type === 'adjustment',
          }
        )}
      >
        <Image
          src="/admin-time/clock-alt.svg"
          alt="Clock"
          width={22}
          height={22}
        />
      </div>
    );
  };

  // Function to render activity description based on type
  const renderActivityDescription = (activity: ActivityLogEntry) => {
    switch (activity.type) {
      case 'adjustment':
        return (
          <>
            <span className="font-medium">{activity.adminName}</span> adjusted{' '}
            <span className="font-medium">{activity.staffName}</span> clock-out
            time from {activity.details?.from} to {activity.details?.to}
          </>
        );
      case 'clock-out':
        return (
          <>
            <span className="font-medium">{activity.staffName}</span> clocked
            out at {activity.timestamp.split('•')[0].trim()}
          </>
        );
      case 'clock-in':
        if (activity.isManual) {
          return (
            <>
              <span className="font-medium">{activity.adminName}</span> manually
              clocked in{' '}
              <span className="font-medium">{activity.staffName}</span> at{' '}
              {activity.timestamp.split('•')[0].trim()}
            </>
          );
        }
        return (
          <>
            <span className="font-medium">{activity.staffName}</span> clocked in
            at {activity.timestamp.split('•')[0].trim()}
          </>
        );
      case 'break':
        return (
          <>
            <span className="font-medium">{activity.staffName}</span> started
            break at {activity.timestamp.split('•')[0].trim()}
          </>
        );
      default:
        return null;
    }
  };

  // Function to render activity entries
  const renderActivityEntries = (activities: ActivityLogEntry[]) => {
    return activities.map((activity) => (
      <div key={activity.id} className="flex items-start gap-3 py-4">
        {renderActivityIcon(activity.type)}
        <div className="flex flex-col">
          <p className="text-gray-700">{renderActivityDescription(activity)}</p>
          <p className="text-gray-500 mt-1">{activity.timestamp}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Today's activities */}
      <div>
        <h3 className="font-medium mb-4">Today</h3>
        <div className="space-y-0 divide-y divide-gray-100">
          {renderActivityEntries(today)}
        </div>
      </div>

      {/* This week's activities */}
      <div>
        <h3 className="font-medium mb-4">This week</h3>
        <div className="space-y-0 divide-y divide-gray-100">
          {renderActivityEntries(thisWeek)}
        </div>
      </div>
    </div>
  );
};
