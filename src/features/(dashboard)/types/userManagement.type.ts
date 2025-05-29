import { z } from 'zod';

export type UserRole = 'Admin' | 'Manager' | 'Team Member';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  // Add other relevant fields from your Staff type if they are needed here
  // For example, if the user name is derived from Staff's firstName and lastName
  firstName?: string; 
  lastName?: string;
}

export const userFormSchema = z.object({
  id: z.string().optional(), // Present when editing
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(['Admin', 'Manager', 'Team Member'], { message: "Role is required." }),
  // isActive is handled by the toggle, not typically part of the form explicitly unless needed
});

export type UserFormValues = z.infer<typeof userFormSchema>;

