'use client';

import useAlert from '@/hooks/useAlert';
import { signIn } from '../services/accountService';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useSignIn = () => {
  const alert = useAlert();
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      alert.showAlert('Signed-In successfully', 'success', {
        subtext: 'Redirecting you to dashboard',
      });
      router.replace('/dashboard');
    },
    onError: (error) => {
      console.error('Password Reset failed (simulated):', error);
      alert.showAlert(error.name, 'error', {
        subtext: error.message,
      });
    },
  });
};
