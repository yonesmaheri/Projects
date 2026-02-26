import { useParams } from "react-router-dom";
import { useTasks } from "../context/taskContext";
import { useProjects } from "../context/projectContext";
import { DndContext } from "@dnd-kit/core";
import AddTask from "@/components/addTask";
import { useState, useEffect } from "react";
import Column from "@/components/taskColumn";
import toast from "react-hot-toast";
import FilterDialog from "@/components/filters";
import { DragOverlay } from "@dnd-kit/core";

export default function ProjectDetails() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const { projects } = useProjects();
  const [activeTask, setActiveTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { deleteTask, updateStatus } = useTasks();

  const project = projects.find((p) => p.id === id);

  const projectTasks = tasks.filter((t) => t.projectId === id);

  const filteredTasks = projectTasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = !filterStatus || task.status === filterStatus;

    const matchesPriority = !filterPriority || task.priority === filterPriority;

    const matchesUser = !filterUser || task.assignedTo === filterUser;

    const matchesFromDate =
      !fromDate || new Date(task.dueDate) >= new Date(fromDate);

    const matchesToDate = !toDate || new Date(task.dueDate) <= new Date(toDate);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesUser &&
      matchesFromDate &&
      matchesToDate
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const todoTasks = sortedTasks.filter((t) => t.status === "todo");
  const inProgressTasks = sortedTasks.filter((t) => t.status === "in-progress");
  const doneTasks = sortedTasks.filter((t) => t.status === "done");

  const upcomingTasks = projectTasks.filter((task) => {
    if (task.status === "done") return false;
    if (!task.dueDate) return false;

    const due = new Date(task.dueDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff = due.getTime() - today.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    return diff >= 0 && diff <= oneDay;
  });
  useEffect(() => {
    if (upcomingTasks.length > 0) {
      toast.error(
        `You have ${upcomingTasks.length} task(s) with deadline in next 24 hours`,
      );
    }
  }, []);

  
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    updateStatus(taskId, newStatus);
  };

  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <div className="flex items-center gap-2">
          <FilterDialog
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterUser={filterUser}
            setFilterUser={setFilterUser}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
          <AddTask />
        </div>
      </div>
      <p>{project.description}</p>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Column
            title="To Do"
            tasks={todoTasks}
            status="todo"
            onUpdateStatus={updateStatus}
            onDelete={deleteTask}
          />

          <Column
            title="In Progress"
            tasks={inProgressTasks}
            status="in-progress"
            onUpdateStatus={updateStatus}
            onDelete={deleteTask}
          />

          <Column
            title="Done"
            tasks={doneTasks}
            status="done"
            onUpdateStatus={updateStatus}
            onDelete={deleteTask}
          />
        </div>
      </DndContext>
    </div>
  );
}
