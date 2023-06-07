import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, rightIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full relative border-b border-input bg-transparent text-sm",
          className
        )}
      >
        <input
          type={type}
          className={cn(
            "w-full h-full px-3 py-2 focus:border-b focus:border-b-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="input-group-append absolute right-0">{rightIcon}</div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
