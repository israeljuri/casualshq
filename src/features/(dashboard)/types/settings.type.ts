import { z } from 'zod';
import { SettingsSchema, awardRateSchema, breakTimeSchema } from './settings.schema';

export type SettingsData = z.infer<typeof SettingsSchema>;

export type AwardRateData = z.infer<typeof awardRateSchema>;

export type BreakTimeData = z.infer<typeof breakTimeSchema>;
