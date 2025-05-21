'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import {
  BarChartFilterPeriod,
  DataPoint,
  HoursWorkedChartProps,
} from '@/features/(dashboard)/types';
import { cn } from '@/lib/utils'; // Assuming global cn utility
import { CustomBarTooltip } from './tooltip';
import { Skeleton } from '@/components/atoms/skeleton';

const CHART_FILTERS: { label: string; value: BarChartFilterPeriod }[] = [
  { label: '12 Months', value: '12m' },
  { label: '30 Days', value: '30d' },
  { label: '7 days', value: '7d' },
  { label: '24 hours', value: '24h' },
];

export const HoursWorkedChart: React.FC<HoursWorkedChartProps> = ({
  data: hoursWorkedData,
  isLoading,
}) => {
  const [period, setPeriod] = useState<BarChartFilterPeriod>('12m');
  const getBarSize = () => {
    switch (period) {
      case '12m':
        return 35;
      case '30d':
        return 20;
      case '7d':
      case '24h':
      default:
        return Math.max(15, 200 / 1); // Dynamic for fewer bars
    }
  };

  let data: DataPoint[] = [];
  let totalHours = 0;

 

  if (!isLoading && hoursWorkedData) {
    switch (period) {
      case '12m':
        data = hoursWorkedData.last12Months.dataPoints.map((point) => ({
          label: point.label,
          value: point.value,
        }));
        totalHours = hoursWorkedData.last12Months.totalHoursWorked;
        break;
      case '30d':
        data = hoursWorkedData.last30Days.dataPoints.map((point) => ({
          label: point.label,
          value: point.value,
        }));
        totalHours = hoursWorkedData.last30Days.totalHoursWorked;
        break;
      case '7d':
        data = hoursWorkedData.last7Days.dataPoints.map((point) => ({
          label: point.label,
          value: point.value,
        }));
        totalHours = hoursWorkedData.last7Days.totalHoursWorked;
        break;
      case '24h':
        data = hoursWorkedData.last24Hours.dataPoints.map((point) => ({
          label: point.label,
          value: point.value,
        }));
        totalHours = hoursWorkedData.last24Hours.totalHoursWorked;
        break;
      default:
        data = hoursWorkedData.last24Hours.dataPoints.map((point) => ({
          label: point.label,
          value: point.value,
        }));
        totalHours = hoursWorkedData.last24Hours.totalHoursWorked;
        break;
    }
  }

  return (
    <Card className="border-olive-100">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="font-medium text-xl">Hours worked</CardTitle>
          <div className="rounded-lg border overflow-hidden flex items-center text-sm">
            {CHART_FILTERS.map((filter) => (
              <button
                key={filter.value}
                className={cn(
                  'cursor-pointer py-2 px-3 text-primary',
                  period === filter.value &&
                    'bg-[#E8EDEB] text-primary font-medium'
                )}
                onClick={() => setPeriod(filter.value)}
                disabled={isLoading}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <CardDescription className="flex flex-col gap-1 mt-2">
          <span className="text-3xl font-medium mb-2 text-slate-800">
            {isLoading ? (
              <Skeleton className="h-8"></Skeleton>
            ) : (
              totalHours.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })
            )}
          </span>
          <span className="text-[#98A2B3]">Total hours worked</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] relative">
        {isLoading ? (
          <Skeleton className="h-full"></Skeleton>
        ) : data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(value) => value.toLocaleString()}
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                width={80} // Give Y-axis more space for larger numbers
              />
              <Tooltip
                content={<CustomBarTooltip />}
                cursor={{ fill: 'rgba(203, 213, 225, 0.3)' }}
              />
              <Bar
                dataKey="value"
                fill="#9DB2AA"
                radius={[8, 8, 0, 0]}
                barSize={getBarSize()}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-slate-500">No data available for this period.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
