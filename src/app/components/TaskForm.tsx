"use client";

import { useState } from "react";
import { Task, TaskStatus } from "../types/task"; // Adjust the path if needed

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (task: Omit<Task, "id">) => Promise<void>;
  submitLabel: string;
}

export default function TaskForm({
  initialData,
  onSubmit,
  submitLabel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialData?.status || "todo"
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    await onSubmit({
      title,
      description,
      status,
      dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
