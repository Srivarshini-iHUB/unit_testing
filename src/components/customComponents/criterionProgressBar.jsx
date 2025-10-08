import * as React from "react";
import { cn } from "@/lib/utils";

const CriterionProgressBar = ({
  completed = 0,
  total = 1,
  className,
}) => {
  const completedPercent = (completed / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("flex items-center gap-3 ")}>
        <div
          className={cn(
            "relative h-3 w-full rounded-full overflow-hidden flex-1 bg-inputColor"
          )}
        >
          <div
            className={cn("h-full bg-completed")}
            style={{
              width: `${completedPercent}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <span
          className={cn("text-sm font-semibold text-color1 select-none")}
        >
          {completedPercent.toFixed(0)}%
        </span>
      </div>

      <p className={cn("mt-1 text-xs text-color1")}>
        {completed}/{total} metrics completed
      </p>
    </div>
  );
};

export { CriterionProgressBar };