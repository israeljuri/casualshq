import { z } from 'zod';

export const SettingsSchema = z.object({
  // General
  defaultTimezone: z.string(),
  enableNotifications: z.boolean(),

  // Company Information
  company: z.object({
    name: z.string(),
    logo: z.string().optional(),
    address: z.string(),
  }),

  // Wages and Overtime
  overTimeWeekdaysRateType: z.enum(['amount', 'percentage']),
  overTimeWeekdaysAmount: z.number().optional(),
  overTimeWeekdaysPercentage: z.number().optional(),

  weekendRate: z.boolean(),

  overTimeSaturdayRateType: z.enum(['amount', 'percentage']),
  overTimeSaturdayAmount: z.number().optional(),
  overTimeSaturdayPercentage: z.number().optional(),

  overTimeSundayRateType: z.enum(['amount', 'percentage']),
  overTimeSundayAmount: z.number().optional(),
  overTimeSundayPercentage: z.number().optional(),

  awardRates: z
    .array(
      z.object({
        age: z.string().refine(
          (val) => {
            // Matches either "18" or "<18", "< 18", etc.
            const exactNumber = /^\d+$/;
            const lessThanFormat = /^<\s*\d+$/;
            return exactNumber.test(val) || lessThanFormat.test(val);
          },
          {
            message: "Age must be a number or a less-than format like '<18'",
          }
        ),
        rate: z.number(),
        minimumTenure: z.number(),
      })
    )
    .optional(),

  // Work Policy
  standardWorkHoursPerDay: z.number(),
  enableDailyFixedRate: z.boolean(),
  dailyFixedRate: z.number().optional(),
  paymentFrequency: z.enum(['weekly', 'biweekly', 'monthly']),
  paymentStartDay: z.enum([
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]),
  breakTimes: z.array(
    z.object({
      type: z.string(),
      timeInMinutes: z.number(),
    })
  ),
});

export const awardRateSchema = z.object({
  age: z.string().refine(
    (val) => {
      // Matches either "18" or "<18", "< 18", etc.
      const exactNumber = /^\d+$/;
      const lessThanFormat = /^<\s*\d+$/;
      return exactNumber.test(val) || lessThanFormat.test(val);
    },
    {
      message: "Age must be a number or a less-than format like '<18'",
    }
  ),
  rate: z.number(),
  minimumTenure: z.string().refine(
    (val) => {
      // Matches either "18" or "<18", "< 18", etc.
      const exactNumber = /^\d+$/;
      const lessThanFormat = /^<\s*\d+$/;
      return exactNumber.test(val) || lessThanFormat.test(val);
    },
    {
      message: "Age must be a number or a less-than format like '<18'",
    }
  ),
});
