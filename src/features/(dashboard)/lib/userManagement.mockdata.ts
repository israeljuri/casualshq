
// src/lib/userManagementMockData.ts
// This can be merged with your existing mockData.ts or kept separate.
// It adapts data from staffsMockData for the user management context.

import { ManagedUser, UserRole } from '@/features/(dashboard)/types/userManagement.type';
import { staffsMockData } from '@/lib/mockData'; // Assuming mockData.ts is in the same lib folder

const assignMockRole = (index: number): UserRole => {
  const roles: UserRole[] = ['Admin', 'Manager', 'Team Member'];
  return roles[index % roles.length];
};

export const managedUsersMockData: ManagedUser[] = staffsMockData.slice(0, 12).map((staff, index) => ({
  id: staff.id,
  name: `${staff.firstName} ${staff.lastName}`,
  firstName: staff.firstName, // Keep original parts if needed for editing
  lastName: staff.lastName,
  email: staff.email,
  role: assignMockRole(index), // Assign a role for user management
  isActive: index % 2 === 0, // Alternate active status for demo
}));

// Functions to manipulate mock data (for client-side demo)
export const addManagedUser = (user: Omit<ManagedUser, 'id' | 'isActive'>): ManagedUser => {
  const newUser: ManagedUser = {
    ...user,
    id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    isActive: true, // Default to active
  };
  managedUsersMockData.unshift(newUser); // Add to the beginning
  return newUser;
};

export const updateManagedUser = (updatedUser: ManagedUser): ManagedUser | undefined => {
  const userIndex = managedUsersMockData.findIndex(u => u.id === updatedUser.id);
  if (userIndex !== -1) {
    managedUsersMockData[userIndex] = updatedUser;
    return updatedUser;
  }
  return undefined;
};

export const deleteManagedUser = (userId: string): boolean => {
  const userIndex = managedUsersMockData.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    managedUsersMockData.splice(userIndex, 1);
    return true;
  }
  return false;
};

export const toggleUserStatus = (userId: string): ManagedUser | undefined => {
    const userIndex = managedUsersMockData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        managedUsersMockData[userIndex].isActive = !managedUsersMockData[userIndex].isActive;
        return managedUsersMockData[userIndex];
    }
    return undefined;
}