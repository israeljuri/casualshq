import React from 'react';
import { StaffStatusNew } from '@/features/(dashboard)/types';

export const Status = ({status}: {status: StaffStatusNew}) => {
  const getStatus = () => {
    if (status === 'clocked_in')
      return <article className="bg-green-100 text-green-700 py-1 px-4 rounded-full inline-block">Clocked In</article>;

    if (status === 'clocked_out')
      return <article className="bg-red-100 text-red-700 py-1 px-4 rounded-full inline-block">Clocked Out</article>;

    return <article className="bg-yellow-100 text-yellow-700 py-1 px-4 rounded-full inline-block">Pending Onboarding</article>;
  };

  return getStatus();
};
