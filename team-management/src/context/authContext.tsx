import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { STORAGE_KEYS } from "../utils/constants";
import { getFromStorage, saveToStorage } from "../utils/storage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getFromStorage<User>(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
