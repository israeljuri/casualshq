  import { ResetPasswordForm } from '@/features/(main-onboarding)/components/ResetPasswordForm';

  const page = () => {
    return (
      <main className="px-5 md:px-30 py-10 rounded-xl shadow-none md:shadow-md w-full md:max-w-[596px] mx-auto space-y-16">
        <article className="text-center">
          <h1 className="text-3xl font-medium text-gray-900">
            Reset your password
          </h1>
          <p className="text-sm text-custom-gray mt-2 leading-6">
            Enter a new password to reset your password.
          </p>
        </article>

        <ResetPasswordForm />
      </main>
    );
  };

  export default page;
