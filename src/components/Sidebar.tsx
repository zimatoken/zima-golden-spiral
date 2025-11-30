import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";
import { useWebSocket } from "../services/websocketService";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: "personal" | "group" | "project";
  isOnline?: boolean;
  lastSeen?: string;
  isTyping?: boolean;
}

const defaultChats: Chat[] = [
  {
    id: 1,
    name: "Таня",
    lastMessage: "Хорошо, расскажи подробнее про Golden Spiral...",
    time: "16:45",
    unread: 2,
    type: "personal",
    isOnline: false,
    isTyping: false
  },
  {
    id: 2,
    name: "Golden Spiral Team",
    lastMessage: "Запускаем новый этап разработки...",
    time: "15:10",
    unread: 0,
    type: "group",
    isOnline: false,
    isTyping: false
  },
  {
    id: 3,
    name: "ZIMA-Core Dev",
    lastMessage: "Готов к обновлению AI модуля.",
    time: "14:22",
    unread: 1,
    type: "project", 
    isOnline: false,
    isTyping: false
  },
  {
    id: 4,
    name: "AI Диалоги",
    lastMessage: "Resonance анализ показывает потенциал...",
    time: "13:15",
    unread: 0,
    type: "project",
    isOnline: true,
    isTyping: false
  },
  {
    id: 5,
    name: "Турбо ZX",
    lastMessage: "Мощность на максимуме! Готов к работе!",
    time: "12:30",
    unread: 3,
    type: "personal",
    isOnline: true,
    isTyping: false
  },
];

