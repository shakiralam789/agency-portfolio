import React from "react";
import Navbar from "./partial/Navbar";
import FooterSection from "./partial/FooterSection";
import { generateMetadata } from "@/utilities/metaData";
export const metadata = () => generateMetadata({ title: "Home" });

export default function layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="pt-header-height w-full flex-1 flex flex-wrap">
        <div className="w-full">{children}</div>
      </main>
      <FooterSection />
    </div>
  );
}
