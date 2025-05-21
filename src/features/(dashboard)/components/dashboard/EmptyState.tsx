import React from 'react';
import { GripHorizontal } from 'lucide-react'; // Using a different icon for variety

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-center p-6 border border-dashed border-slate-300 rounded-lg bg-slate-50">
      <div className="p-5 bg-slate-200 rounded-full mb-5">
        <GripHorizontal size={40} className="text-slate-500" />
      </div>
      <h2 className="text-xl font-semibold text-slate-700 mb-1.5">
        No metrics available
      </h2>
      <p className="text-slate-500 max-w-md">
        It looks like there&apos;s no data to display for the current filters or time range.
        Try adjusting your filters or check back once data is available.
      </p>
    </div>
  );
};
