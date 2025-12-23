import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StartupIdea, FeasibilityAnalysis, IdeaDomain, Risk } from '@/types';

interface IdeasContextType {
  ideas: StartupIdea[];
  submitIdea: (description: string, domain: IdeaDomain) => Promise<StartupIdea>;
  getIdea: (id: string) => StartupIdea | undefined;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

// Mock data for demo purposes
const mockRisks: Risk[] = [
  { id: '1', title: 'Market Competition', severity: 'Medium', description: 'Existing players may have established market share' },
  { id: '2', title: 'Technical Complexity', severity: 'High', description: 'Implementation requires advanced ML capabilities' },
  { id: '3', title: 'Regulatory Compliance', severity: 'Low', description: 'Data privacy regulations may apply' },
];

const generateMockAnalysis = (ideaId: string): FeasibilityAnalysis => ({
  id: `analysis-${ideaId}`,
  ideaId,
  feasibilityScore: Math.floor(Math.random() * 30) + 65,
  marketReadiness: ['Early', 'Emerging', 'Ready'][Math.floor(Math.random() * 3)] as 'Early' | 'Emerging' | 'Ready',
  researchMaturity: Math.floor(Math.random() * 40) + 50,
  risks: mockRisks.slice(0, Math.floor(Math.random() * 3) + 1),
  gaps: [
    'Need more market validation research',
    'Technical prototype required',
    'Competitive analysis needed',
  ].slice(0, Math.floor(Math.random() * 3) + 1),
  recommendation: ['Proceed', 'Improve', 'Pivot'][Math.floor(Math.random() * 3)] as 'Proceed' | 'Improve' | 'Pivot',
  summary: 'This startup idea shows promising potential with a solid foundation in the target market. Further development and validation are recommended before full-scale implementation.',
  createdAt: new Date(),
});

export function IdeasProvider({ children }: { children: ReactNode }) {
  const [ideas, setIdeas] = useState<StartupIdea[]>(() => {
    const stored = localStorage.getItem('ideas');
    return stored ? JSON.parse(stored) : [];
  });

  const submitIdea = async (description: string, domain: IdeaDomain): Promise<StartupIdea> => {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const newIdea: StartupIdea = {
      id: Date.now().toString(),
      userId: '1',
      title: description.slice(0, 50) + (description.length > 50 ? '...' : ''),
      description,
      domain,
      createdAt: new Date(),
      analysis: generateMockAnalysis(Date.now().toString()),
    };

    const updatedIdeas = [newIdea, ...ideas];
    setIdeas(updatedIdeas);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));

    return newIdea;
  };

  const getIdea = (id: string) => ideas.find(idea => idea.id === id);

  return (
    <IdeasContext.Provider value={{ ideas, submitIdea, getIdea }}>
      {children}
    </IdeasContext.Provider>
  );
}

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
}
