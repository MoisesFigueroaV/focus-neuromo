import { useState, useEffect, useCallback } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { Settings } from "./Settings";
import { TaskList } from "./TaskList";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

export type TimerMode = "work" | "shortBreak" | "longBreak";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodorosCompleted: number;
}

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "work") setTimeLeft(workTime * 60);
    else if (mode === "shortBreak") setTimeLeft(shortBreakTime * 60);
    else setTimeLeft(longBreakTime * 60);
  }, [mode, workTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === "work") {
      setPomodorosCompleted((prev) => prev + 1);
      
      if (currentTaskId) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === currentTaskId
              ? { ...task, pomodorosCompleted: task.pomodorosCompleted + 1 }
              : task
          )
        );
      }
      
      const nextMode = (pomodorosCompleted + 1) % 4 === 0 ? "longBreak" : "shortBreak";
      setMode(nextMode);
    } else {
      setMode("work");
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === "work") setTimeLeft(workTime * 60);
    else if (mode === "shortBreak") setTimeLeft(shortBreakTime * 60);
    else setTimeLeft(longBreakTime * 60);
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      pomodorosCompleted: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (currentTaskId === id) setCurrentTaskId(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="neuro-outset rounded-[2rem] p-8 md:p-12 bg-background">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Pomodoro Focus
            </h1>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              className="neuro-flat rounded-2xl p-3 hover:neuro-pressed transition-all duration-200"
              variant="ghost"
              size="icon"
            >
              <SettingsIcon className="w-6 h-6" />
            </Button>
          </div>

          {showSettings ? (
            <Settings
              workTime={workTime}
              shortBreakTime={shortBreakTime}
              longBreakTime={longBreakTime}
              onWorkTimeChange={setWorkTime}
              onShortBreakTimeChange={setShortBreakTime}
              onLongBreakTimeChange={setLongBreakTime}
              onClose={() => setShowSettings(false)}
            />
          ) : (
            <>
              <TimerDisplay
                timeLeft={timeLeft}
                mode={mode}
                onModeChange={changeMode}
              />

              <TimerControls
                isRunning={isRunning}
                onToggle={toggleTimer}
                onReset={resetTimer}
              />

              <div className="mt-8 neuro-inset rounded-2xl p-4 bg-background">
                <div className="text-center text-muted-foreground text-sm">
                  Pomodoros completados: <span className="font-bold text-primary text-lg">{pomodorosCompleted}</span>
                </div>
              </div>

              <TaskList
                tasks={tasks}
                currentTaskId={currentTaskId}
                onAddTask={addTask}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
                onSelectTask={setCurrentTaskId}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
