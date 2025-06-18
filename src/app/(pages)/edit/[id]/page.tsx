"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TaskForm from "../../../components/TaskForm";
import type { Task } from "../../../types/task";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { format } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTask({
          ...data,
          dueDate: data.dueDate ? data.dueDate.split("T")[0] : "",
        });
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Task not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (updatedTask: {
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    dueDate?: string;
  }) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (res.ok) {
      router.push("/home");
    } else {
      setError("Failed to update task");
    }
  };

  if (!id) return <p className="p-6">Missing task ID.</p>;
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="m-4">
      <Breadcrumbs />

      <div className="max-w-xl mx-10 sm:mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Edit Task</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {task && (
          <>
            <TaskForm
              initialData={task}
              submitLabel="Update Task"
              onSubmit={(task) =>
                handleUpdate({
                  ...task,
                  description: task.description || "",
                })
              }
            />
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>
                <strong>Created:</strong>{" "}
                {task.createdAt
                  ? format(new Date(task.createdAt), "dd MMM yyyy, p")
                  : "N/A"}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {task.updatedAt
                  ? format(new Date(task.updatedAt), "dd MMM yyyy, p")
                  : "N/A"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
