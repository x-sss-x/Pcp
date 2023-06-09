"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className={
        "h-[60px] py-2 w-full justify-between backdrop-blur-sm border-b border-gray-300 sticky top-0 flex items-center px-5"
      }
    >
      <div>
        <h3 className="text-lg">{title}</h3>
        {subtitle && <span className="text-sm text-slate-500">{subtitle}</span>}
      </div>
    </div>
  );
}
