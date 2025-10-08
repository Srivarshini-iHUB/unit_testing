"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const StackedProgressBar = ({
  completed = 0,
  inProgress = 0,
  pending = 0,
  className,
}) => {
  const total = completed + inProgress + pending || 1;

  const completedPercent = (completed / total) * 100;
  const inProgressPercent = (inProgress / total) * 100;
  const pendingPercent = (pending / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="h-3 w-full overflow-hidden rounded-full flex">
        <div
          className="h-full bg-green-600"
          style={{ width: `${completedPercent}%` }}
        />
        <div
          className="h-full bg-yellow-400"
          style={{ width: `${inProgressPercent}%` }}
        />
        <div
          className="h-full bg-orange-500"
          style={{ width: `${pendingPercent}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-end gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-green-600" />
          <span className="text-green-800 font-medium">
            Completed: {completedPercent.toFixed(0)}%
          </span>
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="text-yellow-700 font-medium">
            In Progress: {inProgressPercent.toFixed(0)}%
          </span>
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-orange-500" />
          <span className="text-orange-700 font-medium">
            Pending: {pendingPercent.toFixed(0)}%
          </span>
        </span>
      </div>
    </div>
  );
};

export { StackedProgressBar };
