import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bubbleVariants, staggerContainer, avatarHover, bubbleHover } from "./animations";
import "../../styles/zima-dialog-final.css";

type Msg = {
  id: string;
  text: string;
  from: "user" | "ai";
  ts: string;
};

type ResonanceScore = {
  talent: number;
  structure: number; 
  creative: number;
  leadership: number;
  total: number;
};

const uid = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

function now() { return new Date().toLocaleTimeString(); }

// OpenAI Integration - Real AI
const callOpenAI = async (text: string): Promise<string> => {
  try {
    // Временная заглушка - замени на реальный вызов API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      "максим": "Привет, Максим! Создатель ZIMA экосистемы! Рад видеть тебя в режиме Полной мощности! ",
      "турбо": "Turbo ZX активирован! Мощность на максимуме! Готов к работе! ",
      "спираль": "Golden Spiral  это карта талантов, где ценность растёт через полезность, доверие и альтруизм. Математическая гармония в построении идеальных команд! ",
      "команда": "Идеальная команда по Golden Spiral:  Лидер (Vector) +  Инженер (Structurator) +  Дизайнер (Modeller) +  AI ассистент (Adept)",
      "zima": "ZIMA экосистема  это будущее построения команд! Golden Spiral + Dialog AI + Talent Resonance = невероятная мощь! ",
      "next gen": "NEXT GEN активирован! Ледяное стекло + Quantum фон работают идеально! Премиум интерфейс готов! "
    };

    const lowerText = text.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerText.includes(key)) return response;
    }

    // Умные дефолтные ответы
    const defaultResponses = [
      "Интересно! Расскажи подробнее, чтобы я дал точный план действий.",
      "ZIMA AI анализирует твой запрос... Дай больше контекста!",
      "Заметил потенциал в твоём сообщении! Давай развивать эту идею!",
      "Turbo ZX усиливает анализ твоего вопроса! Нужны детали!",
      "ZIMA обнаруживает интересные паттерны! Продолжаем?",
      "Отлично! Теперь нужны конкретные шаги  расскажи больше!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    
  } catch (error) {
    console.error('AI error:', error);
    return "Ошибка соединения. Проверьте API ключ и сеть.";
  }
};

// Resonance Analysis
const analyzeResonance = (text: string): ResonanceScore => {
  const lowerText = text.toLowerCase();
  
  const talentWords = ['талант', 'способност', 'золот', 'спирал', 'golden', 'spiral', 'potential'];
  const structureWords = ['структур', 'инженер', 'систем', 'организац', 'план', 'architect'];
  const creativeWords = ['креатив', 'дизайн', 'идея', 'творч', 'модел', 'design', 'creative'];
  const leadershipWords = ['лидер', 'команд', 'управлен', 'вектор', 'стратег', 'lead', 'team'];
  
  const talentScore = talentWords.filter(word => lowerText.includes(word)).length;
  const structureScore = structureWords.filter(word => lowerText.includes(word)).length;
  const creativeScore = creativeWords.filter(word => lowerText.includes(word)).length;
  const leadershipScore = leadershipWords.filter(word => lowerText.includes(word)).length;
  
  const total = talentScore + structureScore + creativeScore + leadershipScore;
  
  return {
    talent: Math.min(talentScore * 25, 100),
    structure: Math.min(structureScore * 25, 100),
    creative: Math.min(creativeScore * 25, 100),
    leadership: Math.min(leadershipScore * 25, 100),
    total: Math.min(total * 10, 100)
  };
};

