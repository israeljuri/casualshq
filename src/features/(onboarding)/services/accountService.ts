import { CreateAccountInput, ForgotPasswordInput, ResetPasswordInput, SignInInput } from '../types';

export async function createAccount(
  data: CreateAccountInput
): Promise<{ success: boolean }> {
  console.log('Simulating account creation with data:', data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Optional: Simulate random failure
  //   if (Math.random() < 0.2) {
  //     throw new Error('Failed to create account');
  //   }

  return { success: true };
}

export async function createAccountWithGoogle(
  googleToken: string
): Promise<{ success: boolean }> {
  console.log('Simulating Google account creation with token:', googleToken);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate failure condition if needed
  // if (googleToken === 'bad-token') throw new Error('Google auth failed');

  return { success: true };
}

export async function signIn(data: SignInInput): Promise<{ success: boolean }> {
  console.log('Simulating account creation with data:', data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Optional: Simulate random failure
  if (Math.random() < 0.2) {
    throw new Error('Failed to create account');
  }

  return { success: true };
}

export async function signInWithGoogle(
  googleToken: string
): Promise<{ success: boolean }> {
  console.log('Simulating Google account creation with token:', googleToken);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate failure condition if needed
  // if (googleToken === 'bad-token') throw new Error('Google auth failed');

  return { success: true };
}

export async function forgotPassword(data: ForgotPasswordInput): Promise<{ success: boolean }> {
  console.log('Simulating forgot password with data:', data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}

export async function resetPassword(data: ResetPasswordInput, token: string): Promise<{ success: boolean }> {
  console.log('Simulating reset password with data:', data, token);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
