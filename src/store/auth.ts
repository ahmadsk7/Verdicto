import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // Simulating API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
          };
          const token = 'dummy-token';

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to login',
            isLoading: false,
          });
        }
      },

      signup: async (email: string, password: string, firstName: string, lastName: string) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Replace with actual API call
          // Simulating API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = {
            id: '1',
            email,
            firstName,
            lastName,
          };
          const token = 'dummy-token';

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to signup',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 