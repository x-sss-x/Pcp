import "../globals.css";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SideBar from "@/components/sub-components/SideBar";
import RightBar from "@/components/sub-components/RightBar";


export default async function RootLayout(props: {
  children: React.ReactNode;
  modals: React.ReactNode;
  rightBarSlot: React.ReactNode;
}) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) redirect("/sign-in");

  return (
    <div
      className={"w-full grid h-full"}
      style={{ gridTemplateColumns: "1fr 3.5fr", overflowY: "scroll" }}
    >
      <SideBar />
      {props.modals}
      <main className="bg-slate-800 w-full h-full">{props.children}</main>
      {/* <RightBar>{props.rightBarSlot}</RightBar> */}
    </div>
  );
}
