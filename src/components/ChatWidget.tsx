import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, Paperclip, MoreVertical, Search, Bookmark, Download, Copy, Share2 } from 'lucide-react';
import '../styles/chatbot.css';
import ChatWindow from './ChatWindow';

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

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
      isAI: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [bookmarkedMessages, setBookmarkedMessages] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies: QuickReply[] = [
    { id: '1', text: 'Tell me a joke' },
    { id: '2', text: 'What\'s the weather?' },
    { id: '3', text: 'Help me with coding' },
    { id: '4', text: 'Explain AI concepts' }
  ];

  const aiSuggestions = [
    'How can I improve my productivity?',
    'What are the latest tech trends?',
    'Help me brainstorm ideas',
    'Summarize this topic for me'
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      'That\'s an interesting question! Let me think about that...',
      'I understand what you\'re asking. Here\'s my perspective...',
      'Great point! Based on my knowledge, I would say...',
      'I\'d be happy to help you with that. Let me explain...',
      'That\'s a common question. The answer depends on several factors...'
    ];
    
    if (userMessage.toLowerCase().includes('joke')) {
      return 'Why don\'t scientists trust atoms? Because they make up everything! 😄';
    }
    
    if (userMessage.toLowerCase().includes('weather')) {
      return 'I don\'t have access to real-time weather data, but I recommend checking your local weather app or website for accurate forecasts! ☀️';
    }
    
    if (userMessage.toLowerCase().includes('coding') || userMessage.toLowerCase().includes('code')) {
      return 'I\'d love to help you with coding! What programming language or specific problem are you working on? 💻';
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async (content: string, isQuickReply = false) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateAIResponse(content),
        timestamp: new Date(),
        isAI: true
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Add confetti for certain responses
      if (content.toLowerCase().includes('joke') || content.toLowerCase().includes('thank')) {
        createConfetti();
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.text, true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `📎 Uploaded: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
      
      // Mock file processing
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `I've received your file "${file.name}". I'm analyzing it now...`,
          timestamp: new Date(),
          isAI: true
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // Mock recording for 3 seconds
          setTimeout(() => {
            setIsRecording(false);
            sendMessage('🎤 Voice message: "Hello, this is a voice message"');
          }, 3000);
        })
        .catch(() => {
          alert('Microphone access denied');
          setIsRecording(false);
        });
    }
  };

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    const confettiContainer = document.querySelector('.chat-window');
    
    if (!confettiContainer) return;
    
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confettiContainer.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 1000);
    }
  };

  const toggleBookmark = (messageId: string) => {
    setBookmarkedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const downloadChatPDF = () => {
    const chatContent = messages.map(msg => 
      `${msg.type.toUpperCase()} [${msg.timestamp.toLocaleString()}]: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n');
    
    navigator.clipboard.writeText(chatContent).then(() => {
      alert('Chat copied to clipboard!');
    });
  };

  const shareChat = () => {
    if (navigator.share) {
      const chatSummary = `AI Chat Summary: ${messages.length} messages exchanged`;
      navigator.share({
        title: 'AI Chat',
        text: chatSummary,
        url: window.location.href
      });
    } else {
      copyChat();
    }
  };

  const filteredMessages = searchQuery 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button 
          className="chat-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle />
        </button>
      ) : (
        <ChatWindow
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          messages={filteredMessages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={sendMessage}
          isRecording={isRecording}
          onToggleRecording={toggleRecording}
          onFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          language={language}
          onLanguageChange={setLanguage}
          isSettingsOpen={isSettingsOpen}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
          isSearchOpen={isSearchOpen}
          onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          quickReplies={quickReplies}
          onQuickReply={handleQuickReply}
          isTyping={isTyping}
          isOnline={isOnline}
          bookmarkedMessages={bookmarkedMessages}
          onToggleBookmark={toggleBookmark}
          onDownloadPDF={downloadChatPDF}
          onCopyChat={copyChat}
          onShareChat={shareChat}
          messagesEndRef={messagesEndRef}
        />
      )}
    </div>
  );
};

export default ChatWidget;