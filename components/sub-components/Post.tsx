import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostProps } from "@/store/post.slice";
import moment from "moment";
import Image from "next/image";
import { Button } from "../ui/button";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUser } from "@/app/UserProvider";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { SupaClient } from "@/utils/supabase";
import { LikeSelector, fetchLike, postLike } from "@/store/like.slice";
import { useAnimate, usePresence } from "framer-motion";

export default function Post({ props }: { props: PostProps }) {
  const user = useUser();
  const dispatch = useAppDispatch();

  const { User, content, createdAt, media_url, Like, id } = props;

  dispatch(fetchLike({ postId: id }));

  return (
    <div
      className={
        "border-b border-slate-100 hover:bg-gray-50 transition-all duration-150"
      }
    >
      {/* header */}
      <div className="py-2 px-6">
        <div className="flex gap-3">
          <Avatar className="border border-slate-300">
            <AvatarImage src={User?.image ? User?.image : ""} />
            <AvatarFallback>{User?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm text-black font-medium block space-x-1">
              {props?.User?.name} <span>·</span>
              <span className="text-xs text-gray-500">
                {moment(createdAt).fromNow()}
              </span>
            </h3>
            <span className="text-xs text-slate-600">@{User?.username}</span>
          </div>
        </div>
      </div>

      {/* content area */}
      <div className="px-6 flex flex-col items-center">
        <p className="py-3 text-black font-normal px-7 w-full text-left tracking-wider text-sm leading-6">
          {content}
        </p>
        <Image
          src={media_url}
          alt={content ? content : "Post"}
          width={600}
          height={600}
          className="rounded-2xl aspect-auto object-contain"
        />
      </div>

      {/* footer */}
      <div className="px-14 py-3 flex space-x-16">
        <LikeButton userId={user?.id!} postId={id} Like={Like} />
        <div className="flex items-center justify-center gap-1 w-fit text-slate-600">
          <Button
            variant={"ghost"}
            className="rounded-full p-1 h-10 w-10 hover:bg-blue-100 hover:text-blue-500"
          >
            <HiOutlineChatBubbleBottomCenter className="text-xl" />
          </Button>
          <span className="text-sm">0</span>
        </div>
      </div>
    </div>
  );
}

const LikeButton = ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
  Like: string[];
}) => {
  const LikeIds = useAppSelector((state) =>
    LikeSelector.selectById(state, postId)
  );
  const isLiked = LikeIds?.idList.includes(userId);
  const dispatch = useAppDispatch();
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  async function onLike() {
    dispatch(postLike({ userId, postId }));
  }

  useEffect(() => {
    async function onAnimate() {
      await animate(
        scope.current,
        { scale: [1, 1.4,1] },
        { duration: 0.2,bounce:10,bounceDamping:23,bounceStiffness:30}
      );
    }
    if (isPresent) {
      onAnimate();
    } else {
      safeToRemove();
    }
  }, [isLiked]);

  return (
    <div className="flex items-center justify-center gap-1 w-fit text-slate-600">
      <Button
        onClick={onLike}
        variant={"ghost"}
        className="rounded-full p-1 h-10 w-10 hover:bg-pink-100 hover:text-pink-500"
      >
        <div ref={scope}>
          {isLiked ? (
            <AiFillHeart className="text-xl text-pink-500" />
          ) : (
            <AiOutlineHeart className="text-xl" />
          )}
        </div>
      </Button>
      <span className="text-sm">{LikeIds?.idList.length}</span>
    </div>
  );
};
