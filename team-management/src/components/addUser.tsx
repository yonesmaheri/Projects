import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Role, User } from "@/types/user";
import { addUser } from "@/utils/userService";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomInput from "./customInput";

function AddUser({ users, setUsers }: { users: User[]; setUsers: any }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("member");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = addUser({
      name,
      email,
      password,
      role,
    });

    setUsers([...users, newUser]);
    toast.success("User added successfully.");
    setName("");
    setEmail("");
    setPassword("");
    setRole("member");
    setOpen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-black px-10 py-2 rounded-2xl bg-white hover:bg-white/90 border border-subtle transition">
          Add new member
        </button>
      </DialogTrigger>
      <DialogContent className="space-y-3 border border-subtle rounded-3xl bg-sidebar">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleAddUser} className="space-y-4">
          <h2 className="font-semibold">Add Member</h2>

          <CustomInput
            className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <CustomInput
            className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomInput
            className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>

          <button className="text-black px-10 py-3 rounded-2xl bg-white hover:bg-white/90 border border-subtle transition">
            Add
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUser;
