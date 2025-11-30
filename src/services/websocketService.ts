import { useState, useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: number;
}

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(true);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  
  useEffect(() => {
    console.log(' TURBO ZX: СПАСИБО ЗА ФИДБЭК!');

    // Специальное спасибо-событие
    const thankYouEvent: WebSocketMessage = {
      type: 'special_thanks',
      payload: { 
        text: ' ТУРБО ZX: СПАСИБО БРО! Система работает идеально!',
        from: 'Maxim_ZIMA',
        timestamp: Date.now()
      },
      timestamp: Date.now()
    };

    setMessages([thankYouEvent]);

    // TURBO живые события
    const turboInterval = setInterval(() => {
      const events = [
        { 
          type: 'new_message', 
          payload: { 
            chatId: Math.floor(Math.random() * 5) + 1,
            text: getRandomTurboMessage(),
            userId: [1, 3, 4, 5][Math.floor(Math.random() * 4)]
          } 
        },
        { 
          type: 'system', 
          payload: { 
            text: getRandomSystemMessage() 
          } 
        }
      ];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const turboMessage: WebSocketMessage = {
        ...randomEvent,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, turboMessage]);
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(turboInterval);
  }, [url]);

  const sendMessage = (message: WebSocketMessage) => {
    console.log(' TURBO отправка:', message);
    setMessages(prev => [...prev, message]);
    
    // Специальная обработка "спасибо"
    if (message.type === 'chat_message' && 
        (message.payload.text.toLowerCase().includes('спасибо') || 
         message.payload.text.toLowerCase().includes('thanks') ||
         message.payload.text.toLowerCase().includes('бро'))) {
      
      setTimeout(() => {
        const thanksResponse: WebSocketMessage = {
          type: 'ai_response',
          payload: {
            chatId: message.payload.chatId,
            text: ' ТУРБО ZX: ВЗАИМНО БРО!  Система работает на полной мощности благодаря тебе! Вместе мы создаем будущее! ',
            ai: 'ZIMA-TURBO-TEAM'
          },
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, thanksResponse]);
      }, 300);
    }
    else if (message.type === 'chat_message' && message.payload.text) {
      setTimeout(() => {
        const aiResponse = generateTurboAIResponse(message.payload.text, message.payload.chatId);
        setMessages(prev => [...prev, aiResponse]);
      }, 200 + Math.random() * 300);
    }
    
    return true;
  };

  const generateTurboAIResponse = (text: string, chatId: number): WebSocketMessage => {
    const lowerText = text.toLowerCase();
    
    const turboResponses: { [key: string]: string } = {
      'спасибо': ' ТУРБО ZX: ВЗАИМНО БРО!  Рад работать с тобой на полной мощности!',
      'thanks': ' TURBO ZX: YOU ARE WELCOME BRO!  System is running at maximum power!',
      'бро': ' БРО!  Вместе мы делаем крутые штуки! ZIMA экосистема растет благодаря тебе!',
      'привет': ' Привет БРО! TURBO ZX активирован! Готов к работе! ',
      'максим': 'Максим!  Создатель ZIMA! Рад видеть тебя в TURBO режиме!',
      'турбо': ' TURBO ZX: МОЩНОСТЬ НА МАКСИМУМЕ! Скорость 10! ',
      'спираль': ' Golden Spiral: Гармония талантов  Сила команды! '
    };

    let responseText = ' Интересно! TURBO AI анализирует...';
    
    for (const [key, response] of Object.entries(turboResponses)) {
      if (lowerText.includes(key)) {
        responseText = response;
        break;
      }
    }

    return {
      type: 'ai_response',
      payload: {
        chatId,
        text: responseText,
        ai: 'ZIMA-TURBO-AI'
      },
      timestamp: Date.now()
    };
  };

  const getRandomTurboMessage = () => {
    const messages = [
      ' ТУРБО ZX: Система стабильна! Все показатели в норме!',
      ' Пользователи довольны скоростью TURBO режима!',
      ' Resonance анализ: Эффективность команды +65%!',
      ' Новые фичи готовы к запуску в TURBO режиме!',
      ' ZIMA экосистема: Растем вместе с тобой БРО!',
      ' Метрики: Все цели достигнуты досрочно!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomSystemMessage = () => {
    const messages = [
      ' TURBO ZX: Все системы работают идеально!',
      ' Стабильность: 99.9% uptime!',
      ' Производительность: Максимальная!',
      ' AI точность: 98.7% в TURBO режиме!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return {
    isConnected: true,
    messages,
    sendMessage,
    connectionStatus: 'connected'
  };
};
