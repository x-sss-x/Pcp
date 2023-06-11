import "../globals.css";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SideBar from "@/components/sub-components/SideBar";
import RightBar from "@/components/sub-components/RightBar";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
  rightBarSlot: React.ReactNode;
}) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) redirect("/sign-in");

  console.log(props.modal);

  return (
    <div
      className={"w-full grid h-full"}
      style={{ gridTemplateColumns: "1fr 2fr 1fr", overflowY: "scroll" }}
    >
      <SideBar />
      {props.modal}
      <main className="bg-slate-800 w-full h-full">{props.children}</main>
      <RightBar>{props.rightBarSlot}</RightBar>
    </div>
  );
}
