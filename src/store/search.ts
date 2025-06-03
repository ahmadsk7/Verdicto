import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchFilters {
  dateRange: {
    start: string | null;
    end: string | null;
  };
  categories: string[];
  jurisdictions: string[];
}

export interface SearchHistoryItem {
  query: string;
  filters: SearchFilters;
  timestamp: number;
}

interface SearchState {
  query: string;
  filters: SearchFilters;
  history: SearchHistoryItem[];
  isLoading: boolean;
  error: string | null;
  results: any[]; // TODO: Replace with proper type when we have the case interface
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  addToHistory: (item: Omit<SearchHistoryItem, 'timestamp'>) => void;
  clearHistory: () => void;
  search: () => Promise<void>;
}

const initialFilters: SearchFilters = {
  dateRange: {
    start: null,
    end: null,
  },
  categories: [],
  jurisdictions: [],
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      filters: initialFilters,
      history: [],
      isLoading: false,
      error: null,
      results: [],

      setQuery: (query: string) => {
        set({ query });
      },

      setFilters: (newFilters: Partial<SearchFilters>) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        }));
      },

      clearFilters: () => {
        set({ filters: initialFilters });
      },

      addToHistory: (item: Omit<SearchHistoryItem, 'timestamp'>) => {
        const historyItem: SearchHistoryItem = {
          ...item,
          timestamp: Date.now(),
        };

        set((state) => ({
          history: [historyItem, ...state.history].slice(0, 10), // Keep last 10 searches
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      search: async () => {
        const { query, filters } = get();
        set({ isLoading: true, error: null });

        try {
          // TODO: Replace with actual API call
          // Simulating API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Add to history if query is not empty
          if (query.trim()) {
            get().addToHistory({ query, filters });
          }

          // Simulate results
          const results = [
            {
              id: '1',
              title: 'Sample Case 1',
              summary: 'This is a sample case',
              date: '2024-03-20',
            },
            {
              id: '2',
              title: 'Sample Case 2',
              summary: 'Another sample case',
              date: '2024-03-19',
            },
          ];

          set({
            results,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to search',
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