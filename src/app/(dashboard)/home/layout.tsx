"use client";
import Header from "@/components/sub-components/Header";
import RightBar from "@/components/sub-components/RightBar";
import { useAppDispatch } from "@/hooks";
import { fetchIntialPosts } from "@/store/post.slice";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  dispatch(fetchIntialPosts());

  return (
    <div
      className={"w-full grid h-full"}
      style={{ gridTemplateColumns: "2fr 1fr", overflowY: "scroll" }}
    >
      <section aria-label="post-container block h-fit">
        <Header title="Home" />
        {props.children}
      </section>
      <RightBar />
    </div>
  );
}
