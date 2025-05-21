'use client';

import { Button } from '@/components/molecules/Button';
import { useCreateAccountWithGoogle } from '../hooks/useCreateAccountWithGoogle';

export const GoogleSignupButton = () => {
  const { mutate, isPending } = useCreateAccountWithGoogle();

  const handleGoogleSignUp = async () => {
    // Simulated Google Token (in reality: get this from Google SDK or NextAuth)
    const googleToken = 'mock-google-oauth-token';
    mutate(googleToken);
  };

  return (
    <Button
      variant="secondary"
      type="button"
      className="w-full"
      leftIcon={<img src="/input/google.svg" alt="" />}
      onClick={handleGoogleSignUp}
      disabled={isPending}
    >
      {isPending ? 'Signing Up' : 'Sign up with Google'}
    </Button>
  );
};
