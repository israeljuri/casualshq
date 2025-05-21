import { z } from 'zod';

// Schemas
export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8),
});
export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
export const OrganizationSchema = z.object({
  businessName: z.string().min(1, { message: 'Business name is required' }),
  businessLogo: z
    .instanceof(File)
    .refine((file) => (file ? file.type.startsWith('image/') : true), {
      message: 'Only image files are allowed',
    })
    .optional()
    .nullable(),
  businessSize: z.string().min(1, { message: 'Please select a business size' }),
});
export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Types
export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
export type OrganizationData = z.infer<typeof OrganizationSchema>;
export type PasswordData = z.infer<typeof PasswordSchema>;

export interface OnboardingState {
  currentStep: number;
  email: string | null;
  organizationData: OrganizationData | null;
  setEmail: (email: string) => void;
  setOrganizationData: (data: OrganizationData) => void;
  goToStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetOnboarding: () => void;
}

export type CreateAccountInput = {
  email: string | null;
  password: string | undefined;
  businessName?: string;
  businessLogo?: File | null;
  businessSize?: string;
};

export type SignInInput = {
  email: string | null;
  password: string | undefined;
};

export type ForgotPasswordInput = {
  email: string | null;
};

export type ResetPasswordInput = {
  password: string | null;
};
