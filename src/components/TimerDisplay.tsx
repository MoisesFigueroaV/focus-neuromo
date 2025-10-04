import { TimerMode } from "./PomodoroTimer";
import { Button } from "@/components/ui/button";

interface TimerDisplayProps {
  timeLeft: number;
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

export const TimerDisplay = ({ timeLeft, mode, onModeChange }: TimerDisplayProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getModeLabel = (m: TimerMode) => {
    if (m === "work") return "Trabajo";
    if (m === "shortBreak") return "Descanso Corto";
    return "Descanso Largo";
  };

  const getModeColor = (m: TimerMode) => {
    if (m === "work") return "text-primary";
    if (m === "shortBreak") return "text-accent";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2 md:gap-4">
        {(["work", "shortBreak", "longBreak"] as TimerMode[]).map((m) => (
          <Button
            key={m}
            onClick={() => onModeChange(m)}
            className={`neuro-flat rounded-2xl px-4 py-2 text-sm md:text-base transition-all duration-200 ${
              mode === m ? "neuro-pressed" : "hover:neuro-outset"
            }`}
            variant="ghost"
          >
            {getModeLabel(m)}
          </Button>
        ))}
      </div>

      <div className="neuro-inset rounded-[3rem] p-8 md:p-12 bg-background">
        <div className="text-center">
          <div className={`text-7xl md:text-9xl font-bold tracking-wider ${getModeColor(mode)} animate-pulse-soft`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">
            {getModeLabel(mode)}
          </div>
        </div>
      </div>
    </div>
  );
};
