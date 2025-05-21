"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cn from "@/utilities/cn";

const aboutVideo = "/videos/about.mp4";
gsap.registerPlugin(ScrollTrigger);

export default function AboutAnim({ className = "" }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef === null || !videoRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top 80%",
      end: "bottom top",
      onEnter: () => videoRef.current && videoRef.current.play(),
      onEnterBack: () => videoRef.current && videoRef.current.play(),
      onLeave: () => videoRef.current && videoRef.current.pause(),
      onLeaveBack: () => videoRef.current && videoRef.current.pause(),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="rounded-2xl 2xl:rounded-3xl overflow-hidden w-full bg-white">
      <video
        ref={videoRef}
        src={aboutVideo}
        muted
        playsInline
        className={cn("w-full h-auto -mb-1", className)}
      />
    </div>
  );
}
