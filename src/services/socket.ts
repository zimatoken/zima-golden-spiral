import { io, Socket } from "socket.io-client";
import type { Message, ChatSummary, Resonance } from "../types/state";

class ZimaSocket {
  socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token?: string) {
    this.socket = io("http://localhost:3000", {
      auth: token ? { token } : undefined,
      reconnectionAttempts: this.maxReconnectAttempts,
      transports: ["websocket", "polling"]
    });

    this.socket.on("connect", () => {
      console.info(" WS connected", this.socket?.id);
      this.reconnectAttempts = 0;
      window.dispatchEvent(new CustomEvent("zima:connection:change", { 
        detail: { status: "ONLINE" } 
      }));
    });

    this.socket.on("disconnect", (reason) => {
      console.warn(" WS disconnected", reason);
      window.dispatchEvent(new CustomEvent("zima:connection:change", { 
        detail: { status: "RECONNECTING" } 
      }));
      this.handleReconnection(token);
    });

    this.socket.on("message:new", (msg: Message) => {
      console.log(" message:new", msg);
      window.dispatchEvent(new CustomEvent("zima:message:new", { detail: msg }));
    });

    this.socket.on("chat:update", (summary: ChatSummary) => {
      console.log(" chat:update", summary);
      window.dispatchEvent(new CustomEvent("zima:chat:update", { detail: summary }));
    });

    this.socket.on("typing:start", ({ chatId, userId }) => {
      console.log(" typing:start", { chatId, userId });
      window.dispatchEvent(new CustomEvent("zima:typing:start", { 
        detail: { chatId, userId } 
      }));
    });

    this.socket.on("typing:stop", ({ chatId, userId }) => {
      console.log(" typing:stop", { chatId, userId });
      window.dispatchEvent(new CustomEvent("zima:typing:stop", { 
        detail: { chatId, userId } 
      }));
    });

    this.socket.on("resonance:update", (data: { chatId: ID; resonance: Resonance }) => {
      console.log(" resonance:update", data);
      window.dispatchEvent(new CustomEvent("zima:resonance:update", { detail: data }));
    });

    this.socket.on("user:presence", (data: { userId: ID; status: "online" | "offline" }) => {
      window.dispatchEvent(new CustomEvent("zima:user:presence", { detail: data }));
    });
  }

  private handleReconnection(token?: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(` Reconnection attempt ${this.reconnectAttempts}`);
        this.connect(token);
      }, 1000 * this.reconnectAttempts);
    } else {
      window.dispatchEvent(new CustomEvent("zima:connection:change", { 
        detail: { status: "OFFLINE" } 
      }));
    }
  }

  sendMessage(chatId: string, text: string, meta?: any) {
    if (!this.socket) throw new Error("Socket not connected");
    const payload = { 
      chatId, 
      text, 
      meta: { 
        ...meta, 
        timestamp: new Date().toISOString(),
        clientId: `client-${Date.now()}`
      } 
    };
    this.socket.emit("message:send", payload);
    return payload;
  }

  joinChat(chatId: string) {
    this.socket?.emit("chat:join", { chatId });
  }

  leaveChat(chatId: string) {
    this.socket?.emit("chat:leave", { chatId });
  }

  startTyping(chatId: string) {
    this.socket?.emit("typing:start", { chatId });
  }

  stopTyping(chatId: string) {
    this.socket?.emit("typing:stop", { chatId });
  }

  markAsRead(chatId: string, messageId: string) {
    this.socket?.emit("message:read", { chatId, messageId });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const zimaSocket = new ZimaSocket();
