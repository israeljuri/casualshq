'use client';

import useAlert from '@/hooks/useAlert';
import { resetPassword } from '../services/accountService';
 
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useResetPassword = () => {
  const alert = useAlert();
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert.showAlert('Password Changed', 'success', {
        subtext: 'Your new password has been set up to your account',
      });
      router.replace('/sign-in');
    },
    onError: (error) => {
      console.error('Password Reset failed (simulated):', error);
      alert.showAlert(error.name, 'error', {
        subtext: error.message,
      });
    },
  });
};
