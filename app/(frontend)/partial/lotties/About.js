"use client";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutSectionLottie from "@/lotties/about.json";
import cn from "@/utilities/cn";

gsap.registerPlugin(ScrollTrigger);

export default function AboutLottie({ className }) {
  const lottieRef = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !lottieRef.current) return;

    const anim = lottieRef.current;
    anim.stop();

    let isPlaying = false;

    const trigger = ScrollTrigger.create({
      trigger: "#about",
      start: "top 80%",
      onEnter: () => {
        if (!isPlaying) {
          isPlaying = true;
          anim.stop();
          anim.play();
        }
      },
      onEnterBack: () => {
        if (!isPlaying) {
          isPlaying = true;
          anim.stop();
          anim.play();
        }
      },
      onLeave: () => {
        isPlaying = false;
      },
      onLeaveBack: () => {
        isPlaying = false;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={cn("w-full h-full", className)} style={{ minHeight: 300 }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={aboutSectionLottie}
        loop={false}
        autoplay={false}
      />
    </div>
  );
}
