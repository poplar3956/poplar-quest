
export type Riasec = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    points: Partial<Record<Riasec, number>>;
    synchroEffect: number; // Gauge change -5 to +10
  }[];
}

export enum Rarity {
  UR = 'UR',
  SSR = 'SSR',
  SR = 'SR',
  R = 'R'
}

export interface CareerMilestone {
  year: string;
  title: string;
  salary?: string; // 月収例
  description: string;
  icon: string;
}

export interface SeniorMessage {
  name: string;
  years: string;
  position: string;
  content: string;
  avatar: string;
}

export interface Job {
  id: string;
  title: string;
  subTitle: string;
  category: string;
  descriptions: Record<Rarity, string>;
  riasecPrimary: Riasec;
  icon: string;
  color: string;
  messageFromSatsuki: string; // 150文字程度
  seniorMessage: SeniorMessage; // 180文字程度
}

export interface DiagnosticResult {
  job: Job;
  rarity: Rarity;
  score: number;
  riasecScores: Record<Riasec, number>;
  departments: string[];
  careerPlan: CareerMilestone[];
  strengths: string[];
  growthArea: string;
}
