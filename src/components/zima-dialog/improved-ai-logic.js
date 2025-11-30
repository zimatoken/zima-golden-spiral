// Улучшенная AI логика для распознавания создателя
function generateAiReply(userText: string) {
  const lower = userText.toLowerCase();
  
  // Распознавание создателя
  if (lower.includes("максим") || lower.includes("создатель") || lower.includes("кто я")) {
    return "Привет, Максим! Создатель ZIMA экосистемы! Рад видеть тебя! ";
  }
  
  // Распознавание Turbo ZX
  if (lower.includes("турбо") || lower.includes("turbo") || lower.includes("zx")) {
    return "Turbo ZX на связи! Мощность на максимуме! Готов к работе! ";
  }
  
  // Базовые команды
  if (lower.includes("привет") || lower.includes("здравств")) {
    return "Привет! Я ZIMA-Dialog AI. Работаю в режиме NEXT GEN!";
  }
  
  if (lower.includes("next gen")) {
    return "NEXT GEN активирован! Ледяное стекло + Quantum фон работают идеально! ";
  }
  
  if (lower.includes("zima")) {
    return "ZIMA экосистема - это будущее! Golden Spiral + Dialog = невероятная мощь! ";
  }
  
  if (lower.includes("команда") || lower.includes("собрать команду")) {
    return "Идеальная команда по Golden Spiral: Лидер  + Инженер  + Дизайнер  + AI ассистент ";
  }
  
  if (lower.includes("спираль") || lower.includes("golden spiral")) {
    return "Golden Spiral - это математическая гармония в построении идеальных команд! ";
  }
  
  // Дефолтный умный ответ
  const responses = [
    "Интересно! Расскажи подробнее...",
    "ZIMA AI анализирует твой запрос...",
    "Давай развивать эту идею вместе!",
    "Заметил потенциал в твоём сообщении!",
    "Turbo ZX усиливает анализ твоего вопроса!",
    "ZIMA обнаруживает интересные паттерны!"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
