import React from 'react';
import { StaffStatus } from '@/features/(dashboard)/types/staff.type';

export const Status = ({
  status,
  breakType,
}: {
  status: StaffStatus;
  breakType?: string;
}) => {
  const getStatus = () => {
    if (status === 'on_break') {
      return (
        <div className="flex items-center gap-2">
          <article className="bg-[#FEF6E7] text-[#865503] py-1 px-4 rounded-full inline-block">
            On break
          </article>
          {breakType && (
            <span className="bg-gray-100 text-gray-700 py-1 px-2 rounded-sm text-xs capitalize">
              {breakType}
            </span>
          )}
        </div>
      );
    }
    if (status === 'clocked_in')
      return (
        <article className="bg-green-100 text-green-700 py-1 px-4 rounded-full inline-block">
          Clocked In
        </article>
      );

    if (status === 'clocked_out')
      return (
        <article className="bg-[#FBEAE9] text-[#9E0A05] py-1 px-4 rounded-full inline-block">
          Clocked Out
        </article>
      );

    return (
      <article className="bg-yellow-100 text-yellow-700 py-1 px-4 rounded-full inline-block">
        Pending Onboarding
      </article>
    );
  };

  return getStatus();
};
