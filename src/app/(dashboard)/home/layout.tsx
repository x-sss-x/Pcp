"use client";
import Header from "@/components/sub-components/Header";
import { useAppDispatch } from "@/hooks";
import { fetchIntialPosts } from "@/store/post.slice";
import { useCallback } from "react";

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
