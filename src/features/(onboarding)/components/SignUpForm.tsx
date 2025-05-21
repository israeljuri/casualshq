'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
import { SignUpSchema, SignUpData } from '@/features/(onboarding)/types';
import { useOnboardingStore } from '@/store/onboarding.store';
import { useRouter } from 'next/navigation';
import { GoogleSignupButton } from './GoogleSignupButton';

export function SignUpForm() {
  const setEmail = useOnboardingStore((state) => state.setEmail);
  const router = useRouter();

  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: SignUpData) {
    console.log('Sign Up form submitted:', values);
    setEmail(values.email);
    // Zustand store's setEmail action already handles moving to step 2
    // Navigate to the next step (organization setup)
    router.push('/setup-organization');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  leftIcon={<img src="/input/mail.svg" alt="" />}
                  placeholder="johndoe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button type="submit" className="w-full">
            Create account
          </Button>

          <GoogleSignupButton />

          <article className="space-y-4 mt-4">
            <p className="text-center text-sm text-custom-gray">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-black font-semibold">
                Sign In
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
        </div>
      </form>
    </Form>
  );
}
