import React from "react";
import './styles.css';

export const TopFeatures: React.FC = () => {
  return (
    <div className="top-features">
      <div className="features-grid">
        <div className="feature-item">
          <span className="feature-icon"></span>
          <span className="feature-text">Быстрый AI</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon"></span>
          <span className="feature-text">Умные ответы</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon"></span>
          <span className="feature-text">Безопасно</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon"></span>
          <span className="feature-text">Для телефона</span>
        </div>
      </div>
    </div>
  );
};
