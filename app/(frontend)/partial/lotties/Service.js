"use client";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serviceSectionLottie from "@/lotties/service.json";
import cn from "@/utilities/cn";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceLottie({ className }) {
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
      trigger: "#services",
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
    <Lottie
      lottieRef={lottieRef}
      animationData={serviceSectionLottie}
      loop={true}
      style={{ width: "100%", height: "100%" }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
}
