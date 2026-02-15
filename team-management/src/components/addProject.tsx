import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Project } from "@/types/project";
import CustomInput from "./customInput";

function AddProject({
  projects,
  addProject,
}: {
  projects: Project[];
  addProject: any;
}) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addProject(title, description);
    toast.success("Project added successfully.");
    setTitle("");
    setDescription("");
    setOpen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-black px-10 py-2 rounded-2xl bg-white hover:bg-white/90 border border-subtle transition">
          Add new Project
        </button>
      </DialogTrigger>
      <DialogContent className="space-y-3 border border-subtle rounded-3xl bg-sidebar">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-semibold">Add Project</h2>

          <CustomInput
            className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <CustomInput
            className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="text-black px-10 py-3 rounded-2xl bg-white hover:bg-white/90 border border-subtle transition">
            Add Project
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProject;
