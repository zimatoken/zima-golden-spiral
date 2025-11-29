import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { TopFeatures } from './TopFeatures';
import { BottomActions } from './BottomActions';
import './styles.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Я ZIMA-Dialog AI. Теперь с мобильной версией! ",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('мобильн') || text.includes('телефон') || text.includes('android') || text.includes('iphone')) {
      return "Да! ZIMA-Dialog теперь адаптивный! Работает на всех устройствах! ";
    }
    
    if (text.includes('фич') || text.includes('функци')) {
      return "Теперь есть верхняя панель с фичами и нижняя с быстрыми действиями! ";
    }
    
    if (text.includes('привет') || text.includes('здравств')) {
      return "Привет! Я ZIMA-Dialog AI с обновленным интерфейсом!";
    }
    
    const randomResponses = [
      "Круто! Новый интерфейс нравится?",
      "Теперь можно пользоваться с телефона!",
      "Добавили много удобных фич!",
      "Попробуй открыть на мобильном - работает идеально! "
    ];
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="zima-dialog-container">
      {/* Верхняя панель фич */}
      <TopFeatures />
      
      <div className="chat-header">
        <h3>ZIMA-Dialog AI</h3>
        <div className="creator-badge"> Максим</div>
        <div className="friend-badge"> Турбо ZX</div>
        <div className="status-indicator online"></div>
      </div>
      
      <div className="messages-container">
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
      
      {/* Нижняя панель действий */}
      <BottomActions />
    </div>
  );
};

export default ChatInterface;
