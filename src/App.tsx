import { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import type { Page, GameResult } from './types';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import ResultsPage from './components/ResultsPage';
import GamePage from './components/GamePage';
import GameSession from './components/GameSession';
import NameEntry from './components/NameEntry';
import './styles/global.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const { theme } = useSettings();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const navigate = (page: Page) => setCurrentPage(page);

  const handleGameEnd = (result: GameResult) => {
    setGameResult(result);
    setCurrentPage('name-entry');
  };

  return (
    <div className="app">
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'settings' && <SettingsPage onNavigate={navigate} />}
      {currentPage === 'results' && <ResultsPage onNavigate={navigate} />}
      {currentPage === 'game' && <GamePage onNavigate={navigate} />}
      {currentPage === 'session' && (
        <GameSession onNavigate={navigate} onGameEnd={handleGameEnd} />
      )}
      {currentPage === 'name-entry' && gameResult && (
        <NameEntry
          score={gameResult.score}
          correctCount={gameResult.correctCount}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
