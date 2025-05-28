'use client';
import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { CustomPieTooltip } from './tooltip';

import { PieChartDataItem } from '@/features/(dashboard)/types/dashboard.type';
import { Skeleton } from '@/components/atoms/skeleton';

// Define pie chart colors - shades of olive green (#5C6D66)
const PIE_CHART_COLORS = [
  '#D8E0DD',
  '#9DB2AA',
  '#8AA399',
  '#738880',
  '#5C6D66',
];

interface WageDistributionPieChartProps {
  data?: PieChartDataItem[]; // Make data optional, default to constant
  isLoading: boolean;
}

export const WageDistributionPieChart: React.FC<
  WageDistributionPieChartProps
> = ({ data = [], isLoading }) => {
  // Generate chart data with colors
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Add colors to the data
    return data.map((item, index) => ({
      ...item,
      color: PIE_CHART_COLORS[index % PIE_CHART_COLORS.length] // Cycle through colors
    }));
  }, [data]);
  
  // If data is empty or loading, show a placeholder or loading state

  return (
    <Card className="border-olive-100">
      <CardHeader>
        <CardTitle className="font-medium text-xl">
          Wage distribution by department
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[350px] relative">
        {isLoading ? (
          <Skeleton className="absolute w-[90%] h-[calc(100%-200px)]"></Skeleton>
        ) : chartData && chartData.length > 0 ? (
          <>
            <div className="w-full mt-4 space-y-1">
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-700">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-slate-500">No wage data available.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
