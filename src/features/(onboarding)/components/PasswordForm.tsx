/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { Button } from '@/components/molecules/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/molecules/Form';
import { PasswordInput } from '@/components/molecules/PasswordInput';
import { PasswordSchema, PasswordData } from '@/features/(onboarding)/types';
import { useOnboardingStore } from '@/store/onboarding.store';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { useCreateAccount } from '../hooks/useCreateAccount';

export function PasswordForm() {
  const router = useRouter();

  const currentStep = useOnboardingStore((state) => state.currentStep);
  const email = useOnboardingStore((state) => state.email);
  const organizationData = useOnboardingStore(
    (state) => state.organizationData
  );

  const form = useForm<PasswordData>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useCreateAccount(form as any);

  function onSubmit(values: PasswordData) {
    const finalUserData = {
      email,
      password: values.password,
      // TODO: Handle businessLogo file upload separately before this point in a real app
      ...organizationData,
    };
    mutation.mutate(finalUserData);
  }

  useEffect(() => {
    if (currentStep !== 3) {
      router.replace('/sign-up');
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter password" {...field} />
              </FormControl>
              <FormDescription className="text-custom-gray">
                Must be at least 8 characters long with one uppercase, one
                number, and one special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm password" {...field} />
              </FormControl>
              <FormDescription className="text-custom-gray text-sm">
                Must be at least 8 characters long with one uppercase, one
                number, and one special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating Account' : 'Create account'}
        </Button>

        <article className="">
          <p className="text-center text-sm text-custom-gray">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-black font-semibold">
              Log in
            </Link>
          </p>
        </article>
      </form>
    </Form>
  );
}
