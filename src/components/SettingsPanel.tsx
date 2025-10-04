import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
      <div className="p-6">
        <Tabs defaultValue="timers" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timers">Timers</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="sound">Sound</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="timers">
            <div className="neuro-inset rounded-2xl p-6 space-y-6 mt-6">
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
                  onChange={(e) =>
                    onShortBreakTimeChange(Number(e.target.value))
                  }
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
                  onChange={(e) =>
                    onLongBreakTimeChange(Number(e.target.value))
                  }
                  className="mt-2 w-full neuro-inset rounded-xl bg-transparent border-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="theme">
            <div className="neuro-inset rounded-2xl p-6 mt-6">
              <p className="text-muted-foreground">
                Theme customization is coming soon!
              </p>
            </div>
          </TabsContent>
          <TabsContent value="sound">
            <div className="neuro-inset rounded-2xl p-6 mt-6">
              <p className="text-muted-foreground">
                Sound customization is coming soon!
              </p>
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="neuro-inset rounded-2xl p-6 mt-6">
              <Button className="w-full neuro-flat hover:neuro-pressed transition-all duration-200">
                Login with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};
