import { PasswordForm } from '@/features/(main-onboarding)/components/PasswordForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Password | Account Setup',
  description:
    'Set up a secure password for your account to complete the registration process.',
};

export default function CreatePasswordPage() {
  return (
    <main>
      <article className="text-center mb-8">
        <div className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium text-custom-gray mb-2 gap-2">
          <span className="rounded-full h-[1.5rem] w-[1.5rem] grid place-items-center bg-primary font-bold text-white">
            2
          </span>
          Step 2 of 2
        </div>
        <h1 className="text-3xl font-medium text-gray-900">
          Create password
        </h1>
        <p className="text-sm text-custom-gray mt-2 leading-6">
          Create a secure password to access your account.
        </p>
      </article>
      <section className="bg-white px-5 md:px-30 py-10 rounded-xl shadow-none md:shadow-md max-w-[596px] mx-auto">
        <PasswordForm />
      </section>
    </main>
  );
}
