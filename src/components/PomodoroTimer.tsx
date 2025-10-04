import { useState, useEffect } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { SettingsPanel } from "./SettingsPanel";
import { TaskList } from "./TaskList";
import { TimelineEditor, TimelineItem } from "./TimelineEditor";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export type TimerMode = "work" | "shortBreak" | "longBreak" | "break";

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

  const [timeline, setTimeline] = useState<TimelineItem[]>([
    { type: "work", duration: 25 },
    { type: "break", duration: 5 },
  ]);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);

  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  useEffect(() => {
    const currentItem = timeline[currentTimelineIndex];
    if (currentItem) {
      setMode(currentItem.type === "work" ? "work" : "break");
      setTimeLeft(currentItem.duration * 60);
    } else {
      // Reset to default if timeline is empty
      setMode("work");
      setTimeLeft(workTime * 60);
    }
  }, [currentTimelineIndex, timeline, workTime]);

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
    }

    // Move to the next item in the timeline
    if (timeline.length > 0) {
      setCurrentTimelineIndex((prevIndex) => (prevIndex + 1) % timeline.length);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const currentItem = timeline[currentTimelineIndex];
    if (currentItem) {
      setTimeLeft(currentItem.duration * 60);
    }
  };

  const changeMode = (newMode: TimerMode) => {
    setCurrentTimelineIndex(0);
    const firstItem = timeline[0];
    if (firstItem) {
      setMode(firstItem.type === "work" ? "work" : "break");
      setTimeLeft(firstItem.duration * 60);
    }
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
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Pomodoro Focus</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="neuro-flat rounded-2xl p-3 hover:neuro-pressed transition-all duration-200"
                variant="ghost"
                size="icon"
              >
                <SettingsIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="neuro-outset">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <SettingsPanel
                workTime={workTime}
                shortBreakTime={shortBreakTime}
                longBreakTime={longBreakTime}
                onWorkTimeChange={setWorkTime}
                onShortBreakTimeChange={setShortBreakTime}
                onLongBreakTimeChange={setLongBreakTime}
              />
            </SheetContent>
          </Sheet>
        </header>

        <main>
          <Tabs defaultValue="timer" className="w-full">
            <TabsList className="grid w-full grid-cols-3 neuro-flat">
              <TabsTrigger value="timer">Timer</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="timer">
              <div className="neuro-outset rounded-[2rem] p-8 mt-8 bg-background">
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
                    Pomodoros completados:{" "}
                    <span className="font-bold text-primary text-lg">
                      {pomodorosCompleted}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="timeline">
              <div className="neuro-outset rounded-[2rem] p-8 mt-8 bg-background">
                <TimelineEditor timeline={timeline} onTimelineChange={setTimeline} />
              </div>
            </TabsContent>
            <TabsContent value="tasks">
              <div className="neuro-outset rounded-[2rem] p-8 mt-8 bg-background">
                <TaskList
                  tasks={tasks}
                  currentTaskId={currentTaskId}
                  onAddTask={addTask}
                  onToggleComplete={toggleTaskComplete}
                  onDeleteTask={deleteTask}
                  onSelectTask={setCurrentTaskId}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PomodoroTimer;
