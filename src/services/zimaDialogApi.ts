import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/v0';

export const zimaDialogApi = {
  // Аутентификация
  async sendVerificationCode(phone: string) {
    return axios.post(`${API_BASE_URL}/auth/send-code`, { phone });
  },

  async verifyCode(phone: string, code: string) {
    return axios.post(`${API_BASE_URL}/auth/verify-code`, { phone, code });
  },

  // Чат
  async createChat() {
    return axios.post(`${API_BASE_URL}/chats`);
  },

  async getMessages(chatId: string) {
    return axios.get(`${API_BASE_URL}/chats/${chatId}/messages`);
  },

  async sendMessage(chatId: string, text: string) {
    return axios.post(`${API_BASE_URL}/chats/${chatId}/messages`, { text });
  },

  // WebSocket подключение
  getWebSocketUrl(chatId: string, token: string) {
    return `ws://localhost:3000/ws?chatId=${chatId}&token=${token}`;
  }
};
