import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="typing-text">AI печатает...</div>
    </div>
  );
};

export default TypingIndicator;
