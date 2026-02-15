import { getFromStorage, saveToStorage } from "./storage";
import { STORAGE_KEYS } from "./constants";
import { v4 as uuid } from "uuid";
import type { User } from "../types/user";

export const getUsers = (): User[] => {
  return getFromStorage<User[]>(STORAGE_KEYS.USERS) || [];
};

export const addUser = (user: Omit<User, "id">) => {
  const users = getUsers();

  const newUser: User = {
    ...user,
    id: uuid(),
  };

  saveToStorage(STORAGE_KEYS.USERS, [...users, newUser]);

  return newUser;
};

export const findUserByEmail = (email: string) => {
  return getUsers().find((user) => user.email === email);
};
