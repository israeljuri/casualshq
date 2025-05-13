'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  OrganizationSchema,
  OrganizationData,
} from '@/features/(main-onboarding)/types';
import { useMainOnboardingStore } from '@/store/mainOnboardingStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export function OrganizationForm() {
  const router = useRouter();
  const currentStep = useMainOnboardingStore((state) => state.currentStep);
  const setOrganizationData = useMainOnboardingStore(
    (state) => state.setOrganizationData
  );

  const form = useForm<OrganizationData>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      businessName: '',
      businessLogo: null,
      businessSize: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: OrganizationData) {
    // TODO: Handle file upload logic for businessLogo if a file is provided
    console.log('Organization form submitted:', values);
    setOrganizationData(values);
    // Zustand store's setOrganizationData action already handles moving to step 3
    // Navigate to the next step (create password)
    router.replace('/create-password'); // Adjust route if needed
  }

  useEffect(() => {
    if (currentStep !== 2) {
      router.replace('/sign-up');
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business name</FormLabel>
              <FormControl>
                <Input
                  leftIcon={
                    <img src="/main-onboarding/organization.svg" alt="" />
                  }
                  placeholder="Your Company Inc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business logo (optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                  onBlur={field.onBlur}
                  ref={field.ref}
                  name={field.name}
                  // value={field.value}
                  disabled={field.disabled}
                  // {...field.}
                  // Note: 'value' is not used directly for file inputs in the same way
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How large is your business?</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  leftIcon={<img src="/main-onboarding/employees.svg" alt="" />}
                  placeholder="Number of employees"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Next
        </Button>
        <article className="space-y-4">
          <p className="text-center text-sm text-custom-gray">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-black font-semibold">
              Log in
            </Link>
          </p>
          <p className="text-center text-xs text-custom-gray leading-5">
            By clicking Create account, you agree to CasualsHQ’s{' '}
            <Link href="" className="text-black">
              Terms of Service
            </Link>{' '}
            &{' '}
            <Link href="" className="text-black">
              Privacy Policy
            </Link>
            .
          </p>
        </article>
      </form>
    </Form>
  );
}
