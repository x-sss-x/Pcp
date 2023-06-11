import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(NextAuthOptions);

  if(session?.user) redirect("/home")
  else redirect("/sign-in")
}
