import { z } from 'zod';

// Schemas
export const SearchStaffSchema = z.object({
  name: z.string().min(1).max(500),
  password: z.string().min(8),
});

// Types
export type SearchStaffData = z.infer<typeof SearchStaffSchema>;

export type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
};
