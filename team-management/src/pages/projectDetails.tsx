import { useParams } from "react-router-dom";
import { useTasks } from "../context/taskContext";
import { useProjects } from "../context/projectContext";
import { useState } from "react";
import { getUsers } from "../utils/userService";
import type { Priority } from "../types/task";

export default function ProjectDetails() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const { projects } = useProjects();

  const { addTask, deleteTask, updateStatus } = useTasks();

  const users = getUsers();

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
  };

  const project = projects.find((p) => p.id === id);

  const projectTasks = tasks.filter((t) => t.projectId === id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
      <form onSubmit={handleAddTask} className="border p-4 rounded space-y-2">
        <h2 className="font-semibold">Add Task</h2>

        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          className="border p-2 w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          className="border p-2 w-full"
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

        <button className="bg-black text-white px-4 py-2">Add Task</button>
      </form>

      <div className="space-y-2">
        {projectTasks.map((task) => {
          const assignedUser = users.find((u) => u.id === task.assignedTo);

          return (
            <div key={task.id} className="border p-3 rounded space-y-2">
              <h3 className="font-medium">{task.title}</h3>
              <p>{task.description}</p>

              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Due: {task.dueDate}</p>
              <p>Assigned to: {assignedUser?.name}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(task.id, "todo")}
                  className="text-sm"
                >
                  To Do
                </button>

                <button
                  onClick={() => updateStatus(task.id, "in-progress")}
                  className="text-sm"
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(task.id, "done")}
                  className="text-sm"
                >
                  Done
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
