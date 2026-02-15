import { useState } from "react";
import { getUsers } from "../utils/userService";
import { useAuth } from "../context/authContext";
import { saveToStorage } from "../utils/storage";
import { STORAGE_KEYS } from "../utils/constants";
import toast from "react-hot-toast";
import AddUser from "@/components/addUser";

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState(getUsers());
  const handleDelete = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    toast.success("User deleted successfully.");
    setUsers(updated);
    saveToStorage(STORAGE_KEYS.USERS, updated);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Members</h1>
        {user?.role === "manager" && (
          <AddUser users={users} setUsers={setUsers} />
        )}
      </div>

      <div className="w-full grid grid-cols-4 gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="border w-full border-subtle p-4 rounded-3xl flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-sm">{u.role}</p>
            </div>

            {user?.role === "manager" && user.id !== u.id && (
              <button
                onClick={() => handleDelete(u.id)}
                className="text-red-500"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
