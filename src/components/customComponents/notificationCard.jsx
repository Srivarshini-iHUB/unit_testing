import { BellIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    id: 2,
    message: "Duis aute irure dolor in reprehenderit in voluptate ..",
  },
  {
    id: 3,
    message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa..",
  },
];

export function NotificationCard() {
  return (
    <Card className="w-full max-w-sm rounded-xl bg-color11 border border-inputcolour shadow-none">
      <div className="flex justify-between items-center px-5 pt-5 pb-3">
        <h3 className="text-sm font-bold text-color1">NOTIFICATIONS</h3>
        <Button variant="link" className="text-xs text-primary p-0 h-auto text-sm underline">
          Show All
        </Button>
      </div>
      <CardContent className="space-y-3 px-5 pb-10 pt-0">
        {notifications.map((note) => (
          <div
          
            key={note.id}
            className="flex items-start gap-2 p-4 rounded-xl bg-white shadow-custom-subtle text-color1 text-sm font-semibold border border-color9"
          >
            <BellIcon size={20} className="mt-1 text-color1" />
            <span className="font-medium text-sm leading-[19.9px] font-inter">{note.message}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
