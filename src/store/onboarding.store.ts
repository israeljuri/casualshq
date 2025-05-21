import { create } from 'zustand';
import { OnboardingState } from '@/features/(onboarding)/types'; // Using alias

const initialState = {
  currentStep: 1,
  email: null,
  organizationData: null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setEmail: (email) => set({ email, currentStep: 2 }), // Move to step 2 after setting email

  setOrganizationData: (data) =>
    set((state) => ({
      organizationData: { ...state.organizationData, ...data }, // Merge data in case of partial updates
      currentStep: 3, // Move to step 3 after setting org data
    })),

  goToStep: (step) => set({ currentStep: step }),

  goToNextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })), // Assuming 3 steps max for now

  goToPreviousStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  resetOnboarding: () => set(initialState),
}));
