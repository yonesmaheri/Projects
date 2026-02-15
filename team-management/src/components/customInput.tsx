import React from "react";
import { cn } from "../utils/cn";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#E5E5E5]">
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          className={cn(
            "rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all",
            "focus-visible:ring-[#1E1E1E]! transition-all! file:text-foreground placeholder:text-muted-foreground selection:bg-info selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
