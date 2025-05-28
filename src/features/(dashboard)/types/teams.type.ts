import { z } from 'zod';

import { TeamSchema } from './teams.schema';
import { Staff } from './staff.type';

export interface Team {
  id: string;
  name: string;
  memberIds: string[]; // IDs of staff members in this team
  teamWage?: number; // Default hourly wage for the team
  members?: Staff[]; // Optional: populated when fetching full team details
}

export type TeamFormData = z.infer<typeof TeamSchema>;

// For displaying team members with their effective wage
export interface TeamMemberDisplay extends Staff {
  effectiveWage: number;
}

 