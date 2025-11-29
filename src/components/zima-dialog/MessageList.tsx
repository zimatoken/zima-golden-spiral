import React from 'react';
import MessageBubble from './MessageBubble';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          text={message.text}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

export default MessageList;
