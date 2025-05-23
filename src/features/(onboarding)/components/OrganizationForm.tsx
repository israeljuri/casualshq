'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/molecules/Form';
import { Input } from '@/components/molecules/Input';
import {
  OrganizationSchema,
  OrganizationData,
} from '@/features/(onboarding)/types';
import { useOnboardingStore } from '@/store/onboarding.store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export function OrganizationForm() {
  const router = useRouter();
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const setOrganizationData = useOnboardingStore(
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

  function onSubmit(values: OrganizationData) {
    // TODO: Handle file upload logic for businessLogo if a file is provided
    console.log('Organization form submitted:', values);
    setOrganizationData(values);
    router.push('/create-password');
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
                  leftIcon={<img src="/input/organization.svg" alt="" />}
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
                  disabled={field.disabled}
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
                  leftIcon={<img src="/input/employees.svg" alt="" />}
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
