import React from "react";
import Navbar from "./partial/Navbar";
import FooterSection from "./partial/FooterSection";

export default function layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="w-full flex-1 flex flex-wrap">
        <div className="w-full">{children}</div>
      </main>
      <FooterSection />
    </div>
  );
}
