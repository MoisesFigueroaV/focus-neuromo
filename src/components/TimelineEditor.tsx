import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export interface TimelineItem {
  type: "work" | "break";
  duration: number;
}

interface TimelineEditorProps {
  timeline: TimelineItem[];
  onTimelineChange: (timeline: TimelineItem[]) => void;
}

export const TimelineEditor = ({ timeline, onTimelineChange }: TimelineEditorProps) => {
  const handleAddItem = () => {
    onTimelineChange([...timeline, { type: "work", duration: 25 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newTimeline = [...timeline];
    newTimeline.splice(index, 1);
    onTimelineChange(newTimeline);
  };

  const handleUpdateItem = (index: number, updatedItem: TimelineItem) => {
    const newTimeline = [...timeline];
    newTimeline[index] = updatedItem;
    onTimelineChange(newTimeline);
  };

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-medium text-foreground">Custom Timeline</h3>
      <div className="neuro-inset rounded-2xl p-6 space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Select
              value={item.type}
              onValueChange={(value: "work" | "break") =>
                handleUpdateItem(index, { ...item, type: value })
              }
            >
              <SelectTrigger className="w-32 neuro-flat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="neuro-outset">
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="break">Break</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={item.duration}
              onChange={(e) =>
                handleUpdateItem(index, {
                  ...item,
                  duration: Number(e.target.value),
                })
              }
              className="w-24 neuro-inset rounded-xl bg-transparent border-none focus:ring-2 focus:ring-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(index)}
              className="neuro-flat hover:neuro-pressed"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddItem} className="w-full neuro-flat hover:neuro-pressed">
          Add Interval
        </Button>
      </div>
    </div>
  );
};
