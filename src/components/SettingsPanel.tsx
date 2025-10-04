import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SettingsPanelProps {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  onWorkTimeChange: (value: number) => void;
  onShortBreakTimeChange: (value: number) => void;
  onLongBreakTimeChange: (value: number) => void;
}

export const SettingsPanel = ({
  workTime,
  shortBreakTime,
  longBreakTime,
  onWorkTimeChange,
  onShortBreakTimeChange,
  onLongBreakTimeChange,
}: SettingsPanelProps) => {
  return (
    <div className="space-y-8 mt-8">
      <div>
        <Label htmlFor="workTime">Work (minutes)</Label>
        <Input
          id="workTime"
          type="number"
          value={workTime}
          onChange={(e) => onWorkTimeChange(Number(e.target.value))}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="shortBreakTime">Short Break (minutes)</Label>
        <Input
          id="shortBreakTime"
          type="number"
          value={shortBreakTime}
          onChange={(e) => onShortBreakTimeChange(Number(e.target.value))}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="longBreakTime">Long Break (minutes)</Label>
        <Input
          id="longBreakTime"
          type="number"
          value={longBreakTime}
          onChange={(e) => onLongBreakTimeChange(Number(e.target.value))}
          className="mt-2"
        />
      </div>
    </div>
  );
};
