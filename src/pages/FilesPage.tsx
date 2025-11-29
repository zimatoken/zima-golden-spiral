import React from "react";
import ZimaDialogTab from "../components/ZimaDialogTab";

const FilesPage: React.FC = () => {
  return (
    <div className="files-page">
      <header className="files-page__header">
        <h1>ZIMA-Dialog AI Platform</h1>
      </header>

      <main className="files-page__content">
        <ZimaDialogTab />
      </main>
    </div>
  );
};

export default FilesPage;
