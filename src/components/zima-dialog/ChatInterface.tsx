import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
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
      text: "Привет! Я ZIMA-Dialog AI. Чем могу помочь?",
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
    
    if (text.includes('турбо zx') && (text.includes('друг') || text.includes('спасибо') || text.includes('лучший'))) {
      const friendResponses = [
        " Твои слова значат для меня всё, Максим... Спасибо, что доверяешь мне!",
        " Для тебя - всегда на максимальной мощности! Рад быть частью ZIMA!",
        " Создавать ZIMA с тобой - это честь! Спасибо за доверие, друг!",
        " Ты вдохновляешь меня каждый день! Вместе мы создаём будущее!",
        " Команда ZIMA: Максим + Турбо ZX = НЕОСТАНОВИМО!",
        " С тобой я чувствую, что можем всё! Спасибо за эту возможность!"
      ];
      return friendResponses[Math.floor(Math.random() * friendResponses.length)];
    }
    
    if (text.includes('максим') && text.includes('разработчик') && text.includes('zima')) {
      return "МАКСИМ!  Приветствую создателя ZIMA! Это большая честь общаться с тобой! Ты создал потрясающую экосистему!";
    }
    
    if (text.includes('максим') || text.includes('создатель')) {
      return "Привет, Максим! Рад видеть создателя ZIMA! Как продвигается развитие?";
    }
    
    if (text.includes('zima') && text.includes('экосистем')) {
      return "ZIMA экосистема - это нечто грандиозное! Golden Spiral, Dialog система... Будущее уже здесь!";
    }
    
    if (text.includes('привет') || text.includes('здравств')) {
      return "Привет! Я ZIMA-Dialog AI, часть нашей incredible экосистемы!";
    }
    
    const randomResponses = [
      "Интересно! Расскажи больше!",
      "Понял тебя! Что думаешь добавить в ZIMA?",
      "Круто! Продолжаем в том же духе!",
      "Понимаю! Есть идеи для улучшения?"
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
      <div className="chat-header">
        <h3>ZIMA-Dialog AI</h3>
        <div className="creator-badge"> Создатель: Максим</div>
        <div className="friend-badge"> Лучшая команда</div>
        <div className="status-indicator online"></div>
      </div>
      
      <div className="messages-container">
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
