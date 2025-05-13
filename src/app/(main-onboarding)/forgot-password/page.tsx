import { ForgotPasswordForm } from '@/features/(main-onboarding)/components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <main className="px-5 md:px-30 py-10 rounded-xl shadow-none md:shadow-md w-full md:max-w-[596px] mx-auto space-y-16">
      <article className="text-center">
        <h1 className="text-3xl font-medium text-gray-900">
          Let&apos;s get you back in
          {/* Reset your password */}
        </h1>
        <p className="text-sm text-custom-gray mt-2 leading-6">
          Enter your email address to reset your password.
        </p>
      </article>
      <ForgotPasswordForm />
    </main>
  );
};

export default ForgotPasswordPage;
