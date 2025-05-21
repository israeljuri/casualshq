import { Skeleton } from '@/components/atoms/skeleton';
import { ResetPasswordForm } from '@/features/(onboarding)/components/ResetPasswordForm';
import { Suspense } from 'react';

const page = () => {
  return (
    <main className="px-5 md:px-30 py-10 rounded-xl border shadow-none md:shadow-md w-full md:max-w-[596px] mx-auto space-y-16">
      <article className="text-center">
        <h1 className="text-3xl font-medium text-gray-900">
          Reset your password
        </h1>
        <p className="text-sm text-custom-gray mt-2 leading-6">
          Enter a new password to reset your password.
        </p>
      </article>
      <Suspense fallback={<Skeleton className="h-[20rem] w-full" />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
};

export default page;
