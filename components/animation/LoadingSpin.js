"use client";

import { useState, useEffect } from "react";

const loaderLogo = "/images/gif/logo.gif";

// Create a promise that resolves when loading is complete
let resolveLoading;
export const loadingPromise = new Promise((resolve) => {
  resolveLoading = resolve;
});

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
      resolveLoading(true); // Resolve the promise when loading is complete
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`z-[999] flex items-center justify-center bg-white fixed w-full inset-0 h-screen transition-opacity duration-500 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src={loaderLogo}
        alt="Loading..."
        className="w-56"
        style={{ 
          imageRendering: '-webkit-optimize-contrast',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
}
