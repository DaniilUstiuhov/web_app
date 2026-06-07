import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import type { Result, Page } from '../types';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function ResultsPage({ onNavigate }: Props) {
  const { language } = useSettings();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadResults() {
      try {
        const q = query(collection(db, 'results'), orderBy('score', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Result));
        setResults(data);
      } catch (e) {
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, []);

  return (
    <div className="page">
      <h2>{t(language, 'results')}</h2>

      {loading && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '16px' }}>...</p>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: 'var(--wrong)', marginBottom: '16px' }}>{error}</p>
      )}

      {!loading && !error && (
        <ul className="results-list">
          {results.map((r, i) => (
            <li key={r.id} className="results-item">
              <span className="results-rank">{i + 1}</span>
              <span className="results-name">{r.name}</span>
              <span className="results-score">{r.score}</span>
            </li>
          ))}
          {results.length === 0 && (
            <li style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
              No results yet
            </li>
          )}
        </ul>
      )}

      <div className="nav-row">
        <button className="btn secondary" onClick={() => onNavigate('home')}>
          {t(language, 'backToHome')}
        </button>
        <button className="btn" onClick={() => onNavigate('game')}>
          🎮 {t(language, 'game')}
        </button>
      </div>
    </div>
  );
}
