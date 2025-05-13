import { SignUpForm } from '@/features/(main-onboarding)/components/SignUpForm'; // Using alias

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | CasualsHQ',
  description:
    'Create your CasualsHQ account and join our community. Sign up in minutes to get started.',
};

export default function SignUpPage() {
  return (
    <main className="px-5 md:px-30 py-10 rounded-xl shadow-none md:shadow-md w-full md:max-w-[596px] mx-auto space-y-16">
      <article className="text-center">
        <h1 className="text-3xl font-medium text-gray-900">
          Welcome to CasualsHQ
        </h1>
        <p className="text-sm text-custom-gray mt-2 leading-6">
          Create an account to get started.
        </p>
      </article>
      <SignUpForm />
    </main>
  );
}

