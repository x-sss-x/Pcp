"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function Header() {
  const { data } = useSession();

  return (
    <div
      className={
        "h-[56px] w-full justify-between bg-slate-50 border-b border-gray-300 sticky top-0 flex items-center px-5"
      }
    >
      <div className="">
        <Image
          src={"/HandicAppLogo.png"}
          alt="HandicAppLogo"
          width={80}
          height={100}
        />
      </div>
      <div className="flex gap-3">
        {data && (
          <Avatar>
            <AvatarImage src={data.user?.image ?? undefined} alt="@shadcn" />
            <AvatarFallback>{data.user?.name?.substring(0,2)}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
