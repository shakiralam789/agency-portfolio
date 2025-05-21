import { generateMetadata } from "@/utilities/metaData";
import React from "react";
export const metadata = () =>
  generateMetadata({ title: "Terms and Conditions" });

export default function Layout({ children }) {
  return <>{children}</>;
}
