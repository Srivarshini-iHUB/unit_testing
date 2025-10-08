import React, {
  useState,
  memo,
  Children,
  cloneElement,
  useMemo,
  useCallback,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Badge } from "./badge";

const Accordion = ({ children, parentIndex = "", level = 0 }) => {
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  return (
    <div className="space-y-3 w-full">
      {childrenArray.map((child, idx) => {
        const numbering = parentIndex ? `${parentIndex}.${idx + 1}` : `1.${idx + 1}`;
        return cloneElement(child, {
          key: numbering,
          numbering,
          level,
        });
      })}
    </div>
  );
};

export default memo(Accordion);

export const AccordionItem = memo(
  ({
    numbering,
    title,
    renderContent,
    children,
    level = 0,
    metricsCount = 0,
    totalMetrics = 0,
    status = "inProgress",
    metricType = "QnM",
  }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
    const hasChildren = useMemo(() => Children.count(children) > 0, [children]);

    const baseClasses = "border rounded-lg w-full box-border max-w-full overflow-hidden select-none";
    const backgroundClass = level > 0 ? "bg-white" : "bg-color11";
    const indentPadding = `pl-${Math.min(level * 4, 12)}`;

    const badgeProps = {
      className: "py-1 px-3 text-[14px] font-bold",
    };

    return (
      <div className={cn(baseClasses, backgroundClass, indentPadding)}>
        <button
          onClick={toggleOpen}
          className="w-full h-14 flex justify-between items-center px-4 transition-none"
        >
          <div className="flex items-center gap-4 text-sm sm:text-base">
            <div
              className={cn(
                "text-[16px] leading-[19px] flex gap-2 items-center",
                level === 0 ? "text-primary font-bold" : "text-color4"
              )}
            >
              <span>{numbering}</span>
              <span>{title}</span>
            </div>

            {level === 0 ? (
              <Badge status={status} className={cn(badgeProps.className, "rounded-[12px]")}>
                {metricsCount}/ {totalMetrics} metrics completed
              </Badge>
            ) : metricType ? (
              <Badge
                className={cn(
                  badgeProps.className,
                  "rounded-full border",
                  metricType === "QIM" && "bg-color8 text-primary border-color8",
                  metricType === "QnM" && "bg-color10 text-color3 border-color8"
                )}
              >
                {metricType}
              </Badge>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-sm">
            {level === 0 && (
              <span className="hidden sm:inline px-2 py-0.5 rounded text-color1/80 text-[14px] font-medium">
                {open ? "Hide Content" : "Show Content"}
              </span>
            )}
            <ChevronDown className={cn("transition-transform", open && "rotate-180")} />
          </div>
        </button>

        {level === 0 && <Separator />}

        {open && (
          <div className="p-4 space-y-4 text-sm sm:text-base">
            {renderContent && renderContent()}
            {hasChildren && (
              <Accordion parentIndex={numbering} level={level + 1}>
                {children}
              </Accordion>
            )}
          </div>
        )}
      </div>
    );
  }
);
