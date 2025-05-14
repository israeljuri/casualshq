'use client';

import { useQuery } from '@tanstack/react-query';

import useAlert from '@/hooks/useAlert';
import { getStaffById } from '../services/onboardingService';

export const useGetStaff = (id: string) => {
  const alert = useAlert();

  try {
    const result = useQuery({
      queryKey: ['staff'],
      queryFn: () => getStaffById(id),
    });

    if (result.error) {
      alert.showAlert(result.error.name, 'error', {
        subtext: result.error.message,
      });

      return result;
    }

    return result;
  } catch (error) {
    if (error instanceof Error)
      alert.showAlert(error.name, 'error', { subtext: error.message });
  }
};
