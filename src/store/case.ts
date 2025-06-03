import { create } from 'zustand';

export interface CaseAnalysis {
  summary: string;
  keyPoints: string[];
  legalPrinciples: string[];
  similarCases: Array<{
    id: string;
    title: string;
    similarity: number;
  }>;
  aiInsights: string;
}

export interface CaseDetail {
  id: string;
  title: string;
  summary: string;
  date: string;
  court: string;
  jurisdiction: string;
  judges: string[];
  parties: {
    plaintiff: string;
    defendant: string;
  };
  citations: string[];
  fullText: string;
  analysis: CaseAnalysis | null;
}

interface CaseState {
  currentCase: CaseDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchCase: (id: string) => Promise<void>;
  generateAnalysis: () => Promise<void>;
}

export const useCaseStore = create<CaseState>((set, get) => ({
  currentCase: null,
  isLoading: false,
  error: null,

  fetchCase: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate case data
      const caseData: CaseDetail = {
        id,
        title: 'Sample Case Title',
        summary: 'This is a detailed summary of the case...',
        date: '2024-03-20',
        court: 'Supreme Court',
        jurisdiction: 'Federal',
        judges: ['Judge Smith', 'Judge Johnson'],
        parties: {
          plaintiff: 'John Doe',
          defendant: 'Jane Smith',
        },
        citations: ['123 U.S. 456', '789 F.2d 101'],
        fullText: 'Full text of the case...',
        analysis: null,
      };

      set({ currentCase: caseData, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch case',
        isLoading: false,
      });
    }
  },

  generateAnalysis: async () => {
    const { currentCase } = get();
    if (!currentCase) return;

    set({ isLoading: true, error: null });

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate analysis data
      const analysis: CaseAnalysis = {
        summary: 'AI-generated summary of the case...',
        keyPoints: [
          'Key point 1 about the case',
          'Key point 2 about the case',
          'Key point 3 about the case',
        ],
        legalPrinciples: [
          'Principle 1 established in this case',
          'Principle 2 established in this case',
        ],
        similarCases: [
          {
            id: 'case1',
            title: 'Similar Case 1',
            similarity: 0.85,
          },
          {
            id: 'case2',
            title: 'Similar Case 2',
            similarity: 0.75,
          },
        ],
        aiInsights: 'AI-generated insights about the case...',
      };

      set((state) => ({
        currentCase: state.currentCase
          ? { ...state.currentCase, analysis }
          : null,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate analysis',
        isLoading: false,
      });
    }
  },
})); 