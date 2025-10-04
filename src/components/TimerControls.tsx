import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls = ({ isRunning, onToggle, onReset }: TimerControlsProps) => {
  return (
    <div className="flex justify-center gap-4 md:gap-6 mt-8">
      <Button
        onClick={onToggle}
        className="neuro-outset hover:neuro-flat active:neuro-pressed rounded-3xl px-8 md:px-12 py-6 md:py-8 text-lg md:text-xl font-semibold transition-all duration-200 bg-primary text-primary-foreground"
        size="lg"
      >
        {isRunning ? (
          <>
            <Pause className="w-6 h-6 md:w-8 md:h-8 mr-2" />
            Pausar
          </>
        ) : (
          <>
            <Play className="w-6 h-6 md:w-8 md:h-8 mr-2" />
            Iniciar
          </>
        )}
      </Button>

      <Button
        onClick={onReset}
        className="neuro-outset hover:neuro-flat active:neuro-pressed rounded-3xl p-6 md:p-8 transition-all duration-200"
        variant="ghost"
        size="icon"
      >
        <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
      </Button>
    </div>
  );
};
