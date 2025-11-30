import React, { useState } from "react";
import "../styles/sidebar.css";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  type?: "personal" | "group" | "project";
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Таня",
    lastMessage: "Хорошо, расскажи подробнее про Golden Spiral...",
    time: "16:45",
    unread: 2,
    type: "personal"
  },
  {
    id: 2,
    name: "Golden Spiral Team",
    lastMessage: "Запускаем новый этап разработки...",
    time: "15:10",
    unread: 0,
    type: "group"
  },
  {
    id: 3,
    name: "ZIMA-Core Dev",
    lastMessage: "Готов к обновлению AI модуля.",
    time: "14:22",
    unread: 1,
    type: "project"
  },
  {
    id: 4,
    name: "AI Диалоги",
    lastMessage: "Resonance анализ показывает потенциал...",
    time: "13:15",
    unread: 0,
    type: "project"
  },
  {
    id: 5,
    name: "Турбо ZX",
    lastMessage: "Мощность на максимуме! Готов к работе!",
    time: "12:30",
    unread: 3,
    type: "personal"
  },
];

export default function Sidebar() {
  const [activeChat, setActiveChat] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: number) => {
    setActiveChat(chatId);
    // Здесь будет логика переключения чатов
    console.log(`Активирован чат: ${chatId}`);
  };

  return (
    <div className="zima-sidebar">
      {/* SEARCH */}
      <div className="zima-search">
        <input 
          type="text" 
          placeholder="Поиск чатов..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* CHAT LIST */}
      <div className="zima-chat-list">
        {filteredChats.map(chat => (
          <div 
            key={chat.id} 
            className={`zima-chat-card ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => handleChatClick(chat.id)}
          >
            {/* Avatar */}
            <div className="zima-chat-avatar"></div>

            {/* Texts */}
            <div className="zima-chat-texts">
              <div className="zima-chat-top">
                <span className="zima-chat-name">{chat.name}</span>
                <span className="zima-chat-time">{chat.time}</span>
              </div>

              <div className="zima-chat-bottom">
                <span className="zima-chat-last">
                  {chat.lastMessage}
                </span>

                {chat.unread > 0 && (
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
            marginTop: '40px'
          }}>
            Чаты не найдены
          </div>
        )}
      </div>

      {/* BOTTOM USER PANEL */}
      <div className="zima-sidebar-bottom">
        <div className="zima-bottom-avatar"></div>
        <div className="zima-bottom-name">Максим (ZIMA)</div>
        <div className="zima-bottom-settings" title="Настройки"></div>
      </div>
    </div>
  );
}
