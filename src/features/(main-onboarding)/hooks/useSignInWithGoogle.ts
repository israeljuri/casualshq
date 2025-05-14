/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createAccountWithGoogle } from '../services/accountService';
import useAlert from '@/hooks/useAlert';
import { useMainOnboardingStore } from '@/store/mainOnboardingStore';

export const useSignInWithGoogle = (redirectTo: string) => {
  const router = useRouter();
  const alert = useAlert();
  const resetOnboarding = useMainOnboardingStore(
    (state) => state.resetOnboarding
  );

  return useMutation({
    mutationFn: (googleToken: string) => createAccountWithGoogle(googleToken),
    onSuccess: () => {
      // alert.showAlert('Signed-In with Google successfully', 'success', {
      //   subtext: 'Redirecting you to dashboard',
      // });
      resetOnboarding();
      router.replace(redirectTo);
    },
    onError: (error: any) => {
      console.error('Google account sign in failed:', error);
      alert.showAlert('Google Sign-In Failed', 'error', {
        subtext: error.message,
      });
    },
  });
};
