import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={{
            ...task,
            createdAt: task.createdAt || "",
            updatedAt: task.updatedAt || "",
          }}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
