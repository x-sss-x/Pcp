"use client"
import JobPost from "@/components/sub-components/JobPost";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/hooks";
import { JobsSelector } from "@/store/jobs.slice";
import { shallowEqual } from "react-redux";

export default function Jobs() {
  const Jobs = useAppSelector(JobsSelector.selectAll, shallowEqual);
  const isLoading = useAppSelector(
    (state) => state.jobs.isLoading,
    shallowEqual
  );

  if (isLoading)
    return (
      <div className="flex justify-center py-5">
        <Spinner />
      </div>
    );
  return (
    <div className="h-fit w-full flex flex-col">
      {Jobs?.map((post) => {
        return <JobPost key={post.id} props={post} />;
      })}
    </div>
  );
}
