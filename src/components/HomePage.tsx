import type { Page, Language } from '../types';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

interface Props {
  onNavigate: (page: Page) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'et', label: 'ET' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export default function HomePage({ onNavigate }: Props) {
  const { language, theme, setLanguage, setTheme } = useSettings();

  return (
    <div className="page">
      <h1>✕ MultiPlay</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {t(language, 'subtitle')}
      </p>

      <div className="lang-row" style={{ marginBottom: '10px' }}>
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            className={`lang-btn${language === code ? ' active' : ''}`}
            onClick={() => setLanguage(code)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="theme-row" style={{ marginBottom: '24px' }}>
        <button
          className={`theme-btn${theme === 'light' ? ' active' : ''}`}
          onClick={() => setTheme('light')}
        >
          ☀️ {t(language, 'light')}
        </button>
        <button
          className={`theme-btn${theme === 'dark' ? ' active' : ''}`}
          onClick={() => setTheme('dark')}
        >
          🌙 {t(language, 'dark')}
        </button>
      </div>

      <button className="btn" onClick={() => onNavigate('game')}>
        🎮 {t(language, 'game')}
      </button>
      <button className="btn secondary" onClick={() => onNavigate('results')}>
        🏆 {t(language, 'results')}
      </button>
      <button className="btn secondary" onClick={() => onNavigate('settings')}>
        ⚙️ {t(language, 'settings')}
      </button>
    </div>
  );
}
