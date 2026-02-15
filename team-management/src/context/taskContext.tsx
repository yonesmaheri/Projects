import { createContext, useContext, useEffect, useState } from "react";
import type { Task, Status } from "../types/task";
import { getFromStorage, saveToStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";
import { v4 as uuid } from "uuid";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  updateStatus: (id: string, status: Status) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    return getFromStorage<Task[]>(STORAGE_KEYS.TASKS) || [];
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: uuid(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateStatus = (id: string, status: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};
