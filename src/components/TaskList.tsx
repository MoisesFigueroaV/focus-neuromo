import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Circle } from "lucide-react";
import { Task } from "./PomodoroTimer";

interface TaskListProps {
  tasks: Task[];
  currentTaskId: string | null;
  onAddTask: (title: string) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onSelectTask: (id: string) => void;
}

export const TaskList = ({
  tasks,
  currentTaskId,
  onAddTask,
  onToggleComplete,
  onDeleteTask,
  onSelectTask,
}: TaskListProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-bold text-foreground">Tareas</h3>

      <div className="neuro-inset rounded-2xl p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nueva tarea..."
            className="neuro-pressed border-0 rounded-xl bg-background focus-visible:ring-primary"
          />
          <Button
            onClick={handleAddTask}
            className="neuro-flat hover:neuro-outset active:neuro-pressed rounded-xl transition-all duration-200"
            size="icon"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="neuro-inset rounded-xl p-6 text-center text-muted-foreground">
            No hay tareas. ¡Agrega una para comenzar!
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`neuro-flat rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                currentTaskId === task.id ? "neuro-outset border-2 border-primary" : ""
              }`}
              onClick={() => onSelectTask(task.id)}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onToggleComplete(task.id)}
                  className="neuro-pressed rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      task.completed ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(task.pomodorosCompleted)].map((_, i) => (
                        <Circle key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                    {task.pomodorosCompleted > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {task.pomodorosCompleted} pomodoro{task.pomodorosCompleted > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}
                  className="neuro-flat hover:neuro-pressed rounded-xl transition-all duration-200"
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
