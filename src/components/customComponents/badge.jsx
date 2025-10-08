import React from "react";
import { cn } from "@/lib/utils";

const statusStyles = {
  inProgress: {
    text: "text-inProgress",
    bg: "bg-inProgressBg",
  },
  approved: {
    text: "text-completed",
    bg: "bg-completedBg",
  },
  rejected: {
    text: "text-pending",
    bg: "bg-pendingBg",
  },
};

const Badge = ({
  status = "inProgress",
  children,
  className = "",
}) => {
  const { text, bg } = statusStyles[status] || statusStyles.inProgress;

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-2xl text-sm font-semibold w-fit",
        text,
        bg,
        className
      )}
    >
      {children}
    </div>
  );
};

export { Badge }; 