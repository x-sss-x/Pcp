"use client";
import { useUser } from "@/app/UserProvider";
import Header from "@/components/sub-components/Header";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { JobsSelector, fetchIntialJobs, fetchMyJobs } from "@/store/jobs.slice";
import { useCallback } from "react";

export const metadata = {
  title: "Handic App",
  description: "",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const user = useUser();
  const totalJobs = useAppSelector(JobsSelector.selectTotal);

  const fetchMemoJobs = useCallback(() => {
    user?.id && dispatch(fetchMyJobs(user.id));
  }, [user?.id]);

  fetchMemoJobs();

  return (
    <section aria-label="post-container block h-fit">
      <Header
        title="My Job Posts"
        subtitle={totalJobs !== 0 ? `${totalJobs} Jobs Posted` : undefined}
      />
      {props.children}
    </section>
  );
}