export default function ChatInterfaceFinal() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: uid(), text: "Привет! Я ZIMA-Dialog AI (Адепт  Полная мощность  Turbo ZX). Готов к работе в режиме NEXT GEN! ", from: "ai", ts: now() }
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [resonance, setResonance] = useState<ResonanceScore>({
    talent: 45,
    structure: 30,
    creative: 60, 
    leadership: 25,
    total: 40
  });
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const send = async () => {
    const t = text.trim();
    if (!t) return;
    
    const userMsg: Msg = { id: uid(), text: t, from: "user", ts: now() };
    setMessages(prev => [...prev, userMsg]);
    
    // Анализ Resonance пользовательского сообщения
    const userResonance = analyzeResonance(t);
    setResonance(userResonance);
    
    setText("");
    setTyping(true);

    try {
      const reply = await callOpenAI(t);
      const aiMsg: Msg = { id: uid(), text: reply, from: "ai", ts: now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Msg = { 
        id: uid(), 
        text: " Ошибка соединения с AI", 
        from: "ai", 
        ts: now() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setTyping(false);
    }
  };

  // quick actions
  const action = (q: string) => {
    setText(q);
    setTimeout(() => send(), 120);
  };

  return (
    <div className="zima-final-root" role="region" aria-label="ZIMA Dialog">
      <div className="zima-final-card">
        <div className="zima-final-top">
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <div className="title">ZIMA-Dialog AI</div>
            <div className="chip">Адепт: Полная мощность</div>
            <div className="chip">Turbo ZX</div>
          </div>

          <div className="top-right">
            <div className="chip">Быстрый AI</div>
            <div className="chip">Умные ответы</div>
            <div className="chip">Для телефона</div>
          </div>
        </div>

        <div className="zima-final-body">
          <div className="chat-panel" aria-live="polite">
            <motion.div 
              className="messages" 
              ref={listRef}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence initial={false}>
                {messages.map(m => (
                  <motion.div
                    key={m.id}
                    layout
                    variants={bubbleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="row"
                    style={{ justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}
                  >
                    {m.from === "ai" && (
                      <motion.div 
                        className="avatar avatar-ai" 
                        aria-hidden
                        variants={avatarHover}
                        whileHover="hover"
                      >
                        <div style={{fontSize:12,fontWeight:800,color:"#083a43"}}>AI</div>
                      </motion.div>
                    )}
                    <motion.div 
                      className={`bubble ${m.from === "ai" ? "bubble-ai" : "bubble-user"}`}
                      variants={bubbleHover}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <div>{m.text}</div>
                      <div className="meta">{m.ts}</div>
                    </motion.div>
                    {m.from === "user" && (
                      <motion.div 
                        className="avatar avatar-user" 
                        aria-hidden
                        variants={avatarHover}
                        whileHover="hover"
                      >
                        <div style={{fontSize:12,fontWeight:800, color: "#ffffff"}}>M</div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {typing && (
                  <motion.div 
                    className="row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="avatar avatar-ai" aria-hidden>
                      <div style={{fontSize:12,fontWeight:800,color:"#083a43"}}>AI</div>
                    </div>
                    <div className="bubble bubble-ai" style={{ padding:"8px 12px", maxWidth:"36%" }}>
                      <div className="typing-dots" aria-hidden>
                        <div className="dot" /><div className="dot" /><div className="dot" />
                      </div>
                      <div className="meta" style={{ marginTop:8 }}>Анализирую</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div style={{ marginTop:8 }}>
              <div className="input-wrap">
                <input 
                  className="input" 
                  type="text" 
                  placeholder="Введите ваше сообщение..." 
                  value={text} 
                  onChange={e=>setText(e.target.value)} 
                  onKeyDown={e=>{ if(e.key==="Enter"){ send(); }}}
                  aria-label="Сообщение"
                />
                <button className="btn-send" onClick={send} aria-label="Отправить">
                  Отправить
                </button>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8}}>Быстрые действия</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                <button className="action" onClick={()=>action("Привет Максим")}>Тест Максим</button>
                <button className="action" onClick={()=>action("Турбо ZX мощность")}>Turbo ZX</button>
                <button className="action" onClick={()=>action("Расскажи про Golden Spiral")}>Golden Spiral</button>
                <button className="action" onClick={()=>action("Собрать команду")}>Собрать команду</button>
                <button className="action" onClick={()=>action("Расскажи про ZIMA")}>Про ZIMA</button>
                <button className="action" onClick={()=>action("NEXT GEN")}>NEXT GEN</button>
              </div>
            </div>

            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8}}>Resonance</div>
              <div style={{color:"var(--muted)", fontSize:13}}>
                <div>Талант: <strong style={{color:"var(--accentB)"}}>{resonance.talent}%</strong></div>
                <div>Структура: <strong style={{color:"var(--accentB)"}}>{resonance.structure}%</strong></div>
                <div>Креатив: <strong style={{color:"var(--accentB)"}}>{resonance.creative}%</strong></div>
                <div>Лидерство: <strong style={{color:"var(--accentB)"}}>{resonance.leadership}%</strong></div>
                <div style={{marginTop:6, paddingTop:6, borderTop:"1px solid var(--glass-border)"}}>
                  Общий: <strong style={{color:"var(--accentA)"}}>{resonance.total}%</strong>
                </div>
              </div>
            </div>

            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8}}>Статус системы</div>
              <div style={{color:"var(--muted)"}}>Сообщения: <strong style={{color:"var(--accentB)"}}>{messages.length}</strong></div>
              <div style={{marginTop:8, fontSize:13, color:"rgba(200,230,255,0.9)"}}>Адепт: Полная мощность </div>
              <div style={{fontSize:13, color:"rgba(200,230,255,0.9)"}}>Turbo ZX: Активен </div>
              <div style={{fontSize:13, color:"rgba(200,230,255,0.9)"}}>Framer Motion: Включено </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
