import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language, Theme } from '../types';

interface Settings {
  language: Language;
  theme: Theme;
  difficulty: number;
  setLanguage: (l: Language) => void;
  setTheme: (t: Theme) => void;
  setDifficulty: (d: number) => void;
}

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [difficulty, setDifficulty] = useState<number>(10);

  return (
    <SettingsContext.Provider value={{ language, theme, difficulty, setLanguage, setTheme, setDifficulty }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
