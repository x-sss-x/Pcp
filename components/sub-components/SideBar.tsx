"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  HiArrowTrendingDown,
  HiBookmark,
  HiHome,
  HiPlus,
  HiPlusCircle,
  HiShoppingBag,
} from "react-icons/hi2";
import { NavButton } from "../ui/NavButton";
import { AiOutlineSearch } from "react-icons/ai";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-white gap-4 w-1/4 flex flex-col justify-between px-10 border-r border-border py-5 pb-10">
      <div className="block space-y-4">
        <div className="px-5">
          <Image
            src={"/HandicAppLogo.png"}
            width={100}
            height={100}
            alt="Handic App Logo"
          />
        </div>

        <ul className="flex flex-col gap-4">
          <NavButton
            href="/home"
            isActive={pathname === "/home"}
            icon={<HiHome className="text-2xl" />}
          >
            Home
          </NavButton>
          <NavButton
            href="/explore"
            isActive={pathname === "/explore"}
            icon={<AiOutlineSearch className="text-2xl" />}
          >
            Explore
          </NavButton>
          <NavButton
            href="/jobs"
            isActive={pathname === "/jobs"}
            icon={<HiShoppingBag className="text-2xl" />}
          >
            Jobs
          </NavButton>
          <NavButton
            href="/bookmarks"
            isActive={pathname === "/bookmarks"}
            icon={<HiBookmark className="text-2xl" />}
          >
            Saved Posts
          </NavButton>
        </ul>
      </div>
      <Button className="rounded-full gap-2">
        <HiPlus className="text-2xl" />
        <span>New Post</span>
      </Button>
      <div className="block space-y-3">
        <NavButton
          icon={
            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-primary">
              <AvatarImage
                sizes="50"
                alt={data?.user?.id}
                src={
                  data && data.user && data.user.image ? data?.user?.image : ""
                }
              />
              <AvatarFallback>
                <Image fill alt="avatar" src="/avatar.svg" />
              </AvatarFallback>
            </Avatar>
          }
        >
          <div className="flex flex-col">
            <span className="text-sm whitespace-nowrap w-32 text-ellipsis overflow-x-hidden">
              {data?.user?.name}
            </span>
            <span className="text-sm whitespace-nowrap w-32 text-ellipsis overflow-x-hidden text-slate-400">
              @{data?.user?.name}
            </span>
          </div>
        </NavButton>
        <NavButton
          href={"/api/auth/signout"}
          icon={<LogOut className="text-2xl" />}
        >
          Signout
        </NavButton>
      </div>
    </nav>
  );
}
