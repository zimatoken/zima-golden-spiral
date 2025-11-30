import React from "react";
import './styles.css';

export const BottomActions: React.FC = () => {
  return (
    <div className="bottom-actions">
      <div className="actions-grid">
        <button className="action-btn">
          <span className="action-icon"></span>
          <span className="action-text">Новый чат</span>
        </button>
        <button className="action-btn">
          <span className="action-icon"></span>
          <span className="action-text">Избранное</span>
        </button>
        <button className="action-btn">
          <span className="action-icon"></span>
          <span className="action-text">Настройки</span>
        </button>
        <button className="action-btn">
          <span className="action-icon"></span>
          <span className="action-text">Аналитика</span>
        </button>
      </div>
    </div>
  );
};
