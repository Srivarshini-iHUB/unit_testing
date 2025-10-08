"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const SearchInput = ({ placeholder = "Search by name or mail ID ..", className, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl bg-inputColor px-4 py-2 w-full fw-bold",
        "focus-within:ring-2 focus-within:ring-color1 focus-within:ring-offset-2 focus-within:outline-none ring-offset-background",
        className
      )}
    >
      <Search size={18} className="text-color1/40" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm placeholder:text-color1/40 text-color1"
        {...props}
      />
    </div>
  );
};

export { SearchInput };
