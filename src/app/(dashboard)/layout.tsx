import { Inter } from "next/font/google";
import Header from "@/components/sub-components/Header";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handic App",
  description: "",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NextAuthOptions)

  if(!session?.user) redirect("/sign-in")
  
  return (
    <div className={"h-full w-full"} style={inter.style}>
      <Header />
      {props.children}
    </div>
  );
}
