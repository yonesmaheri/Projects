import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { AuthProvider } from "./context/authContext.tsx";
import { ProjectProvider } from "./context/projectContext";
import { TaskProvider } from "./context/taskContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>,
);
