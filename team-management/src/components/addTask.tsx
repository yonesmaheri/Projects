import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CustomInput from "./customInput";
import type { Priority } from "@/types/task";
import { useTasks } from "@/context/taskContext";
import { getUsers } from "@/utils/userService";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";

function AddTask() {
  const { id } = useParams();

  const { addTask } = useTasks();

  const users = getUsers();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !assignedTo || !id) return;

    addTask({
      projectId: id,
      title,
      description,
      priority,
      status: "todo",
      dueDate,
      assignedTo,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setAssignedTo("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="py-5 px-10 rounded-2xl">
          Add new Task
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-3 border border-subtle rounded-3xl bg-sidebar">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleAddTask} className="space-y-4">
          <h2 className="font-semibold">Add Task</h2>

          <CustomInput
            className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6  focus-visible:border-ring transition-all"
            placeholder="Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="outline-none focus-visible:border-ring focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
            rows={6}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="outline-none focus-visible:border-ring focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            className="outline-none focus-visible:border-ring focus-visible:ring-[3px] transition-all border p-3 w-full border-subtle rounded-2xl"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            className="outline-none focus-visible:border-ring focus-visible:ring-[3px] rounded-2xl w-full bg-[#1E1E1E] font-light border-subtle border py-3 px-2 focus-visible:ring-[#1E1E1E] transition-all"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <button className="text-black px-10 py-3 rounded-2xl bg-white hover:bg-white/90 border border-subtle transition">
            Add Task
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
