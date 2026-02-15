import { createContext, useContext, useEffect, useState } from "react";
import type { Project } from "../types/project";
import { getFromStorage, saveToStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";
import { v4 as uuid } from "uuid";

interface ProjectContextType {
  projects: Project[];
  addProject: (title: string, description: string) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    return getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS) || [];
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  const addProject = (title: string, description: string) => {
    const newProject: Project = {
      id: uuid(),
      title,
      description,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjects must be used inside ProjectProvider");
  return context;
};
