import React from 'react';
import { StatCard } from './StatsCard';
import { StatsHookData } from '../../hooks/useStatsData';
import { Skeleton } from '@/components/atoms/skeleton';

interface StatsDisplayProps {
  stats: StatsHookData;
  isLoading: boolean;
}

const getTitle = (key: string) => {
  switch (key) {
    case 'totalActiveStaff':
      return 'Total Active Staff';
    case 'hoursWorkedThisPeriod':
      return 'Hours Worked This Period';
    case 'grossWagesThisPeriod':
      return 'Gross Wages This Period';
    case 'pendingAdjustments':
      return 'Pending Adjustments';
    default:
      return key;
  }
};

const getValue = (key: string, value: number) => {
  console.log({ key, value });

  switch (key) {
    case 'totalActiveStaff':
      return `${value} staff`;
    case 'hoursWorkedThisPeriod':
      return `${value} hours`;
    case 'grossWagesThisPeriod':
      return `${value.toLocaleString()}`;
    case 'pendingAdjustments':
      return `${value.toLocaleString()}`;
    default:
      return `${value}`;
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
      {Object.entries(stats).map(([key, value]) => {
        if (key === '__typename') {
          return;
        }

        return (
          <StatCard
            value={getValue(key, value.value)}
            key={key}
            stat={value}
            title={getTitle(key)}
          />
        );
      })}
    </div>
  );
};
