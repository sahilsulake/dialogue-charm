import React from 'react';

interface SettingsMenuProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  isDarkMode,
  onToggleDarkMode,
  language,
  onLanguageChange
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' }
  ];

  return (
    <div className={`settings-menu ${isOpen ? 'open' : ''}`}>
      <div className="setting-item">
        <span className="setting-label">Dark Mode</span>
        <div 
          className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
          onClick={onToggleDarkMode}
        >
          <div className="toggle-handle"></div>
        </div>
      </div>
      
      <div className="setting-item">
        <span className="setting-label">Language</span>
        <select
          className="language-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="setting-item">
        <span className="setting-label">Voice Input</span>
        <div className="toggle-switch active">
          <div className="toggle-handle"></div>
        </div>
      </div>
      
      <div className="setting-item">
        <span className="setting-label">Sound Effects</span>
        <div className="toggle-switch active">
          <div className="toggle-handle"></div>
        </div>
      </div>
      
      <div className="setting-item">
        <span className="setting-label">Auto-scroll</span>
        <div className="toggle-switch active">
          <div className="toggle-handle"></div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;