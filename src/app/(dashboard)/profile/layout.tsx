"use client";
import Header from "@/components/sub-components/Header";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const session = useSession();

  return (
    <section aria-label="post-container block h-fit">
      <Header
        title="My Profile"
        subtitle={
          session.data?.user?.username && "@" + session.data?.user?.username
        }
      />
      {props.children}
    </section>
  );
}
