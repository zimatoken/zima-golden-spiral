import React, { useState, useMemo } from "react";

interface Talent {
  id: string;
  name: string;
  desc: string;
  color: string;
}

const TALENTS: Talent[] = [
  {
    id: "engineer",
    name: "Engineer  Structurator", 
    desc: "Системная архитектура, стабильность, модульность",
    color: "#88D7FF",
  },
  {
    id: "inventor", 
    name: "Inventor  Fractalist",
    desc: "Генерация идей, нестандартные паттерны, эффект прорыва",
    color: "#C7A7FF",
  },
  {
    id: "modeller",
    name: "Realities  Modeller",
    desc: "Визуализация, концепты, прототипы", 
    color: "#9BE7C8",
  },
  {
    id: "leader",
    name: "Leader  Vector",
    desc: "Ведущая энергия, решение, направляющая сила",
    color: "#FFD27A",
  },
];

export const ZimaTeamBuilder: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTalent = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const resonance = useMemo(() => {
    if (!selected.length) return 0;
    
    const base = (selected.length / TALENTS.length) * 70;
    const hasStruct = selected.includes("engineer");
    const hasCreative = selected.includes("inventor") || selected.includes("modeller");
    const hasLeader = selected.includes("leader");
    
    let bonus = 0;
    if (hasStruct && hasCreative) bonus += 15;
    if (hasLeader) bonus += 10;
    if (selected.length === 1) bonus -= 10;
    
    return Math.max(0, Math.round(base + bonus));
  }, [selected]);

  // Динамический цвет в зависимости от резонанса
  const getResonanceColor = () => {
    if (resonance >= 80) return "#00FF00"; // Ярко-зеленый
    if (resonance >= 60) return "#FFFF00"; // Ярко-желтый
    if (resonance >= 40) return "#FFA500"; // Ярко-оранжевый
    return "#FF0000"; // Ярко-красный
  };

  // Позиции для узлов спирали
  const getPosition = (index: number, total: number, radius = 80) => {
    const angle = (index / total) * 2 * Math.PI;
    return { 
      x: 100 + radius * Math.cos(angle), 
      y: 100 + radius * Math.sin(angle) 
    };
  };

  const nodes = selected.map((id, i) => ({ 
    id, 
    ...getPosition(i, selected.length),
    color: TALENTS.find(t => t.id === id)?.color || "#FFFFFF"
  }));

  return (
    <div className="zima-team-builder">
      <h2>ZIMA  Golden Spiral Team Builder</h2>
      
      <div className="team-builder-content">
        {/* НАСТОЯЩАЯ SVG-СПИРАЛЬ */}
        <div className="spiral-container">
          <div className="spiral-svg-container">
            <svg viewBox="0 0 200 200" className="spiral-svg">
              {/* Фон */}
              <circle cx="100" cy="100" r="95" fill="#08172b" stroke="#1E293B" strokeWidth="2"/>
              
              {/* Золотая спираль (упрощенная) */}
              <path 
                d="M100,20 Q180,40 180,100 Q160,180 100,180 Q20,160 20,100 Q40,20 100,20" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="1.5"
                strokeDasharray="5,3"
                opacity="0.6"
              />
              
              {/* Связи между выбранными талантами */}
              {nodes.map((node, i) => 
                nodes.slice(i + 1).map((otherNode, j) => (
                  <line 
                    key={`${i}-${j + i + 1}`}
                    x1={node.x} y1={node.y}
                    x2={otherNode.x} y2={otherNode.y}
                    stroke={node.color}
                    strokeWidth="3"
                    opacity="0.7"
                  />
                ))
              )}
              
              {/* Узлы (выбранные таланты) */}
              {nodes.map((node, i) => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill={node.color}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="#FFFFFF"
                    opacity="0.8"
                  />
                </g>
              ))}
              
              {/* Центральный узел */}
              <circle cx="100" cy="100" r="8" fill="#FFD700" opacity="0.8"/>
            </svg>
          </div>
          
          <div className="resonance-score">
            <div 
              className="score-value"
              style={{ color: getResonanceColor() }}
            >
              {resonance}%
            </div>
            <div className="score-label">Team Resonance</div>
            <div className="team-size">{selected.length}/4 talents selected</div>
          </div>
        </div>

        {/* Выбор талантов */}
        <div className="talents-selection">
          <h3>Select Talents</h3>
          <div className="talents-grid">
            {TALENTS.map(talent => {
              const isSelected = selected.includes(talent.id);
              return (
                <div
                  key={talent.id}
                  className={`talent-card ${isSelected ? "talent-card--selected" : ""}`}
                  onClick={() => toggleTalent(talent.id)}
                  style={{
                    borderColor: isSelected ? talent.color : "#374151",
                    boxShadow: isSelected ? `0 0 15px ${talent.color}` : "none"
                  }}
                >
                  <div className="talent-color" style={{ backgroundColor: talent.color }}></div>
                  <div className="talent-info">
                    <div className="talent-name" style={{ color: talent.color }}>
                      {talent.name}
                    </div>
                    <div className="talent-desc">{talent.desc}</div>
                  </div>
                  {isSelected && (
                    <div 
                      className="talent-check"
                      style={{ backgroundColor: talent.color }}
                    >
                      
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZimaTeamBuilder;
