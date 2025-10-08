import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md px-3 py-2 text-sm text-color1 border border-transparent ring-offset-background transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0.5 focus-visible:ring-color1 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-inputColor",
      },
      size: {
        sm: "h-9 px-2 py-1 text-xs",
        default: "h-10 px-3 py-2",
        lg: "h-11 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Input = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return <input className={cn(inputVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Input.displayName = "Input";

export { Input, inputVariants };
