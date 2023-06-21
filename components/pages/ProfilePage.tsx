"use client";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ProfilePage() {
  const { data, status } = useSession();

  if (status == "loading")
    return (
      <div className="flex justify-center py-5">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center py-5 px-20 gap-5">
      <Avatar className="h-36 w-36 ring-2 ring-offset-2 ring-primary">
        <AvatarImage
          sizes="50"
          alt={data?.user?.id}
          src={data && data.user && data.user.image ? data?.user?.image : ""}
        />
        <AvatarFallback>
          <Image fill alt="avatar" src="/avatar.svg" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 items-center">
      <h1 className="text-lg text-slate-900 font-medium">{data?.user?.name}</h1>
      <span className="text-base text-slate-700">@{data?.user?.username}</span>
      </div>
      <div className="w-full">
        <Label>Email</Label>
        <Input value={data?.user?.email!} readOnly/>
      </div>
      <div className="w-full">
        <Label>Bio</Label>
        <Textarea value={data?.user?.bio!} readOnly/>
      </div>
      <div className="w-full">
        <Label>Adress</Label>
        <Input value={data?.user?.address!} readOnly/>
      </div>
    </div>
  );
}
