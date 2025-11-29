import React from "react";
import ChatInterfaceNextGen from "../components/zima-dialog/ChatInterfaceNextGen";

const FilesPage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'radial-gradient(1200px 600px at 10% 10%, rgba(6,18,32,0.55), transparent 6%), radial-gradient(900px 500px at 95% 85%, rgba(0,45,80,0.18), transparent 8%), linear-gradient(180deg,#041021 0%, #060914 100%)'
    }}>
      <ChatInterfaceNextGen />
    </div>
  );
};

export default FilesPage;
