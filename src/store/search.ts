import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchFilters {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  categories: string[];
  jurisdictions: string[];
  courts: string[];
  judges: string[];
  status: 'all' | 'pending' | 'decided';
  hasAnalysis: boolean | null;
}

export interface SearchHistoryItem {
  query: string;
  filters: SearchFilters;
  timestamp: Date;
}

interface SearchState {
  query: string;
  filters: SearchFilters;
  results: any[];
  history: SearchHistoryItem[];
  isLoading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  addToHistory: (item: SearchHistoryItem) => void;
  clearHistory: () => void;
  search: () => Promise<void>;
}

const initialFilters: SearchFilters = {
  dateRange: {
    from: null,
    to: null,
  },
  categories: [],
  jurisdictions: [],
  courts: [],
  judges: [],
  status: 'all',
  hasAnalysis: null,
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      filters: initialFilters,
      results: [],
      history: [],
      isLoading: false,
      error: null,

      setQuery: (query) => set({ query }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        })),

      clearFilters: () => set({ filters: initialFilters }),

      addToHistory: (item) =>
        set((state) => ({
          history: [item, ...state.history].slice(0, 10),
        })),

      clearHistory: () => set({ history: [] }),

      search: async () => {
        const { query, filters } = get();
        set({ isLoading: true, error: null });

        try {
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Simulated API response
          const results = [
            {
              id: '1',
              title: 'Sample Case 1',
              summary: 'This is a sample case summary.',
              date: new Date().toISOString(),
              court: 'Supreme Court',
              jurisdiction: 'Federal',
              categories: ['Civil', 'Contract'],
            },
            {
              id: '2',
              title: 'Sample Case 2',
              summary: 'Another sample case summary.',
              date: new Date().toISOString(),
              court: 'Appellate Court',
              jurisdiction: 'State',
              categories: ['Criminal', 'Constitutional'],
            },
          ];

          set({ results, isLoading: false });

          // Add to history
          get().addToHistory({
            query,
            filters,
            timestamp: new Date(),
          });
        } catch (error) {
          set({
            error: 'Failed to fetch search results',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        history: state.history,
      }),
    }
  )
); 