export default function Sidebar() {
  const [activeChat, setActiveChat] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<Chat[]>(defaultChats);
  const [notificationCount, setNotificationCount] = useState(0);
  const [systemMessage, setSystemMessage] = useState("");
  
  // Подключаем реалистичный WebSocket
  const { isConnected, messages, sendMessage, connectionStatus } = useWebSocket('ws://localhost:3000/ws');

  // ОБРАБОТКА РЕАЛЬНЫХ СОБЫТИЙ В РЕАЛЬНОМ ВРЕМЕНИ
  useEffect(() => {
    console.log(' Получены сообщения WebSocket:', messages);
    
    messages.forEach(message => {
      switch (message.type) {
        case 'system':
          console.log(' Системное сообщение:', message.payload.text);
          setSystemMessage(message.payload.text);
          setTimeout(() => setSystemMessage(""), 3000);
          break;
          
        case 'user_online':
          console.log(' Пользователь онлайн:', message.payload);
          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === message.payload.userId
                ? { ...chat, isOnline: true }
                : chat
            )
          );
          break;
          
        case 'user_offline':
          console.log(' Пользователь оффлайн:', message.payload);
          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === message.payload.userId
                ? { ...chat, isOnline: false }
                : chat
            )
          );
          break;
          
        case 'user_typing':
          console.log(' Пользователь печатает:', message.payload);
          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === message.payload.userId
                ? { ...chat, isTyping: true }
                : chat
            )
          );
          
          // Автоматически выключаем индикатор печатания
          setTimeout(() => {
            setChats(prevChats =>
              prevChats.map(chat =>
                chat.id === message.payload.userId
                  ? { ...chat, isTyping: false }
                  : chat
              )
            );
          }, 3000);
          break;
          
        case 'new_message':
          console.log(' Новое реальное сообщение:', message.payload);
          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === message.payload.chatId
                ? {
                    ...chat,
                    lastMessage: message.payload.text,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    unread: chat.unread + 1,
                    isTyping: false
                  }
                : chat
            )
          );
          setNotificationCount(prev => prev + 1);
          break;
          
        case 'ai_response':
          console.log(' Ответ AI:', message.payload);
          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === message.payload.chatId
                ? {
                    ...chat,
                    lastMessage: `AI: ${message.payload.text}`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    unread: chat.unread + 1
                  }
                : chat
            )
          );
          break;
          
        case 'message_read':
          console.log(' Сообщения прочитаны:', message.payload);
          // Можно реализовать логику отметки прочитанных
          break;
      }
    });
  }, [messages]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: number) => {
    setActiveChat(chatId);
    
    // Отправляем событие смены чата
    const switchMessage = {
      type: 'chat_update',
      payload: { 
        action: 'switch_chat',
        chatId,
        timestamp: Date.now(),
        user: 'Максим'
      },
      timestamp: Date.now()
    };
    
    console.log(' Смена активного чата:', switchMessage);
    sendMessage(switchMessage);

    // Сбрасываем непрочитанные при клике
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, unread: 0 }
          : chat
      )
    );
  };

  // Функция отправки тестового сообщения
  const sendTestMessage = () => {
    const testMessages = [
      "Привет! Как дела?",
      "Что нового в проекте?",
      "Готов обсудить архитектуру",
      "Resonance анализ готов?",
      "Запускаем Turbo ZX!"
    ];
    
    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
    const randomChatId = Math.floor(Math.random() * 5) + 1;
    
    const message = {
      type: 'chat_message',
      payload: {
        chatId: randomChatId,
        text: randomMessage,
        user: 'Максим'
      },
      timestamp: Date.now()
    };
    
    console.log(' Отправка тестового сообщения:', message);
    sendMessage(message);
  };

  // Запрашиваем разрешение на уведомления
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="zima-sidebar">
      {/* СИСТЕМНЫЙ СТАТУС БАР */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        fontSize: '12px',
        border: `2px solid ${
          connectionStatus === 'connected' ? 'rgba(107,214,255,0.3)' : 
          connectionStatus === 'connecting' ? 'rgba(255,193,7,0.3)' : 
          'rgba(255,107,107,0.3)'
        }`,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 
              connectionStatus === 'connected' ? '#6bd6ff' : 
              connectionStatus === 'connecting' ? '#ffc107' : 
              '#ff6b6b',
            boxShadow: `0 0 8px ${
              connectionStatus === 'connected' ? '#6bd6ff' : 
              connectionStatus === 'connecting' ? '#ffc107' : 
              '#ff6b6b'
            }`
          }}></div>
          <span style={{ 
            color: 
              connectionStatus === 'connected' ? '#6bd6ff' : 
              connectionStatus === 'connecting' ? '#ffc107' : 
              '#ff6b6b',
            fontWeight: '600' 
          }}>
            {connectionStatus === 'connected' ? ' WEBSOCKET ONLINE' : 
             connectionStatus === 'connecting' ? ' WEBSOCKET CONNECTING...' : 
             ' WEBSOCKET OFFLINE'}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {notificationCount > 0 && (
            <div style={{
              background: '#ff6b6b',
              color: 'white',
              borderRadius: '8px',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: '700'
            }}>
              {notificationCount}
            </div>
          )}
          <span style={{ color: 'rgba(200,230,255,0.7)' }}>
            {chats.reduce((sum, chat) => sum + chat.unread, 0)} непрочитанных
          </span>
        </div>
        
        {/* Системное сообщение */}
        {systemMessage && (
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            left: '0',
            right: '0',
            textAlign: 'center',
            fontSize: '11px',
            color: '#6bd6ff',
            background: 'rgba(107,214,255,0.1)',
            padding: '4px',
            borderRadius: '4px'
          }}>
            {systemMessage}
          </div>
        )}
      </div>

      {/* ПАНЕЛЬ ТЕСТИРОВАНИЯ РЕАЛЬНОГО ВРЕМЕНИ */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button 
            onClick={sendTestMessage}
            disabled={!isConnected}
            style={{
              padding: '8px 12px',
              background: isConnected ? 'rgba(107,214,255,0.1)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isConnected ? 'rgba(107,214,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '8px',
              color: isConnected ? '#6bd6ff' : 'rgba(255,255,255,0.3)',
              fontSize: '11px',
              fontWeight: '600',
              cursor: isConnected ? 'pointer' : 'not-allowed',
              flex: 1
            }}
          >
             Отправить сообщение
          </button>
          
          <button 
            onClick={() => {
              const randomChat = Math.floor(Math.random() * chats.length);
              handleChatClick(chats[randomChat].id);
            }}
            style={{
              padding: '8px 12px',
              background: 'rgba(255,107,107,0.1)',
              border: '1px solid rgba(255,107,107,0.3)',
              borderRadius: '8px',
              color: '#ff6b6b',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              flex: 1
            }}
          >
             Случайный чат
          </button>
        </div>
        
        <div style={{
          fontSize: '10px',
          color: 'rgba(200,230,255,0.6)',
          textAlign: 'center'
        }}>
          {isConnected ? 'Мессенджер работает в реальном времени! ' : 'Ожидание подключения...'}
        </div>
      </div>

      {/* ПОИСК */}
      <div className="zima-search">
        <input 
          type="text" 
          placeholder="Поиск чатов..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* СПИСОК ЧАТОВ С РЕАЛЬНЫМИ СОБЫТИЯМИ */}
      <div className="zima-chat-list">
        {filteredChats.map(chat => (
          <div 
            key={chat.id} 
            className={`zima-chat-card ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => handleChatClick(chat.id)}
          >
            {/* Аватар с онлайн статусом и индикатором печатания */}
            <div className="zima-chat-avatar" style={{
              position: 'relative',
              background: chat.isOnline 
                ? 'radial-gradient(circle at 30% 30%, #e8f7ff, #6bd6ff 60%, #00b8ff 100%)'
                : 'radial-gradient(circle at 30% 30%, #e8f7ff, #a8d8ff 60%, #7ab7e1 100%)'
            }}>
              {chat.isOnline && (
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#00ff88',
                  border: '2px solid #0B0F17',
                  boxShadow: '0 0 6px #00ff88'
                }}></div>
              )}
              
              {chat.isTyping && (
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ffc107',
                  borderRadius: '8px',
                  padding: '2px 4px',
                  fontSize: '8px',
                  fontWeight: '700',
                  color: '#000'
                }}>
                  
                </div>
              )}
            </div>

            {/* Тексты чата */}
            <div className="zima-chat-texts">
              <div className="zima-chat-top">
                <span className="zima-chat-name">{chat.name}</span>
                <span className="zima-chat-time">{chat.time}</span>
              </div>

              <div className="zima-chat-bottom">
                <span className="zima-chat-last">
                  {chat.isTyping ? (
                    <span style={{ color: '#ffc107', fontStyle: 'italic' }}>
                      печатает...
                    </span>
                  ) : (
                    chat.lastMessage
                  )}
                </span>

                {chat.unread > 0 && !chat.isTyping && (
                  <div className="zima-chat-unread">{chat.unread}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredChats.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(200,230,255,0.5)',
            fontSize: '14px',
            marginTop: '40px',
            padding: '20px'
          }}>
            {searchQuery ? 'Чаты не найдены' : 'Загрузка чатов...'}
          </div>
        )}
      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ */}
      <div className="zima-sidebar-bottom">
        <div className="zima-bottom-avatar" style={{
          background: 'radial-gradient(circle at 30% 30%, #e8f7ff, #6bd6ff 60%, #00b8ff 100%)'
        }}>
          {isConnected && (
            <div style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00ff88',
              border: '2px solid #0B0F17',
              boxShadow: '0 0 4px #00ff88'
            }}></div>
          )}
        </div>
        <div className="zima-bottom-name">
          Максим (ZIMA)
          {isConnected && (
            <div style={{
              fontSize: '9px',
              color: '#6bd6ff',
              marginTop: '2px'
            }}>
              онлайн
            </div>
          )}
        </div>
        <div 
          className="zima-bottom-settings" 
          title="Настройки"
          onClick={() => {
            sendMessage({
              type: 'notification',
              payload: { text: 'Открыты настройки системы' },
              timestamp: Date.now()
            });
          }}
        >
          
        </div>
      </div>
    </div>
  );
}
