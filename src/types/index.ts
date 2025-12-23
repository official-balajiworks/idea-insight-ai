export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface StartupIdea {
  id: string;
  userId: string;
  title: string;
  description: string;
  domain: IdeaDomain;
  createdAt: Date;
  analysis?: FeasibilityAnalysis;
}

export type IdeaDomain = 
  | 'AI'
  | 'Health'
  | 'FinTech'
  | 'EdTech'
  | 'AgriTech'
  | 'E-commerce'
  | 'Others';

export interface FeasibilityAnalysis {
  id: string;
  ideaId: string;
  feasibilityScore: number;
  marketReadiness: 'Early' | 'Emerging' | 'Ready';
  researchMaturity: number;
  risks: Risk[];
  gaps: string[];
  recommendation: 'Proceed' | 'Improve' | 'Pivot';
  summary: string;
  createdAt: Date;
}

export interface Risk {
  id: string;
  title: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface AnalysisMetrics {
  marketReadinessScore: number;
  riskLevel: number;
  researchMaturity: number;
  competitionLevel: number;
  innovationScore: number;
}
