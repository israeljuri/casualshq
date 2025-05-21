/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createAccount } from '../services/accountService';
import useAlert from '@/hooks/useAlert';
import {   useOnboardingStore } from '@/store/onboarding.store';

import { CreateAccountInput } from '../types';
import { UseFormReturn } from 'react-hook-form';

export const useCreateAccount = ({ form }: { form: UseFormReturn }) => {
  const router = useRouter();
  const alert = useAlert();
  const resetOnboarding = useOnboardingStore(
    (state) => state.resetOnboarding
  );

  return useMutation({
    mutationFn: (data: CreateAccountInput) => createAccount(data),
    onSuccess: () => {
      // alert.showAlert('Account created successfully', 'success', {
      //   subtext: 'Redirecting you to dashboard',
      // });
      resetOnboarding();
      router.replace('/');
    },
    onError: (error: any) => {
      console.error('Account creation failed (simulated):', error);

      alert.showAlert(error.name, 'error', {
        subtext: error.message,
      });

      form.setError('root', {
        type: 'manual',
        message: 'Account creation failed. Please try again.',
      });
    },
  });
};
