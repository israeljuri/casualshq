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
  ForgotPasswordData,
  ForgotPasswordSchema,
} from '@/features/(main-onboarding)/types';
import { useForgotPassword } from '../hooks/useForgotPassword';

export function ForgotPasswordForm() {
  const mutation = useForgotPassword();

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordData) {
    mutation.mutate(values);
    form.reset();
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
                  leftIcon={<img src="/main-onboarding/mail.svg" alt="" />}
                  placeholder="johndoe@example.com"
                  {...field}
                />
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
            {mutation.isPending ? 'Please wait' : 'Request reset link'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
