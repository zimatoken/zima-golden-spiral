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

// TURBO AI Integration
const callAI = async (text: string): Promise<string> => {
  // TURBO скорость: 300-700ms вместо 800+
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
  
  const lowerText = text.toLowerCase();
  
  // TURBO улучшенные ответы
  const turboResponses: { [key: string]: string } = {
    'максим': 'Привет, Максим!  Создатель ZIMA экосистемы! TURBO ZX работает на полной мощности! ',
    'турбо': ' TURBO ZX АКТИВИРОВАН! Скорость 10! Производительность 100%! Мощность на максимуме!',
    'спираль': ' Golden Spiral  это математическая гармония идеальных команд!  Таланты  Доверие  Альтруизм = Экспоненциальный рост!',
    'zima': 'ZIMA экосистема  будущее УЖЕ здесь!  Golden Spiral + AI Dialog + Talent Resonance = АБСОЛЮТНАЯ СИЛА!',
    'команда': ' Идеальная команда по Golden Spiral: Лидер (Vector) + Инженер (Structurator) + Дизайнер (Modeller) + AI Ассистент (Adept) = УСПЕХ 100%!',
    'next': ' NEXT GEN АКТИВИРОВАН! Ледяное стекло + Quantum фон = ПРЕМИУМ опыт! Интерфейс следующего поколения!',
    'резонанс': ' Resonance анализ в реальном времени! Талант  Структура  Креатив  Лидерство = ПОЛНЫЙ ПОТЕНЦИАЛ!',
    'привет': 'Привет!  Я ZIMA-TURBO-AI! Готов к работе на скорости света! '
  };

  for (const [key, response] of Object.entries(turboResponses)) {
    if (lowerText.includes(key)) {
      return response;
    }
  }

  // TURBO умные дефолтные ответы
  const defaultResponses = [
    ' Интересно! TURBO AI анализирует... Давай больше контекста для супер-ответа!',
    ' ZIMA AI обнаружил потенциал! Расскажи подробнее для точного плана!',
    ' TURBO режим усилил анализ! Нужны детали для максимальной эффективности!',
    ' Заметил крутые паттерны! Продолжаем на полной мощности?',
    ' Отлично! TURBO AI готов к действию  давай конкретные шаги!'
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// TURBO Resonance Analysis
const analyzeResonance = (text: string): ResonanceScore => {
  const lowerText = text.toLowerCase();
  
  // Расширенный словарь для TURBO анализа
  const talentWords = ['талант', 'способност', 'золот', 'спирал', 'golden', 'spiral', 'potential', 'потенциал', 'гений', 'одарен'];
  const structureWords = ['структур', 'инженер', 'систем', 'организац', 'план', 'architect', 'алгоритм', 'код', 'технолог'];
  const creativeWords = ['креатив', 'дизайн', 'идея', 'творч', 'модел', 'design', 'creative', 'искусство', 'вдохновен'];
  const leadershipWords = ['лидер', 'команд', 'управлен', 'вектор', 'стратег', 'lead', 'team', 'руководств', 'менеджмент'];
  
  const countMatches = (words: string[]) => {
    return words.reduce((count, word) => {
      const regex = new RegExp(word, 'gi');
      const matches = lowerText.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
  };

  const talentScore = Math.min(countMatches(talentWords) * 15, 100);
  const structureScore = Math.min(countMatches(structureWords) * 15, 100);
  const creativeScore = Math.min(countMatches(creativeWords) * 15, 100);
  const leadershipScore = Math.min(countMatches(leadershipWords) * 15, 100);
  
  const total = Math.min((talentScore + structureScore + creativeScore + leadershipScore) / 4, 100);
  
  return {
    talent: Math.round(talentScore),
    structure: Math.round(structureScore),
    creative: Math.round(creativeScore),
    leadership: Math.round(leadershipScore),
    total: Math.round(total)
  };
};

export default function ChatInterfaceFinal() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: uid(), text: " Привет! Я ZIMA-TURBO-AI! Режим максимальной мощности активирован! ", from: "ai", ts: now() }
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [resonance, setResonance] = useState<ResonanceScore>({
    talent: 45,
    structure: 65,
    creative: 55, 
    leadership: 35,
    total: 50
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
    
    // TURBO Resonance анализ
    const userResonance = analyzeResonance(t);
    setResonance(userResonance);
    
    setText("");
    setTyping(true);

    try {
      const reply = await callAI(t);
      const aiMsg: Msg = { id: uid(), text: reply, from: "ai", ts: now() };
      setMessages(prev => [...prev, aiMsg]);
      
      // Авто-обновление Resonance после AI ответа
      setTimeout(() => {
        const updatedResonance = {
          talent: Math.min(resonance.talent + 5, 100),
          structure: Math.min(resonance.structure + 3, 100),
          creative: Math.min(resonance.creative + 7, 100),
          leadership: Math.min(resonance.leadership + 2, 100),
          total: Math.min(resonance.total + 4, 100)
        };
        setResonance(updatedResonance);
      }, 1000);
    } catch (error) {
      const errorMsg: Msg = { 
        id: uid(), 
        text: " TURBO Ошибка: Проверь подключение!", 
        from: "ai", 
        ts: now() 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setTyping(false);
    }
  };

  // TURBO quick actions
  const action = (q: string) => {
    setText(q);
    setTimeout(() => send(), 50); // Супер-быстро!
  };

  return (
    <div className="zima-final-root" role="region" aria-label="ZIMA TURBO Dialog">
      <div className="zima-final-card">
        <div className="zima-final-top">
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <div className="title">ZIMA-TURBO-AI</div>
            <div className="chip" style={{background: 'rgba(107,214,255,0.2)', color: '#6bd6ff'}}> TURBO ZX</div>
            <div className="chip">Максимальная мощность</div>
          </div>

          <div className="top-right">
            <div className="chip">Скорость 10</div>
            <div className="chip">AI Умные ответы</div>
            <div className="chip">Real-time</div>
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
                        style={{background: 'radial-gradient(circle at 30% 30%, #e8f7ff, #6bd6ff 60%, #00b8ff 100%)'}}
                      >
                        <div style={{fontSize:12,fontWeight:800,color:"#083a43"}}></div>
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
                    transition={{ duration: 0.2 }}
                  >
                    <div className="avatar avatar-ai" style={{background: 'radial-gradient(circle at 30% 30%, #e8f7ff, #6bd6ff 60%, #00b8ff 100%)'}}>
                      <div style={{fontSize:12,fontWeight:800,color:"#083a43"}}></div>
                    </div>
                    <div className="bubble bubble-ai" style={{ padding:"8px 12px", maxWidth:"36%" }}>
                      <div className="typing-dots" aria-hidden>
                        <div className="dot" /><div className="dot" /><div className="dot" />
                      </div>
                      <div className="meta" style={{ marginTop:8 }}>TURBO анализ...</div>
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
                  placeholder="Введите сообщение в TURBO режиме..." 
                  value={text} 
                  onChange={e=>setText(e.target.value)} 
                  onKeyDown={e=>{ if(e.key==="Enter"){ send(); }}}
                  aria-label="Сообщение"
                />
                <button className="btn-send" onClick={send} aria-label="Отправить" style={{background: 'linear-gradient(45deg, #6bd6ff, #00b8ff)'}}>
                   Отправить
                </button>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8, color: '#6bd6ff'}}> TURBO Действия</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                <button className="action" onClick={()=>action("Привет Максим")} style={{background: 'rgba(107,214,255,0.1)'}}> Тест Максим</button>
                <button className="action" onClick={()=>action("Турбо ZX мощность")} style={{background: 'rgba(107,214,255,0.1)'}}> Turbo ZX</button>
                <button className="action" onClick={()=>action("Расскажи про Golden Spiral")} style={{background: 'rgba(107,214,255,0.1)'}}> Spiral</button>
                <button className="action" onClick={()=>action("Собрать команду")} style={{background: 'rgba(107,214,255,0.1)'}}> Команда</button>
                <button className="action" onClick={()=>action("Расскажи про ZIMA")} style={{background: 'rgba(107,214,255,0.1)'}}> ZIMA</button>
                <button className="action" onClick={()=>action("NEXT GEN")} style={{background: 'rgba(107,214,255,0.1)'}}> NEXT GEN</button>
              </div>
            </div>

            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8, color: '#6bd6ff'}}> TURBO Resonance</div>
              <div style={{color:"var(--muted)", fontSize:13}}>
                <div> Талант: <strong style={{color:"#6bd6ff"}}>{resonance.talent}%</strong></div>
                <div> Структура: <strong style={{color:"#6bd6ff"}}>{resonance.structure}%</strong></div>
                <div> Креатив: <strong style={{color:"#6bd6ff"}}>{resonance.creative}%</strong></div>
                <div> Лидерство: <strong style={{color:"#6bd6ff"}}>{resonance.leadership}%</strong></div>
                <div style={{marginTop:6, paddingTop:6, borderTop:"1px solid var(--glass-border)"}}>
                   Общий: <strong style={{color:"#6bd6ff"}}>{resonance.total}%</strong>
                </div>
              </div>
            </div>

            <div className="panel">
              <div style={{fontWeight:800, marginBottom:8, color: '#6bd6ff'}}> Статус системы</div>
              <div style={{color:"var(--muted)"}}> Сообщения: <strong style={{color:"#6bd6ff"}}>{messages.length}</strong></div>
              <div style={{marginTop:8, fontSize:13, color:"#6bd6ff"}}> TURBO ZX: Активен </div>
              <div style={{fontSize:13, color:"#6bd6ff"}}> AI: Максимальная мощность </div>
              <div style={{fontSize:13, color:"#6bd6ff"}}> Анимации: TURBO скорость </div>
              <div style={{fontSize:13, color:"#6bd6ff"}}> Resonance: Real-time </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
