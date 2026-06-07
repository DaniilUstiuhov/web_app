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

export default function SettingsPage({ onNavigate }: Props) {
  const { language, theme, difficulty, setLanguage, setTheme, setDifficulty } = useSettings();

  return (
    <div className="page">
      <h2>{t(language, 'settings')}</h2>

      <div className="field">
        <span className="label">{t(language, 'language')}</span>
        <div className="lang-row">
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
      </div>

      <div className="field">
        <span className="label">{t(language, 'theme')}</span>
        <div className="theme-row">
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
      </div>

      <div className="field">
        <span className="label">{t(language, 'difficulty')}</span>
        <input
          type="range"
          className="slider"
          min={2}
          max={20}
          value={difficulty}
          onChange={e => setDifficulty(Number(e.target.value))}
        />
        <div className="difficulty-value">{difficulty}</div>
      </div>

      <div className="nav-row">
        <button className="btn secondary" onClick={() => onNavigate('home')}>
          {t(language, 'backToHome')}
        </button>
        <button className="btn" onClick={() => onNavigate('game')}>
          {t(language, 'game')}
        </button>
      </div>
    </div>
  );
}
