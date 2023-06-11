"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";

const navbuttonVariants = cva(
  "flex text-md font-normal tracking-wider items-center justify-start px-5 hover:cursor-pointer py-3 gap-4 rounded-full hover:bg-slate-100 transition-all duration-150  text-slate-700",
  {
    variants: {
      isActive: {
        true: "font-semibold text-slate-800",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

interface NavButtonProps extends VariantProps<typeof navbuttonVariants> {
  children: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  href?: string;
}

const NavButton = ({
  className,
  href,
  isActive,
  children,
  icon,
  ...props
}: NavButtonProps) => (
  <Link
    href={href ? href : "/#"}
    className={cn(navbuttonVariants({ isActive }), className)}
    {...props}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

NavButton.displayName = "NavButton";

export { NavButton };
