import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RootLayout(props: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NextAuthOptions)

  if(session?.user) redirect("/")
  
  return (<>{props.children}</>)
}
