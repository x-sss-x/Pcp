"use client";
import Header from "@/components/sub-components/Header";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchIntialPosts, PostSelector } from "@/store/post.slice";
import { useCallback } from "react";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const fetchMemoPosts = useCallback(() => {
    dispatch(fetchIntialPosts());
  }, []);

  fetchMemoPosts();

  return (
    <section aria-label="post-container block h-fit">
      <Header title="Home" />
      {props.children}
    </section>
  );
}
