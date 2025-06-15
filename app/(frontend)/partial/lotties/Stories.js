"use client";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import storiesSectionLottie from "@/public/lotties/border-animation.json";

gsap.registerPlugin(ScrollTrigger);

export default function StoriesLottie({ onRef, delay = 0 }) {
  const lottieRef = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !lottieRef.current) return;

    const anim = lottieRef.current;
    // Ensure animation is stopped initially
    anim.stop();
    
    // Pass the ref to parent component
    if (onRef) {
      onRef(lottieRef.current);
    }

    // Create scroll trigger for the section
    const trigger = ScrollTrigger.create({
      trigger: "#stories",
      start: "top 80%",
      onEnter: () => {
        // Start animation after delay when section comes into view
        setTimeout(() => {
          anim.play();
        }, delay * 1000);
      },
      once: true // Only trigger once
    });

    return () => {
      trigger.kill();
    };
  }, [mounted, onRef, delay]);

  if (!mounted) return null;

  return (
    <Lottie
      lottieRef={lottieRef}
      renderer="canvas"
      animationData={storiesSectionLottie}
      loop={false}
      style={{ width: "100%", height: "100%" }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
}
