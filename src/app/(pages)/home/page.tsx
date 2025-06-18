"use client";

import { useEffect, useState } from "react";
import { useToast } from "../../components/ToastProvider";
import TaskCard from "../../components/TaskCard";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const toast = useToast();

  const fetchTasks = async () => {
    const res = await fetch(`${URL}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
    await fetch(`${URL}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
    toast("Task deleted successfully");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Task List</h1>
        <Link
          href="/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </Link>
      </div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 border p-2 rounded dark:bg-gray-800 dark:text-white"
      >
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}
