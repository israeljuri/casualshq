import { z } from 'zod';

// Search Schema
export const SearchSchema = z.object({
  search: z.string().max(500),
});

export type SearchData = z.infer<typeof SearchSchema>;
