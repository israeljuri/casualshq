import { WageType } from '@/features/(dashboard)/types/staff.type';
import React from 'react';

const WageCard = ({ wageType }: { wageType: WageType }) => {
  const getWageType = () => {
    switch (wageType) {
      case 'manual':
        return <article className='bg-[#F9FAFB] border text-xs border-[#E4E7EC] px-1 py-1 text-[#667185] rounded-md'>Manual</article>;
      case 'team_based':
        return <article className='bg-[#F9FAFB] border text-xs border-[#E4E7EC] px-1 py-1 text-[#667185] rounded-md'>Team Based</article>;
      case 'award_rate':
        return <article className='bg-[#F9FAFB] border text-xs border-[#E4E7EC] px-1 py-1 text-[#667185] rounded-md'>Award Rate</article>;
      default:
        return <article className='bg-[#F9FAFB] border text-xs border-[#E4E7EC] px-1 py-1 text-[#667185] rounded-md'>N/A</article>;
    }
  };

  return getWageType();
};

export default WageCard;
