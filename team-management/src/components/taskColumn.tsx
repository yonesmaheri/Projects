import type { Task, Status } from "../types/task";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./taskCard";

const Column = ({
  title,
  tasks,
  status,
  onUpdateStatus,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  status: Status;
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div ref={setNodeRef} className="bg-sidebar p-4 rounded w-full">
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            task={task}
            key={task.id}
            onDelete={onDelete}
            onUpdateStatus={onUpdateStatus}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};
export default Column;
