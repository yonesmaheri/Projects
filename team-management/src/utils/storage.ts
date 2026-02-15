export const getFromStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

export const saveToStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
