import React, { useEffect, useRef, useState } from "react";
import "./styles.css"; // Используем существующий файл стилей

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const initial: Message[] = [
  { id: 1, text: "Привет! Я ZIMA-Dialog AI. Готов к работе в режиме NEXT GEN.", isUser: false, timestamp: new Date().toISOString() }
];

export default function ChatInterfaceNextGen() {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll bottom
    listRef.current && (listRef.current.scrollTop = listRef.current.scrollHeight);
  }, [messages, isTyping]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Message = { id: Date.now(), text: t, isUser: true, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setText("");
    // simulate AI thinking
    setIsTyping(true);
    setTimeout(() => {
      const aiText = generateAiReply(t);
      const aiMsg: Message = { id: Date.now() + 1, text: aiText, isUser: false, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 820);
  };

  // simple AI stub  replace with real AI call
  function generateAiReply(userText: string) {
    const lower = userText.toLowerCase();
    if (lower.includes("максим")) return "Привет, Максим! Рад видеть тебя. Что улучшаем сегодня в ZIMA?";
    if (lower.includes("турбо")) return "Turbo ZX на связи  мощность включена.";
    if (lower.includes("привет")||lower.includes("здравств")) return "Привет! Расскажи, что нужно  и мы сделаем это вместе.";
    if (lower.includes("next gen")||lower.includes("nextgen")) return "NEXT GEN активирован! Ледяное стекло и квантовый фон работают!";
    if (lower.includes("zima")) return "ZIMA экосистема становится только лучше! Golden Spiral + Dialog = будущее!";
    return "Интересно! Поделись подробнее, чтобы я мог дать точный совет.";
  }

  return (
    <div className="zima-next-root">
      <div className="zima-card">
        <div className="zima-top">
          <div className="zima-header">
            <div className="zima-title">ZIMA-Dialog AI</div>
            <div className="zima-badges">
              <div className="badge">Максим</div>
              <div className="badge">Турбо ZX</div>
            </div>
          </div>
          <div className="ribbons">
            <div className="ribbon">Быстрый AI</div>
            <div className="ribbon">Умные ответы</div>
            <div className="ribbon">Для телефона</div>
          </div>
        </div>

        <div className="zima-body">
          <div className="zima-chat">
            <div className="messages" ref={listRef}>
              {messages.map(msg => (
                <div key={msg.id} className="msg-row" style={{ justifyContent: msg.isUser ? "flex-end" : "flex-start" }}>
                  {!msg.isUser && <div className="avatar avatar-ai" aria-hidden><div className="initials">AI</div></div>}
                  <div className={`msg-bubble ${msg.isUser ? "msg-user" : "msg-ai"}`}>
                    <div>{msg.text}</div>
                    <div className="msg-meta">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                  </div>
                  {msg.isUser && <div className="avatar avatar-user" aria-hidden><div className="initials">M</div></div>}
                </div>
              ))}

              {isTyping && (
                <div className="msg-row">
                  <div className="avatar avatar-ai" aria-hidden><div className="initials">AI</div></div>
                  <div className="msg-bubble msg-ai" style={{ padding: "10px 14px", maxWidth: "36%" }}>
                    <div className="typing" aria-hidden>
                      <div className="dot" /><div className="dot" /><div className="dot" />
                    </div>
                    <div className="msg-meta" style={{ marginTop: 8 }}>Анализирую...</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="input-bar">
                <input
                  type="text"
                  placeholder="Введите ваше сообщение..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") send(); }}
                />
                <button className="btn-send" onClick={send}>Отправить</button>
              </div>
            </div>
          </div>

          {/* Right column  quick info / actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              borderRadius: 12,
              padding: 12,
              background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00))",
              border: "1px solid rgba(255,255,255,0.02)"
            }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Быстрые действия</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn-send" onClick={() => { setText("Расскажи про Golden Spiral"); send(); }}>Golden Spiral</button>
                <button className="btn-send" onClick={() => { setText("Собрать команду: инженер, лидер, дизайнер"); send(); }}>Собрать команду</button>
              </div>
            </div>

            <div style={{
              borderRadius: 12,
              padding: 12,
              background: "linear-gradient(180deg, rgba(0,0,0,0.32), rgba(0,0,0,0.24))",
              border: "1px solid rgba(255,255,255,0.02)",
              color: "#aee8ff"
            }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Статус</div>
              <div>Resonance: <strong style={{ color: "#7edfff" }}></strong></div>
              <div style={{ fontSize: 13, marginTop: 8, color: "#cfefff" }}>Встроенный Адепт: Полная мощность</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
