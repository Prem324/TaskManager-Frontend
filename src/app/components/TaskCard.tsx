"use client";

import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${task.id}`);
  };

  return (
    <div className="border p-4 rounded shadow-sm bg-white flex justify-between items-start dark:bg-gray-800 dark:text-white">
      <div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-green-500 capitalize">
          Status: {task.status.replace("_", " ")}
        </p>
        {task.dueDate && (
          <p className="text-sm text-gray-500">
            Duedate:{" "}
            {task.dueDate
              ? format(new Date(task.dueDate), "dd MMM yyyy p")
              : "N/A"}
          </p>
        )}
        {/* <p className="text-sm text-gray-500">
          Created:{" "}
          {task.createdAt
            ? format(new Date(task.createdAt), "dd MMM yyyy p")
            : "N/A"}
        </p>{" "}
        <p className="text-sm text-gray-500">
          Updated:{" "}
          {task.updatedAt
            ? format(new Date(task.updatedAt), "dd MMM yyyy p")
            : "N/A"}
        </p> */}
      </div>
      <div className="flex flex-col gap-6 items-center justify-between">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
