import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statusColor = {
  default: "text-color1",
  created: "text-color1",
  toBeApproved: "text-primary",
  approved: "text-completed",
  pending: "text-pending",
  rejected: "text-color1",
};

export default function StatsCard({
  title = "Tasks created:",
  value = "24",
  status = "default",
}) {
  return (
    <Card
      className={cn(
        "w-fit min-w-[180px] max-w-[240px] p-4 bg-color9 rounded-2xl flex items-center select-none border border-color8"
      )}
    >
      <CardContent className="p-0 w-full">
        <div className="flex items-center gap-x-2">
          <span className="font-inter font-medium text-[14px] leading-[22px] text-color1">
            {title}
          </span>
          <span
            className={cn(
              "font-inter font-semibold text-[16px] leading-[100%]",
              statusColor[status] || statusColor.default
            )}
          >
            {value}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
