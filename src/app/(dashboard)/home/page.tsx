"use client";
import Post from "@/components/sub-components/Post";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/hooks";
import { PostSelector } from "@/store/post.slice";

export default function Home() {
  const Posts = useAppSelector(PostSelector.selectAll);
  const isLoading = useAppSelector((state) => state.post.isLoading);
  
  if(isLoading) return <div className="flex justify-center py-5"><Spinner/></div>
  return (
    <div className="h-fit w-full flex flex-col">
      {
        Posts?.map(post=>{
          return (
            <Post key={post.id} props={post}/>
          )
        })
      }
    </div>
  );
}
