import { z } from 'zod';
 

// Form - Schema for adding or editing a staff member
export const staffFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'First name is required.' })
      .max(50),
    lastName: z.string().min(1, { message: 'Last name is required.' }).max(50),
    email: z.string().email({ message: 'Invalid email address.' }),
    team: z.string().optional(), // Team might be optional or have a default
    role: z.string().min(1, { message: 'Role is required.' }).max(100), // Added role as it's usually essential
    wageType: z.enum(['manual', 'team_based', 'award_rate']),
    manualRatePerHour: z.number().optional(),
    title: z.string().optional(),
    otherNames: z.string().optional(),
    phoneNumber: z.string().optional(),
    status: z.enum(['active', 'inactive']),
  })
  .superRefine((data, ctx) => {
    if (
      data.wageType === 'manual' &&
      (data.manualRatePerHour === undefined || isNaN(data.manualRatePerHour))
    ) {
      ctx.addIssue({
        path: ['manualRatePerHour'],
        code: z.ZodIssueCode.custom,
        message: 'Manual rate per hour is required when wage type is "manual".',
      });
    }

    if (data.wageType !== 'manual' && data.manualRatePerHour !== undefined) {
      ctx.addIssue({
        path: ['manualRatePerHour'],
        code: z.ZodIssueCode.custom,
        message: 'Manual rate should be omitted unless wage type is "manual".',
      });
    }
  });

export type StaffFormValues = z.infer<typeof staffFormSchema>;

// Form - Schema for the CSV import review (not for a form directly, but for data structure)
export const staffImportRowSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  team: z.string().optional(),
  status: z.enum(['new', 'duplicate_email', 'error']),
  errorMessage: z.string().optional(),
});

export type StaffImportRowValues = z.infer<typeof staffImportRowSchema>;

// Form - Search Staff Schema
export const SearchStaffSchema = z.object({
  name: z.string().min(1).max(500),
  password: z.string().min(8),
});

export type SearchStaffData = z.infer<typeof SearchStaffSchema>;

// Search Schema
export const SearchSchema = z.object({
  search: z.string().max(500),
});

export type SearchData = z.infer<typeof SearchSchema>;
