import type { Language } from './types';

interface Translations {
  game: string;
  results: string;
  settings: string;
  startGame: string;
  endGame: string;
  saveResults: string;
  goToResults: string;
  backToHome: string;
  language: string;
  theme: string;
  difficulty: string;
  light: string;
  dark: string;
  score: string;
  correct: string;
  timeUp: string;
  yourName: string;
  namePlaceholder: string;
  points: string;
  correctAnswers: string;
  subtitle: string;
}

const translations: Record<Language, Translations> = {
  et: {
    game: 'Mäng',
    results: 'Tulemused',
    settings: 'Sätted',
    startGame: 'Alusta mängu',
    endGame: 'Lõpeta mäng',
    saveResults: 'Salvesta tulemused',
    goToResults: 'Tulemused',
    backToHome: '← Avaleht',
    language: 'Keel',
    theme: 'Teema',
    difficulty: 'Raskusaste',
    light: 'Hele',
    dark: 'Tume',
    score: 'Punktid',
    correct: 'Õiged',
    timeUp: 'Aeg on läbi!',
    yourName: 'Sinu nimi',
    namePlaceholder: 'Sisesta nimi...',
    points: 'Punktid',
    correctAnswers: 'Õigeid vastuseid',
    subtitle: 'Korrutustabel',
  },
  ru: {
    game: 'Игра',
    results: 'Результаты',
    settings: 'Настройки',
    startGame: 'Начать игру',
    endGame: 'Завершить игру',
    saveResults: 'Сохранить результаты',
    goToResults: 'Результаты',
    backToHome: '← Главная',
    language: 'Язык',
    theme: 'Тема',
    difficulty: 'Сложность',
    light: 'Светлая',
    dark: 'Тёмная',
    score: 'Очки',
    correct: 'Правильных',
    timeUp: 'Время вышло!',
    yourName: 'Твоё имя',
    namePlaceholder: 'Введи имя...',
    points: 'Очков',
    correctAnswers: 'Правильных ответов',
    subtitle: 'Таблица умножения',
  },
  en: {
    game: 'Game',
    results: 'Results',
    settings: 'Settings',
    startGame: 'Start game',
    endGame: 'End game',
    saveResults: 'Save results',
    goToResults: 'Results',
    backToHome: '← Home',
    language: 'Language',
    theme: 'Theme',
    difficulty: 'Difficulty',
    light: 'Light',
    dark: 'Dark',
    score: 'Score',
    correct: 'Correct',
    timeUp: 'Time is up!',
    yourName: 'Your name',
    namePlaceholder: 'Enter name...',
    points: 'Points',
    correctAnswers: 'Correct answers',
    subtitle: 'Multiplication table',
  },
};

export function t(lang: Language, key: keyof Translations): string {
  return translations[lang][key];
}
