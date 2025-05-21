import { OrganizationForm } from '@/features/(onboarding)/components/OrganizationForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Set Up Your Organization | TimerX',
  description:
    'Configure your business details to customize TimerX for your organization and ensure accurate time tracking and payroll management.',
};

export default function SetupOrganizationPage() {
  return (
    <main>
      <article className="text-center mb-8 grid place-items-center gap-2 px-5">
        <div className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium text-custom-gray mb-2 gap-2">
          <span className="rounded-full h-[1.5rem] w-[1.5rem] grid place-items-center bg-primary font-bold text-white">
            1
          </span>
          Step 1 of 2
        </div>
        <h1 className="text-3xl font-medium text-gray-900">
          Let&apos;s get your business set up
        </h1>
        <p className="text-custom-gray  mt-2 leading-6 max-w-[45ch]">
          Provide your business details to customize TimerX for your
          organization. This ensures accurate time tracking and payroll
          management from day one.
        </p>
      </article>
      <section className="bg-white px-5 md:px-30 py-10 border rounded-xl shadow-none md:shadow-md max-w-[596px] mx-auto">
        <OrganizationForm />
      </section>
    </main>
  );
}
