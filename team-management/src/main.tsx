import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { ProjectProvider } from "./context/projectContext";
import { TaskProvider } from "./context/taskContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ProjectProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ProjectProvider>
  </AuthProvider>,
);
