import React from "react";
import cn from "@/utilities/cn";

export default function ClockIcon({className=""}) {
  return (
    <svg
      className={cn(`size-4 2xl:size-5`,className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C4.48 20 0 15.53 0 10C0 4.48 4.48 0 10 0C15.53 0 20 4.48 20 10C20 15.53 15.53 20 10 20ZM13.19 13.71C13.31 13.78 13.44 13.82 13.58 13.82C13.83 13.82 14.08 13.69 14.22 13.45C14.43 13.1 14.32 12.64 13.96 12.42L10.4 10.3V5.68C10.4 5.26 10.06 4.93 9.65 4.93C9.24 4.93 8.9 5.26 8.9 5.68V10.73C8.9 10.99 9.04 11.23 9.27 11.37L13.19 13.71Z"
      ></path>
    </svg>
  );
}
