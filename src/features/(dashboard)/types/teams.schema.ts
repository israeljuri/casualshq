import { z } from 'zod';

export const TeamSchema = z.object({
  name: z.string().min(1, { message: 'Team name is required.' }),
  memberIds: z.array(z.string()).optional(), // Array of staff IDs
  teamWage: z.number().optional(),
});
