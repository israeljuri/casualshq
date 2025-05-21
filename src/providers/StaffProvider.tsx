'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useStaffGraphQL, StaffGraphQLContextType } from '@/features/(dashboard)/hooks/useStaffGraphQL';

// Create a context with a default value
const StaffContext = createContext<StaffGraphQLContextType | undefined>(undefined);

// Provider component
export const StaffProvider = ({ children }: { children: ReactNode }) => {
  const staffGraphQL = useStaffGraphQL();
  
  return (
    <StaffContext.Provider value={staffGraphQL}>
      {children}
    </StaffContext.Provider>
  );
};

// Custom hook to use the staff context
export const useStaff = (): StaffGraphQLContextType => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
