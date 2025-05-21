"use client";

import { useState, useEffect } from "react";
const loaderLogo = "/images/gif/logo.gif";
export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="z-[999] flex items-center justify-center bg-white fixed w-full inset-0 h-screen">
      <img className={"w-56"} src={loaderLogo} alt="logo" />
      {/* loading... */}
    </div>
  ) : null;
}
