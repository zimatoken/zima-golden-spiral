// API сервис для взаимодействия с бэкендом
const API_BASE = 'http://localhost:3000/v0';

export const apiService = {
  // Получение списка чатов
  async getChats(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/chats`);
      if (!response.ok) throw new Error('API error');
      return await response.json();
    } catch (error) {
      console.error('Ошибка загрузки чатов:', error);
      return [];
    }
  },

  // Отправка сообщения
  async sendMessage(chatId: number, text: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/messages/${chatId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      return response.ok;
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      return false;
    }
  },

  // Получение сообщений чата
  async getMessages(chatId: number): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/messages/${chatId}`);
      if (!response.ok) throw new Error('API error');
      return await response.json();
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error);
      return [];
    }
  },

  // AI запрос
  async sendAIRequest(text: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE}/ai/enqueue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          context: "ZIMA-Dialog AI  Адепт режим"
        })
      });
      
      if (!response.ok) throw new Error('AI API error');
      const data = await response.json();
      return data.reply || "Не удалось получить ответ от AI";
    } catch (error) {
      console.error('Ошибка AI запроса:', error);
      return "Ошибка соединения с AI сервисом";
    }
  }
};
