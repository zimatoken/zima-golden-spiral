// ZIMA AI Service with Project Knowledge
export class ZimaAIService {
  getAIResponse(message: string): Promise<{text: string, resonance?: number}> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = message.toLowerCase();
        
        // Базовые команды
        if (lower.includes("максим")) {
          resolve({ 
            text: "Привет, Максим! ZIMA-Dialog работает с файлами проекта. Хочешь узнать о конкретном файле?",
            resonance: 95
          });
        }
        else if (lower.includes("турбо")) {
          resolve({ 
            text: "Turbo ZX анализирует файлы ZIMA! Готов к интеграции! ",
            resonance: 98
          });
        }
        
        // Команды связанные с файлами проекта
        else if (lower.includes("файл") || lower.includes("документ") || lower.includes("pdf")) {
          resolve({ 
            text: " Проект ZIMA.pdf (2.3 MB) - основная документация проекта. Содержит ТЗ, архитектуру, roadmap.",
            resonance: 90
          });
        }
        else if (lower.includes("дизайн") || lower.includes("figma") || lower.includes("fig")) {
          resolve({ 
            text: " Дизайн система.fig (1.8 MB) - полная дизайн-система ZIMA в Figma. Цвета, компоненты, UI-kit.",
            resonance: 92
          });
        }
        else if (lower.includes("презентация") || lower.includes("ppt") || lower.includes("pptx")) {
          resolve({ 
            text: " Презентация.pptx (4.1 MB) - презентация проекта для инвесторов и команды.",
            resonance: 88
          });
        }
        else if (lower.includes("архитектура") || lower.includes("схема") || lower.includes("png")) {
          resolve({ 
            text: " Архитектура.png (3.2 MB) - архитектурная схема системы ZIMA.",
            resonance: 85
          });
        }
        else if (lower.includes("zima") || lower.includes("зима") || lower.includes("проект")) {
          resolve({ 
            text: " ZIMA Project - экосистема для построения идеальных команд. Включает: Golden Spiral, Dialog AI, Talent Resonance.",
            resonance: 96
          });
        }
        else if (lower.includes("команда") || lower.includes("собрать команду")) {
          resolve({ 
            text: " ZIMA помогает собрать идеальную команду по Golden Spiral: Инженер, Лидер, Дизайнер + AI ассистент.",
            resonance: 94
          });
        }
        else {
          const responses = [
            "ZIMA AI анализирует файлы проекта... Могу рассказать о документации, дизайне или архитектуре!",
            "Интересно! В проекте ZIMA есть документация, дизайн-система и презентации - спроси о них!",
            "AI обрабатывает запрос с учетом знаний о проекте ZIMA!",
            "ZIMA обнаруживает потенциал в вашем сообщении! Проверь файлы проекта для большей информации."
          ];
          resolve({ 
            text: responses[Math.floor(Math.random() * responses.length)],
            resonance: Math.floor(Math.random() * 25) + 75
          });
        }
      }, 800);
    });
  }
}

export const zimaAIService = new ZimaAIService();
