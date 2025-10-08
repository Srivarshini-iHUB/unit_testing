import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

function CustomDatePicker({ value, onChange, width = "w-[200px]" }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          tabIndex={0}
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center justify-between px-4 py-3 bg-backgroundFill rounded-xl text-color1 font-inter text-sm outline-none border-none h-[45px] select-none",
            width
          )}
        >
          <span className={cn("truncate text-left", value ? "text-color1" : "text-color1")}>
            {value ? format(value, "PPP") : "Pick a date"}
          </span>
          <CalendarIcon className="w-[18px] h-[18px] ml-auto text-color1" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0 bg-white rounded-xl border mt-2 w-auto")}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          className="p-3"
          classNames={{
            day_selected:
              "bg-primary text-white hover:text-white hover:bg-primary focus:bg-primary focus:text-white",
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default CustomDatePicker;
