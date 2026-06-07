export type Page = 'home' | 'settings' | 'results' | 'game' | 'session' | 'name-entry';
export type Language = 'et' | 'ru' | 'en';
export type Theme = 'light' | 'dark';

export interface GameResult {
  score: number;
  correctCount: number;
}

export interface Result {
  id: string;
  name: string;
  score: number;
  correctAnswers: number;
  difficulty: number;
  timestamp: number;
}

export interface Question {
  a: number;
  b: number;
  correct: number;
  options: number[];
}
