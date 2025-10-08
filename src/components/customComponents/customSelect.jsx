import React, { memo } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className = "",
}) {
  return (
    <Select value={value} onValueChange={onChange} aria-label={label || placeholder}>
      <SelectTrigger
        className={cn(
          "placeholder w-auto h-[42px] px-[16px] py-[12px] gap-[10px] rounded-xl bg-backgroundFill text-color1 [&>svg:not(.custom-icon)]:hidden",
          className
        )}
        style={{
          border: "none",
          boxShadow: "none",
          outline: "none",
        }}
      >
        <SelectValue
          placeholder={placeholder}
          className={cn(
            "bg-gradient-custom font-inter text-[12px] leading-[100%] font-normal tracking-[0] truncate w-[150px] pointer-events-none select-none text-color1"
          )}
        />
        <ChevronDown
          className={cn(
            "custom-icon w-[18px] h-[18px] ml-auto text-color1 pointer-events-none"
          )}
          aria-hidden="true"
        />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {label && (
            <SelectLabel className={cn("text-color1")}>{label}</SelectLabel>
          )}
          {options.map(({ label: optLabel, value: optValue }) => (
            <SelectItem
              key={optValue}
              value={optValue}
              className={cn(
                "hover:text-color1 focus:text-color1 data-[state=checked]:text-color1 text-muted-foreground border-b border-[rgba(18,42,89,0.1)] last:border-b-0"
              )}
            >
              {optLabel}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>

      <style jsx global>
        {`
          [data-placeholder] {
            color: #122a59 !important;
          }

          [role="combobox"] {
            caret-color: transparent !important;
          }
        `}
      </style>
    </Select>
  );
}

export default memo(CustomSelect);
