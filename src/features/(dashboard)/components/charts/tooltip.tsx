/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

export const CustomBarTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-4 rounded-md shadow-lg text-sm">
        <p className="font-semibold mb-1">{dataPoint.name || label}</p>
        <p className="text-xs text-slate-400">Hours worked</p>
        <p className="text-lg font-bold">{`${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export const CustomPieTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-md shadow-lg text-sm">
        <p className="font-semibold">{`${payload[0].name}`}</p>
        <p>{`Wages: $${payload[0].value.toLocaleString()}`}</p>
        {/* <p>{`Percentage: ${(payload[0].percent * 100).toFixed(0)}%`}</p> */}
      </div>
    );
  }
  return null;
};
