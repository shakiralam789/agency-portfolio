import { generateMetadata } from "@/utilities/metaData";
import React from "react";
export const metadata = () => generateMetadata({ title: "Privacy Policy" });

export default function Layout({ children }) {
  return <>{children}</>;
}
