import React from "react";
import Sidebar from "./Sidebar";
import ChatInterfaceFinal from "./zima-dialog/ChatInterfaceFinal";
import "../styles/layout.css";

export default function ZimaMainLayout() {
  return (
    <div className="zima-main-layout">
      <Sidebar />
      <div className="zima-content-area">
        <ChatInterfaceFinal />
      </div>
    </div>
  );
}
