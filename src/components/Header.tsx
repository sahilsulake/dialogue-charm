import React from 'react';
import { X, MoreVertical, Search, Download, Copy, Share2 } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  isSettingsOpen: boolean;
  onToggleSettings: () => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  onClose: () => void;
  onDownloadPDF: () => void;
  onCopyChat: () => void;
  onShareChat: () => void;
  isOnline: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isSettingsOpen,
  onToggleSettings,
  isSearchOpen,
  onToggleSearch,
  onClose,
  onDownloadPDF,
  onCopyChat,
  onShareChat,
  isOnline
}) => {
  return (
    <div className="chat-header">
      <div>
        <h3>AI Assistant</h3>
        <div className="status">
          <div className="online-dot"></div>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
      
      <div className="header-controls">
        <button
          className="header-button"
          onClick={onToggleSearch}
          title="Search messages"
        >
          <Search />
        </button>
        
        <button
          className="header-button"
          onClick={onDownloadPDF}
          title="Download chat"
        >
          <Download />
        </button>
        
        <button
          className="header-button"
          onClick={onCopyChat}
          title="Copy chat"
        >
          <Copy />
        </button>
        
        <button
          className="header-button"
          onClick={onShareChat}
          title="Share chat"
        >
          <Share2 />
        </button>
        
        <button
          className="header-button"
          onClick={onToggleSettings}
          title="Settings"
        >
          <MoreVertical />
        </button>
        
        <button
          className="header-button"
          onClick={onClose}
          title="Close chat"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default Header;