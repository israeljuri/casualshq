/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createAccountWithGoogle } from '../services/accountService';
import useAlert from '@/hooks/useAlert';
import { useMainOnboardingStore } from '@/store/mainOnboardingStore';

export const useCreateAccountWithGoogle = () => {
  const router = useRouter();
  const alert = useAlert();
  const resetOnboarding = useMainOnboardingStore((state) => state.resetOnboarding);

  return useMutation({
    mutationFn: (googleToken: string) => createAccountWithGoogle(googleToken),
    onSuccess: () => {
      // alert.showAlert('Signed-Up with Google successfully', 'success', {
      //   subtext: 'Redirecting you to dashboard',
      // });

      resetOnboarding();
      router.replace('/dashboard');
    },
    onError: (error: any) => {
      console.error('Google account creation failed:', error);
      alert.showAlert('Google Sign-Up Failed', 'error', {
        subtext: error.message,
      });
    },
  });
};
