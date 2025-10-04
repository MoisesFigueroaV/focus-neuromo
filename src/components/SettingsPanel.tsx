import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <ScrollArea className="h-full">
      <div className="mt-8 space-y-8 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Timers</h3>
          <div className="neuro-inset rounded-2xl p-6 space-y-6">
            <div>
              <Label htmlFor="workTime" className="text-muted-foreground">
                Work
              </Label>
              <Input
                id="workTime"
                type="number"
                value={workTime}
                onChange={(e) => onWorkTimeChange(Number(e.target.value))}
                className="mt-2 w-full neuro-inset rounded-xl bg-transparent border-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="shortBreakTime" className="text-muted-foreground">
                Short Break
              </Label>
              <Input
                id="shortBreakTime"
                type="number"
                value={shortBreakTime}
                onChange={(e) => onShortBreakTimeChange(Number(e.target.value))}
                className="mt-2 w-full neuro-inset rounded-xl bg-transparent border-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="longBreakTime" className="text-muted-foreground">
                Long Break
              </Label>
              <Input
                id="longBreakTime"
                type="number"
                value={longBreakTime}
                onChange={(e) => onLongBreakTimeChange(Number(e.target.value))}
                className="mt-2 w-full neuro-inset rounded-xl bg-transparent border-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Theme</h3>
          <div className="neuro-inset rounded-2xl p-6">
            <p className="text-muted-foreground">
              Theme customization is coming soon!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Sound</h3>
          <div className="neuro-inset rounded-2xl p-6">
            <p className="text-muted-foreground">
              Sound customization is coming soon!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Account</h3>
          <div className="neuro-inset rounded-2xl p-6">
            <Button className="w-full neuro-flat hover:neuro-pressed transition-all duration-200">
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
