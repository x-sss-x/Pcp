import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
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
      <Link href={"/sign-in"}>
          <Button size={"sm"} variant={"outline"}>Signin</Button>
        </Link>
        <Link href={"/sign-in"}>
          <Button size={"sm"} variant={"ghost"}>SignUp</Button>
        </Link>
      </div>
    </div>
  );
}
