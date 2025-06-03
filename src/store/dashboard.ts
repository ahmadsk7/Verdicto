import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CaseDetail } from './case';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  defaultView: 'list' | 'grid';
  defaultSort: 'date' | 'relevance';
}

interface DashboardState {
  savedCases: CaseDetail[];
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
  addSavedCase: (case_: CaseDetail) => void;
  removeSavedCase: (caseId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  clearSavedCases: () => void;
}

const initialPreferences: UserPreferences = {
  theme: 'system',
  emailNotifications: true,
  defaultView: 'list',
  defaultSort: 'date',
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      savedCases: [],
      preferences: initialPreferences,
      isLoading: false,
      error: null,

      addSavedCase: (case_) => {
        set((state) => ({
          savedCases: [...state.savedCases, case_],
        }));
      },

      removeSavedCase: (caseId) => {
        set((state) => ({
          savedCases: state.savedCases.filter((c) => c.id !== caseId),
        }));
      },

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...newPreferences,
          },
        }));
      },

      clearSavedCases: () => {
        set({ savedCases: [] });
      },
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        savedCases: state.savedCases,
        preferences: state.preferences,
      }),
    }
  )
); 