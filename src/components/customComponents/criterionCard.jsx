import { Card, CardContent } from "@/components/ui/card";
import { ChartNoAxesColumn } from "lucide-react";
import { CriterionProgressBar } from "./criterionProgressBar";
import { cn } from "@/lib/utils";

export default function CriterionCard({
  criterionNumber = "1",
  criterionTitle = "Curricular Aspects",
  criterionSubtitle = "Curriculum planning, design and development",
  completed = 0,
  total = 1,
}) {
  return (
    <Card
      className={cn(
        "w-full max-w-md border border-color11 rounded-xl px-8 py-8 bg-color11 select-none"
      )}
    >
      <CardContent className={cn("p-0 flex flex-col gap-2.5")}>
        <div className={cn("flex items-center gap-2")}>
          <div className={cn("p-2 rounded-xl bg-viewBtn")}>
            <ChartNoAxesColumn
              className={cn("text-current")}
              style={{ width: 18, height: 18 }}
              strokeWidth={3}
            />
          </div>
          <span className={cn("text-base font-bold text-primary")}>
            Criterion {criterionNumber}
          </span>
        </div>

        <p className={cn("text-base font-medium text-color1 leading-tight")}>
          {criterionTitle}
        </p>
        <p className={cn("text-xs font-normal text-color1 leading-none")}>
          {criterionSubtitle}
        </p>

        <div className={cn("mt-1")}>
          <CriterionProgressBar completed={completed} total={total} />
        </div>
      </CardContent>
    </Card>
  );
}