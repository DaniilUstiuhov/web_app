import type { Page } from '../types';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function GamePage({ onNavigate }: Props) {
  const { language, difficulty } = useSettings();

  return (
    <div className="page">
      <h2>{t(language, 'game')}</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {t(language, 'difficulty')}: <strong>{difficulty}</strong>
      </p>
      <button className="btn" onClick={() => onNavigate('session')}>
        ▶ {t(language, 'startGame')}
      </button>
      <div className="nav-row">
        <button className="btn secondary" onClick={() => onNavigate('home')}>
          {t(language, 'backToHome')}
        </button>
        <button className="btn secondary" onClick={() => onNavigate('settings')}>
          ⚙️ {t(language, 'settings')}
        </button>
      </div>
    </div>
  );
}
