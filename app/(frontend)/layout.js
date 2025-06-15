"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "./partial/Navbar";
import FooterSection from "./partial/FooterSection";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smooth: true,
      smoothTouch: false, // Disable for better mobile nested scrolling
      touchMultiplier: 2,
      lerp: 0.1,
      // Prevent Lenis from handling events on nested scrollable elements
      prevent: (node) => {
        // Check if the node or its parents have overflow scroll/auto
        while (node && node !== document.body) {
          const style = window.getComputedStyle(node);
          if (
            style.overflowY === 'scroll' ||
            style.overflowY === 'auto' ||
            style.overflowX === 'scroll' ||
            style.overflowX === 'auto' ||
            node.hasAttribute('data-lenis-prevent') ||
            node.classList.contains('lenis-prevent')
          ) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }
    });

    lenisRef.current = lenis;

    // Make lenis accessible globally
    window.lenis = lenis;

    // Handle ScrollTrigger integration
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ticker configuration
    gsap.ticker.lagSmoothing(0);

    // Handle nested scrollable elements
    const handleNestedScroll = (e) => {
      const target = e.target;
      const scrollableParent = target.closest('[data-lenis-prevent], .lenis-prevent');
      if (scrollableParent) {
        // Stop Lenis from interfering with nested scrolling
        e.stopPropagation();
      }
    };

    // Add event listeners for nested scroll handling
    document.addEventListener('wheel', handleNestedScroll, { passive: false });
    document.addEventListener('touchstart', handleNestedScroll, { passive: false });
    document.addEventListener('touchmove', handleNestedScroll, { passive: false });

    // Handle window resize
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      document.removeEventListener('wheel', handleNestedScroll);
      document.removeEventListener('touchstart', handleNestedScroll);
      document.removeEventListener('touchmove', handleNestedScroll);
      window.removeEventListener("resize", handleResize);
      
      lenis.destroy();
      window.lenis = null;
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="overflow-hidden pt-header-height w-full flex-1 flex flex-wrap">
        <div className="w-full">{children}</div>
      </main>
      <FooterSection />
    </div>
  );
}