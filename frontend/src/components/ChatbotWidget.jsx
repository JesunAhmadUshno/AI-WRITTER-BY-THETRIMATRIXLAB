import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { chatbotResponses } from '../mock';

const ChatbotWidget = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm your AI writing assistant. How can I help you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const nextId = useRef(2); // not messages.length: a second send before the bot replies would reuse a pending id

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('plan')) {
      return chatbotResponses.pricing;
    } else if (message.includes('feature') || message.includes('what can')) {
      return chatbotResponses.features;
    } else if (message.includes('demo') || message.includes('try')) {
      return chatbotResponses.demo;
    } else if (message.includes('compare') || message.includes('jasper') || message.includes('copy.ai')) {
      return chatbotResponses.comparison;
    } else if (message.includes('support') || message.includes('help')) {
      return chatbotResponses.support;
    } else if (message.includes('sign up') || message.includes('start') || message.includes('register')) {
      return chatbotResponses.signup;
    } else if (message.includes('role') || message.includes('character') || message.includes('professor')) {
      return chatbotResponses.roles;
    } else if (message.includes('academic') || message.includes('research') || message.includes('paper')) {
      return chatbotResponses.academic;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return chatbotResponses.greeting;
    } else {
      return chatbotResponses.default;
    }
  };

  // Takes the text explicitly: a quick button cannot rely on inputValue, which its setInputValue has not updated yet.
  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = {
      id: nextId.current++,
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: nextId.current++,
        text: getResponse(text),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickButtons = [
    { text: "Show Pricing", action: "What are your pricing plans?" },
    { text: "Try Demo", action: "How can I try the demo?" },
    { text: "Features", action: "What features do you offer?" },
    { text: "Get Started", action: "How do I sign up?" }
  ];

  const handleQuickButton = (action) => {
    handleSendMessage(action);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        className="hover-lift"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '1.5rem',
            width: '350px',
            height: '500px',
            background: 'var(--bg-card)',
            borderRadius: '1rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            border: '1px solid var(--border-light)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border-light)',
              borderRadius: '1rem 1rem 0 0',
              background: 'var(--gradient-hero-subtle)'
            }}
          >
            <h3 className="heading-3" style={{ margin: 0, textAlign: 'center' }}>
              AI Writing Assistant
            </h3>
            <p className="caption" style={{ margin: '0.25rem 0 0', textAlign: 'center' }}>
              Ask me anything about our features!
            </p>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.75rem',
                    borderRadius: '1rem',
                    background: message.isBot ? 'var(--accent-purple-200)' : 'var(--text-primary)',
                    color: message.isBot ? 'var(--text-primary)' : 'white'
                  }}
                >
                  <p className="body-small" style={{ margin: 0, lineHeight: 1.4 }}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: '1rem',
                    background: 'var(--accent-purple-200)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <p className="body-small" style={{ margin: 0 }}>
                    Typing...
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Buttons */}
          {messages.length === 1 && (
            <div style={{ padding: '0 1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {quickButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickButton(button.action)}
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '1rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: '1rem',
              borderTop: '1px solid var(--border-light)',
              borderRadius: '0 0 1rem 1rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'end' }}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  border: '1px solid var(--border-input)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  resize: 'none',
                  minHeight: '40px',
                  maxHeight: '80px',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  background: 'var(--bg-card)'
                }}
                rows={1}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                style={{
                  background: inputValue.trim() ? 'var(--text-primary)' : 'var(--border-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;