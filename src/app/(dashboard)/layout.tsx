import "../globals.css"
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import SideBar from "@/components/sub-components/SideBar";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) redirect("/sign-in");

  return (
    <div className={"h-full w-full flex"}>
      <SideBar/>
      <main className="bg-slate-800 w-full h-full overflow-y-scroll">{props.children}</main>
    </div>
  );
}
