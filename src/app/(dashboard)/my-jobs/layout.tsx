"use client";
import Header from "@/components/sub-components/Header";
import { useAppDispatch} from "@/hooks";
import { fetchIntialJobs } from "@/store/jobs.slice";
import { useCallback } from "react";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const fetchMemoJobs= useCallback(() => {
    dispatch(fetchIntialJobs());
  }, []);

  fetchMemoJobs();

  return (
    <section aria-label="post-container block h-fit">
      <Header title="Jobs" />
      {props.children}
    </section>
  );
}
