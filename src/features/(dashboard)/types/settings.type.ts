import { z } from 'zod';
import { SettingsSchema, awardRateSchema } from './settings.schema';

export type SettingsData = z.infer<typeof SettingsSchema>;

export type AwardRateData = z.infer<typeof awardRateSchema>;
