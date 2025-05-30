"use client";

import { useState, useEffect } from "react";

const loaderLogo = "/images/gif/logo.gif";

let resolveLoading;
export const loadingPromise = new Promise((resolve) => {
  resolveLoading = resolve;
});

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      const timestamp = new Date().getTime();
      setImageSrc(`${loaderLogo}?t=${timestamp}`);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      setImageLoaded(true);
    };

    img.src = loaderLogo;

    const timer = setTimeout(() => {
      setLoading(false);
      resolveLoading(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`z-[999] flex items-center justify-center bg-white fixed w-full inset-0 h-screen transition-opacity duration-500`}
    >
      {imageLoaded && imageSrc ? (
        <img
          src={imageSrc}
          alt="Loading..."
          className="w-56"
          style={{
            imageRendering: "-webkit-optimize-contrast",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}