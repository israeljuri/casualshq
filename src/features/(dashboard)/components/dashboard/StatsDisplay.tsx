import React from 'react';
import { StatCard } from './StatsCard';

import { Skeleton } from '@/components/atoms/skeleton';
import { StatsData } from '../../types';

interface StatsDisplayProps {
  stats: StatsData;
  isLoading: boolean;
}

const getTitle = (key: string) => {
  switch (key) {
    case 'totalActiveStaff':
      return 'Total Active Staff';
    case 'hoursWorkedThisWeek':
      return 'Hours Worked This Week';
    case 'grossWagesThisWeek':
      return 'Gross Wages This Week';
    case 'pendingAdjustments':
      return 'Pending Adjustments';
    default:
      return key;
  }
};

const getValue = (key: string, item: StatsData[keyof StatsData]) => {
  switch (key) {
    case 'totalActiveStaff':
      return item.value.toLocaleString();
    case 'hoursWorkedThisWeek':
      return item.value.toLocaleString();
    case 'grossWagesThisWeek':
      return `$${item.value.toLocaleString()}`;
    case 'pendingAdjustments':
      return item.value.toLocaleString();
    default:
      return item.value.toLocaleString();
  }
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-44"></Skeleton>
        <Skeleton className="h-44"></Skeleton>
        <Skeleton className="h-44"></Skeleton>
        <Skeleton className="h-44"></Skeleton>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(stats).map(([key, item]) => {
        return (
          <StatCard
            value={getValue(key, item)}
            key={key}
            stat={item}
            title={getTitle(key)}
          />
        );
      })}
    </div>
  );
};
