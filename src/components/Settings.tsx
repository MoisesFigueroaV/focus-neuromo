import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface SettingsProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onWorkTimeChange: (value: number) => void;
  onShortBreakTimeChange: (value: number) => void;
  onLongBreakTimeChange: (value: number) => void;
  onClose: () => void;
}

export const Settings = ({
  workTime,
  shortBreakTime,
  longBreakTime,
  onWorkTimeChange,
  onShortBreakTimeChange,
  onLongBreakTimeChange,
  onClose,
}: SettingsProps) => {
  return (
    <div className="neuro-inset rounded-3xl p-6 md:p-8 bg-background space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
        <Button
          onClick={onClose}
          className="neuro-flat rounded-2xl p-2 hover:neuro-pressed transition-all duration-200"
          variant="ghost"
          size="icon"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">
              Tiempo de trabajo
            </label>
            <span className="text-lg font-bold text-primary">{workTime} min</span>
          </div>
          <Slider
            value={[workTime]}
            onValueChange={([value]) => onWorkTimeChange(value)}
            min={1}
            max={60}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">
              Descanso corto
            </label>
            <span className="text-lg font-bold text-accent">{shortBreakTime} min</span>
          </div>
          <Slider
            value={[shortBreakTime]}
            onValueChange={([value]) => onShortBreakTimeChange(value)}
            min={1}
            max={30}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">
              Descanso largo
            </label>
            <span className="text-lg font-bold text-destructive">{longBreakTime} min</span>
          </div>
          <Slider
            value={[longBreakTime]}
            onValueChange={([value]) => onLongBreakTimeChange(value)}
            min={5}
            max={60}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <Button
        onClick={onClose}
        className="w-full neuro-outset hover:neuro-flat rounded-2xl py-3 font-semibold transition-all duration-200 bg-primary text-primary-foreground"
      >
        Guardar cambios
      </Button>
    </div>
  );
};
