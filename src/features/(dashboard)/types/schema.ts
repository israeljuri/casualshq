// src/features/admin/types/schemas.ts
import { z } from 'zod';
import { WageType } from './index';

// Schema for adding or editing a staff member
export const staffFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }).max(50),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(50),
  email: z.string().email({ message: 'Invalid email address.' }),
  team: z.string().optional(), // Team might be optional or have a default
  role: z.string().min(1, { message: 'Role is required.' }).max(100), // Added role as it's usually essential
  wageDetails: z
    .object({
      type: z.enum(
        ['manual', 'team_based', 'award_rate'] as [WageType, ...WageType[]],
        {
          // Ensure WageType matches this
          required_error: 'Wage type selection is required.',
        }
      ),
      manualRatePerHour: z.preprocess(
        // Preprocess to convert empty string to undefined, then to number
        (val) =>
          val === '' || val === undefined || val === null
            ? undefined
            : Number(val),
        z
          .number({ invalid_type_error: 'Rate must be a number.' })
          .positive({ message: 'Rate must be positive.' })
          .optional()
      ),
    })
    .refine(
      (data) => {
        // If wage type is manual, manualRatePerHour must be provided
        if (
          data.type === 'manual' &&
          (data.manualRatePerHour === undefined || data.manualRatePerHour <= 0)
        ) {
          return false;
        }
        return true;
      },
      {
        message:
          "Manual rate is required and must be positive if wage type is 'Manual'.",
        path: ['manualRatePerHour'], // Path to the field causing the error
      }
    ),
  // Add other fields from StaffFormData as needed, e.g., title, phoneNumber
  title: z.string().optional(),
  otherNames: z.string().optional(),
  phoneNumber: z.string().optional(),
  status: z.enum(['active', 'inactive']), // Status might be handled differently
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

// Schema for the CSV import review (not for a form directly, but for data structure)
export const staffImportRowSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  team: z.string().optional(),
  status: z.enum(['new', 'duplicate_email', 'error']),
  errorMessage: z.string().optional(),
});

export type StaffImportRowValues = z.infer<typeof staffImportRowSchema>;

export const SearchStaffSchema = z.object({
  name: z.string().min(1).max(500),
  password: z.string().min(8),
});

export type SearchStaffData = z.infer<typeof SearchStaffSchema>;

export const SearchSchema = z.object({
  search: z.string().max(500),
});

export type SearchData = z.infer<typeof SearchSchema>;
