import React from "react";
import { ZimaDialog } from "./zima-dialog";

export const ZimaDialogTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#071028', borderRadius: '12px', margin: '20px' }}>
      <h3 style={{ color: '#88D7FF', marginBottom: '20px' }}>ZIMA-Dialog AI (Тест)</h3>
      <ZimaDialog />
    </div>
  );
};
