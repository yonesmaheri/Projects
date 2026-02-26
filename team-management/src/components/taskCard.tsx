import type { Status, Task } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

function TaskCard({
  task,
  status,
  onUpdateStatus,
  onDelete,
}: {
  task: Task;
  status: Status;
  onUpdateStatus: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px,${transform.y}px)`
          : undefined,
      }}
      key={task.id}
      className={`bg-elevated p-3 border rounded shadow text-sm space-y-2 ${
        isOverdue ? " border-red-500" : " border-subtle"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <p className="font-medium">{task.title}</p>
        <div {...listeners} {...attributes} className="cursor-grab w-fit">
          <GripVertical size={16} />
        </div>
      </div>

      <p className="text-gray-500 text-xs">Priority: {task.priority}</p>

      <p className="text-gray-500 text-xs">Due: {task.dueDate || "-"}</p>

      <div className="flex gap-2 flex-wrap">
        {status !== "todo" && (
          <button
            onClick={() => onUpdateStatus(task.id, "todo")}
            className="text-xs text-blue-500"
          >
            To Do
          </button>
        )}

        {status !== "in-progress" && (
          <button
            onClick={() => onUpdateStatus(task.id, "in-progress")}
            className="text-xs text-yellow-600"
          >
            In Progress
          </button>
        )}

        {status !== "done" && (
          <button
            onClick={() => onUpdateStatus(task.id, "done")}
            className="text-xs text-green-600"
          >
            Done
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
