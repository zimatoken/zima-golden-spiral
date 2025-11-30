import React, { useState } from "react";
import { FileCard } from "../components/ui/FileCard";
import ZimaTeamBuilder from "../components/ZimaTeamBuilder";
import ZimaDialogTab from "../components/ZimaDialogTab";
import type { FileItem, FileType } from "../types/files";

const mockFiles: FileItem[] = [
  { 
    id: "1", 
    title: "Проект ZIMA.pdf", 
    size: "2.3", 
    type: "pdf",
    lastModified: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Дизайн система.fig",
    size: "1.8",
    type: "figma",
    lastModified: "2024-01-14T15:45:00Z"
  },
  { 
    id: "3", 
    title: "Презентация.pptx", 
    size: "4.1", 
    type: "document",
    lastModified: "2024-01-16T09:20:00Z"
  },
  { 
    id: "4", 
    title: "Архитектура.png", 
    size: "3.2", 
    type: "image",
    lastModified: "2024-01-13T14:10:00Z"
  },
];

const FilesPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState<"files" | "team" | "dialog">("files");
  const [filter, setFilter] = useState<FileType>("all");

  return (
    <div className="files-page">
      <header className="files-page__header">
        <h1>ZIMA Platform</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "files" ? "tab--active" : ""}`}
            onClick={() => setActiveTab("files")}
          >
            Файлы
          </button>
          <button
            className={`tab ${activeTab === "team" ? "tab--active" : ""}`}
            onClick={() => setActiveTab("team")}
          >
            Команда
          </button>
          <button
            className={`tab ${activeTab === "dialog" ? "tab--active" : ""}`}
            onClick={() => setActiveTab("dialog")}
          >
            ZIMA-Dialog
          </button>
        </div>
      </header>

      <main className="files-page__content">
        {activeTab === "files" && (
          <div className="files-grid">
            {mockFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedFile?.id === file.id}
                onSelect={setSelectedFile}
              />
            ))}
          </div>
        )}
        
        {activeTab === "team" && <ZimaTeamBuilder />}
        {activeTab === "dialog" && <ZimaDialogTab />}
      </main>
    </div>
  );
};

export default FilesPage;
