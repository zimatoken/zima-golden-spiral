import React from "react";
import { ZimaDialog } from "../components/zima-dialog";

const ZimaDialogPage: React.FC = () => {
  return (
    <div style={{ 
      height: '100vh', 
      background: '#071028',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{
        padding: '20px',
        background: '#08172b',
        borderBottom: '1px solid #1E293B'
      }}>
        <h1 style={{ 
          margin: 0, 
          color: '#88D7FF',
          fontSize: '24px'
        }}>
          ZIMA-Dialog AI
        </h1>
        <p style={{
          margin: '5px 0 0 0',
          color: '#94A3B8',
          fontSize: '14px'
        }}>
          Интеллектуальный ассистент для анализа талантов
        </p>
      </header>
      
      <div style={{ flex: 1 }}>
        <ZimaDialog />
      </div>
    </div>
  );
};

export default ZimaDialogPage;
