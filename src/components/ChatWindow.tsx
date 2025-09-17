import React from 'react';
import { X, Send, Mic, Paperclip, MoreVertical, Search, Bookmark, Download, Copy, Share2 } from 'lucide-react';
import Header from './Header';
import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';
import SettingsMenu from './SettingsMenu';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isAI?: boolean;
}

interface QuickReply {
  id: string;
  text: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: (message: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  isSettingsOpen: boolean;
  onToggleSettings: () => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  quickReplies: QuickReply[];
  onQuickReply: (reply: QuickReply) => void;
  isTyping: boolean;
  isOnline: boolean;
  bookmarkedMessages: string[];
  onToggleBookmark: (messageId: string) => void;
  onDownloadPDF: () => void;
  onCopyChat: () => void;
  onShareChat: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isRecording,
  onToggleRecording,
  onFileUpload,
  fileInputRef,
  isDarkMode,
  onToggleDarkMode,
  language,
  onLanguageChange,
  isSettingsOpen,
  onToggleSettings,
  isSearchOpen,
  onToggleSearch,
  searchQuery,
  onSearchChange,
  quickReplies,
  onQuickReply,
  isTyping,
  isOnline,
  bookmarkedMessages,
  onToggleBookmark,
  onDownloadPDF,
  onCopyChat,
  onShareChat,
  messagesEndRef
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(inputValue);
    }
  };

  const handleSendClick = () => {
    onSendMessage(inputValue);
  };

  return (
    <div className={`chat-window ${isOpen ? 'open' : ''}`}>
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        language={language}
        onLanguageChange={onLanguageChange}
        isSettingsOpen={isSettingsOpen}
        onToggleSettings={onToggleSettings}
        isSearchOpen={isSearchOpen}
        onToggleSearch={onToggleSearch}
        onClose={onClose}
        onDownloadPDF={onDownloadPDF}
        onCopyChat={onCopyChat}
        onShareChat={onShareChat}
        isOnline={isOnline}
      />

      <SettingsMenu
        isOpen={isSettingsOpen}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        language={language}
        onLanguageChange={onLanguageChange}
      />

      {!isOnline && (
        <div className="offline-banner">
          ⚠️ You're offline. Messages will be sent when connection is restored.
        </div>
      )}

      {isSearchOpen && (
        <div className="search-bar active">
          <input
            type="text"
            className="search-input"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      <div className="messages-container">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isBookmarked={bookmarkedMessages.includes(message.id)}
            onToggleBookmark={() => onToggleBookmark(message.id)}
          />
        ))}
        
        {isTyping && (
          <div className="message-bubble message-bot">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <QuickReplies
        quickReplies={quickReplies}
        onQuickReply={onQuickReply}
      />

      <div className="input-area">
        <div className="input-container">
          <textarea
            className="message-input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{ 
              height: 'auto',
              minHeight: '44px',
              maxHeight: '120px',
              overflow: 'auto'
            }}
          />
          
          <div className="input-actions">
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileUpload}
              className="file-input"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <button
              className="action-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Upload file"
            >
              <Paperclip />
            </button>
            
            <button
              className={`action-btn ${isRecording ? 'recording' : ''}`}
              onClick={onToggleRecording}
              title={isRecording ? 'Stop recording' : 'Start voice recording'}
            >
              <Mic />
            </button>
            
            <button
              className="action-btn send-btn"
              onClick={handleSendClick}
              disabled={!inputValue.trim()}
              title="Send message"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;