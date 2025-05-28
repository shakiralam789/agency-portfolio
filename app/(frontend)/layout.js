"use client";

import React, { useEffect } from "react";
import Navbar from "./partial/Navbar";
import FooterSection from "./partial/FooterSection";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // easing: (t) => {
      //   const c1 = 1.70158;
      //   const c3 = c1 + 1;
      //   return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      // },
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    // Make lenis accessible globally
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    // Handle window resize
    const resize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", resize);

    return () => {
      lenis.destroy();
      window.removeEventListener("resize", resize);
      window.lenis = null;
    };
  }, []);

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
