import { useQuery } from '@tanstack/react-query';
import { getStaffById } from '@/features/(staff)/services/staffService';
import { Staff } from '../types';

export const useGetStaff = (id: string) => {
  return useQuery<Staff>({
    queryKey: ['staff'],
    queryFn: () => getStaffById(id),
  });
};
