import cn from "@/utilities/cn";
import React from "react";

export default function P({ children, className = "" }) {
  return <p className={cn("def-para mb-8", className)}>{children}</p>;
}
