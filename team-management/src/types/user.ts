export type Role = "manager" | "member";

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  password: string;
}
