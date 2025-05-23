'use client';

import { Button } from '@/components/molecules/Button';
import { useSignInWithGoogle } from '../hooks/useSignInWithGoogle';

export const GoogleSigninButton = () => {
  const { mutate, isPending } = useSignInWithGoogle('/');

  const handleGoogleSignIn = async () => {
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
      onClick={handleGoogleSignIn}
      disabled={isPending}
    >
      {isPending ? 'Signing In' : 'Sign In with Google'}
    </Button>
  );
};
