import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';

import Image from 'next/image';
import { StatValue } from '@/features/(dashboard)/graphql/queries/stats';

interface StatCardProps {
  stat: StatValue;

  title: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, title, value }) => {
  return (
    <Card className="border-olive-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#98A2B3]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-slate-800">{value}</div>

        <div className="flex items-center justify-between space-x-2">
          <p
            className={`text-md ${
              (stat.positiveChange && 'text-green-500') ||
              (!stat.positiveChange && 'text-red-500')
            }`}
          >
            {stat.positiveChange ? '+' : '-'}
            {stat.percentageChange} in the last month
          </p>
          <Image
            src={
              stat.positiveChange
                ? '/admin-dashboard/positive-trend.svg'
                : '/admin-dashboard/negative-trend.svg'
            }
            alt={stat.positiveChange ? 'Positive trend' : 'Negative trend'}
            width={40}
            height={40}
          />
        </div>
      </CardContent>
    </Card>
  );
};
