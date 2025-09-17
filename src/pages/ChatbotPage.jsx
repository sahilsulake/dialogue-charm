import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Paperclip, MoreVertical, Search, Settings, Download, Copy, Share2, Bookmark } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
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
  const [bookmarkedMessages, setBookmarkedMessages] = useState([]);
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { id: '1', text: 'Tell me a joke' },
    { id: '2', text: 'What\'s the weather?' },
    { id: '3', text: 'Help me with coding' },
    { id: '4', text: 'Explain AI concepts' }
  ];

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

  const generateAIResponse = (userMessage) => {
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

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateAIResponse(content),
        timestamp: new Date(),
        isAI: true
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply.text);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `📎 Uploaded: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
      
      setTimeout(() => {
        const botResponse = {
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
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
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

  const toggleBookmark = (messageId) => {
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={downloadChatPDF}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={copyChat}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={shareChat}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {/* Settings Dropdown */}
              {isSettingsOpen && (
                <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4 w-64 z-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                      <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</span>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent text-sm text-gray-700 dark:text-gray-300 border-none outline-none"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-800">
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white px-4 py-2 text-sm text-center">
          ⚠️ You're offline. Messages will be sent when connection is restored.
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-2xl relative ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-700 rounded-bl-sm'
                  }`}
                >
                  {message.isAI && (
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      AI
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs opacity-70 ${message.type === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <button
                      onClick={() => toggleBookmark(message.id)}
                      className={`ml-2 opacity-50 hover:opacity-100 transition-opacity ${
                        bookmarkedMessages.includes(message.id) ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm border dark:border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply)}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  {reply.text}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[44px] max-h-[120px]"
                  style={{ 
                    height: 'auto',
                    minHeight: '44px',
                    maxHeight: '120px',
                    overflow: 'auto'
                  }}
                />
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-full transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;