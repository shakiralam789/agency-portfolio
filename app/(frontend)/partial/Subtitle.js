import cn from "@/utilities/cn";
import React from "react";

export default function Subtitle({ children, className = "" }) {
  return (
    <h4
      className={cn(
        "text-green-default font-medium uppercase tracking-wide",
        className
      )}
    >
      {children}
    </h4>
  );
}
