"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "h-7 w-7 border-[4px] rounded-full border-slate-200 border-r-primary animate-spin duration-500"
);

interface NavButtonProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

const Spinner = ({ className, ...props }: NavButtonProps) => (
  <div className={cn(spinnerVariants(), className)} {...props}></div>
);

Spinner.displayName = "Spinner";

export { Spinner };
