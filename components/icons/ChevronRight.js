import cn from "@/utilities/cn";
import React from "react";

export default function ChevronRight({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
