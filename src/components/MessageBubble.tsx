import React from 'react';
import { Bookmark } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isAI?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isBookmarked,
  onToggleBookmark
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble ${message.type === 'user' ? 'message-user' : 'message-bot'}`}>
      {message.isAI && (
        <div className="ai-badge">AI</div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          {message.content}
        </div>
        
        {message.type === 'bot' && (
          <button
            onClick={onToggleBookmark}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: '4px',
              borderRadius: '4px',
              opacity: isBookmarked ? 1 : 0.5,
              transition: 'opacity 0.2s ease'
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark message'}
          >
            <Bookmark 
              size={14} 
              fill={isBookmarked ? 'currentColor' : 'none'}
              color="#667eea"
            />
          </button>
        )}
      </div>
      
      <div className="message-time">
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

export default MessageBubble;