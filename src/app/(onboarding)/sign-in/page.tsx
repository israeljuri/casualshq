import { SignInForm } from '@/features/(onboarding)/components/SignInForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | CasualsHQ',
  description: 'Sign in to your CasualsHQ account to continue',
};

export default function SignUpPage() {
  return (
    <main className="px-5 md:px-30 py-10 rounded-xl border shadow-none md:shadow-md w-full md:max-w-[596px] mx-auto space-y-16">
      <article className="text-center">
        <h1 className="text-3xl font-medium text-gray-900">
          Sign in to CasualsHQ
        </h1>
        <p className="text-sm text-custom-gray mt-2 leading-6">
          Provide your credentials to continue.
        </p>
      </article>
      <SignInForm />
    </main>
  );
}
