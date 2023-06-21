import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostProps } from "@/store/post.slice";
import moment from "moment";
import Image from "next/image";
import { Button } from "../ui/button";
import { HiOutlineChatBubbleBottomCenter } from "react-icons/hi2";
import { AiFillHeart, AiOutlineHeart, AiOutlineMail } from "react-icons/ai";
import { useUser } from "@/app/UserProvider";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { SupaClient } from "@/utils/supabase";
import { LikeSelector, fetchLike, postLike } from "@/store/like.slice";
import { useAnimate, usePresence } from "framer-motion";
import { JobsProps } from "@/store/jobs.slice";
import { FcOrganization, FcGraduationCap } from "react-icons/fc";
import { HiShoppingBag } from "react-icons/hi";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";

export default function JobPost({ props }: { props: JobsProps }) {
  const {
    User,
    createdAt,
    description,
    experience,
    location,
    qualification,
    salary,
    title,
  } = props;

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
            <h3 className="text-sm text-black font-medium flex gap-1 items-center">
              {props?.User?.name}
              <FcOrganization className="text-lg" /> <span>·</span>
              <span className="text-xs text-gray-500">
                {moment(createdAt).fromNow()}
              </span>
            </h3>
            <span className="text-xs text-slate-600">@{User?.username}</span>
          </div>
        </div>
      </div>

      {/* content area */}
      <div className="px-10 flex flex-col py-3">
        <div className="flex items-center gap-2">
          <h1 className="text-slate-950 font-semibold text-xl ">{title}</h1>
          <HiShoppingBag className="text-2xl text-slate-500" />
          <span>·</span>
          <span className="text-md text-teal-700">
            Salary ₹{salary.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="py-2 px-3 text-slate-700 font-normal w-full text-left tracking-wider text-sm leading-6">
          {description}
        </p>

        <div className="flex flex-col gap-2 mt-3 px-3">
          <h4 className="font-medium flex items-center gap-2">
            Qualification <FcGraduationCap className="text-xl" />
          </h4>
          <p className="text-slate-700 font-normal text-sm">{qualification}</p>
        </div>
        <div className="flex flex-col gap-2 mt-5 px-3">
          <h4 className="font-medium flex items-center gap-2">Experience</h4>
          <p className="text-slate-700 font-normal text-sm">{experience}</p>
        </div>
        <div className="py-5 flex gap-5">
          <span className="flex items-center gap-2">
            <GrLocation className="text-lg" />
            <span className="text-sm">{location}</span>
          </span>
          <span className="flex items-center gap-2">
            <AiOutlineMail className="text-lg" />
            <Link
              href={`${User.email}`}
              className="text-sm hover:text-primary hover:underline"
            >
              {User.email}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
