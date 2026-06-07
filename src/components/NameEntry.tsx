import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { Page } from '../types';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

const NAME_KEY = 'multiplay_username';

interface Props {
  score: number;
  correctCount: number;
  onNavigate: (page: Page) => void;
}

export default function NameEntry({ score, correctCount, onNavigate }: Props) {
  const { language, difficulty } = useSettings();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(NAME_KEY);
    if (stored) setName(stored);
  }, []);

  const handleSave = async () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    localStorage.setItem(NAME_KEY, name.trim());
    await addDoc(collection(db, 'results'), {
      name: name.trim(),
      score,
      correctAnswers: correctCount,
      difficulty,
      timestamp: serverTimestamp(),
    });
    setSaved(true);
    setSaving(false);
  };

  return (
    <div className="page">
      <div className="result-summary">
        <p>⏰ {t(language, 'timeUp')}</p>
        <div className="big-score">{score}</div>
        <p>{t(language, 'points')}</p>
        <p style={{ marginTop: '8px' }}>
          {t(language, 'correctAnswers')}: <strong>{correctCount}</strong>
        </p>
      </div>

      {!saved ? (
        <>
          <div className="field">
            <label className="label" htmlFor="name-input">
              {t(language, 'yourName')}
            </label>
            <input
              id="name-input"
              className="name-input"
              type="text"
              placeholder={t(language, 'namePlaceholder')}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              maxLength={32}
            />
          </div>
          <button
            className="btn"
            onClick={handleSave}
            disabled={!name.trim() || saving}
          >
            {saving ? '...' : t(language, 'saveResults')}
          </button>
        </>
      ) : (
        <button className="btn" onClick={() => onNavigate('results')}>
          🏆 {t(language, 'goToResults')}
        </button>
      )}

      <div className="nav-row">
        <button className="btn secondary" onClick={() => onNavigate('home')}>
          {t(language, 'backToHome')}
        </button>
        <button className="btn secondary" onClick={() => onNavigate('game')}>
          ▶ {t(language, 'startGame')}
        </button>
      </div>
    </div>
  );
}
