import React from 'react';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isUser, timestamp }) => {
  return (
    <div className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}>
      <div className="message-content">
        {text}
      </div>
      <div className="message-time">
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default MessageBubble;
