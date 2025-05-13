'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

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
import { SignInData, SignInSchema } from '@/features/(main-onboarding)/types';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { GoogleSigninButton } from './GoogleSignInButton';
import { useSignIn } from '../hooks/useSignIn';

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useSignIn();

  const form = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignInData) {
    mutation.mutate(values);
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
                  leftIcon={<img src="/main-onboarding/mail.svg" alt="" />}
                  placeholder="johndoe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    leftIcon={
                      <img src="/main-onboarding/password.svg" alt="" />
                    }
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Sigining In' : 'Continue'}
          </Button>

          <GoogleSigninButton />

          <article className="space-y-4 mt-4">
            <p className="text-center text-sm text-custom-gray">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-black font-semibold">
                Sign Up
              </Link>
            </p>
            <p className="text-center text-sm text-custom-gray">
              <Link
                href="/forgot-password"
                className="text-black font-semibold underline"
              >
                Reset Password
              </Link>
            </p>
          </article>
        </div>
      </form>
    </Form>
  );
}
