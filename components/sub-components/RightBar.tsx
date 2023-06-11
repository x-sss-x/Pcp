"use client";
import React from "react";

export default function RightBar({children}:{children:React.ReactNode}) {

  return (
    <div className="bg-white gap-4 w-full min-h-full h-[100vh] flex flex-col justify-between px-10 border-l border-border py-5 pb-10">
      {children}
    </div>
  );
}
