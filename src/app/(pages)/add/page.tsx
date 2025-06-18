"use client";

import { useRouter } from "next/navigation";
import TaskForm from "../../components/TaskForm";
import { Task } from "../../types/task";
import Breadcrumbs from "../../components/Breadcrumbs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function AddTaskPage() {
  const router = useRouter();

  const handleAdd = async (task: Omit<Task, "id">) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      router.push("/home");
    } else {
      console.error("Failed to create task");
    }
  };

  return (
    <div className="p-4">
      <Breadcrumbs />
      <div className="max-w-xl mx-10 sm:mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Add Task</h1>
        <TaskForm submitLabel="Add Task" onSubmit={handleAdd} />
      </div>
    </div>
  );
}
