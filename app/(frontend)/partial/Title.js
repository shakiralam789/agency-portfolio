import cn from "@/utilities/cn";
import React from "react";

export default function Title({ children, className="" }) {
  return (
    <h2 className={cn("font-extrabold font-48 text-primary-dark", className)}>
      {children}
    </h2>
  );
}
