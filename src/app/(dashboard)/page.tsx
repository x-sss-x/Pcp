"use client"
import { LoginForm } from "@/components/forms/LoginForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log(session)
  return (
    <main className="h-full w-full flex justify-center">
      <ul>
        <Link href={"/1"}><li>post 1</li></Link>
        <Link href={"/2"}><li>post 2</li></Link>
        <Link href={"/3"}><li>post 3</li></Link>
        <Link href={"/4"}><li>post 4</li></Link>
        <Link href={"/5"}><li>post 5</li></Link>
        <Link href={"/6"}><li>post 6</li></Link>
      </ul>
    </main>
  );
}
