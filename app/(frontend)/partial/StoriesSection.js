"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import StoriesLottie from "./lotties/Stories";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const countWrapperRefs = useRef([]);
  const lottieRefs = useRef([]);

  // Ensure all numbers are displayed as at least double digits
  const stats = [
    { value: "10", label: "Team" },
    { value: "310", label: "Projects" },
    { value: "08", label: "Years" }, // Already formatted as 08
    { value: "20", label: "Industries" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Create main timeline for section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom bottom",
        toggleActions: "play none none none",

        // scrub: 1,
      },
    });

    // Animate title and grid
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
      }
    );

    tl.fromTo(
      gridRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
      },
      "<+=0.2"
    );

    // Create separate timeline for counter animations that only runs once
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => {
        countWrapperRefs.current.forEach((wrapper, index) => {
          if (!wrapper) return;

          const numElement = wrapper.querySelector(".stat-num");
          const plusElement = wrapper.querySelector(".stat-plus");
          if (!numElement || !plusElement) return;

          const targetValue = parseInt(stats[index].value);
          const counter = { value: 0 };
          const delay = index * 0.15;

          gsap.to(counter, {
            value: targetValue,
            duration: 1.5,
            delay,
            ease: "power2.out",
            onUpdate: () => {
              const currentValue = Math.floor(counter.value);
              numElement.textContent = formatNumberWithDoubleDigits(
                currentValue,
                stats[index].value
              );
            },
            onComplete: () => {
              numElement.textContent = stats[index].value;
              gsap.fromTo(
                plusElement,
                {
                  opacity: 0,
                  x: -3,
                },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.35,
                  ease: "back.out(1.4)",
                }
              );
            },
          });
        });
      },
      once: true,
    });

    return () => {
      if (ScrollTrigger.getAll().length) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  // Helper function to ensure double-digit formatting
  function formatNumberWithDoubleDigits(num, originalFormat) {
    // Check if the original format has a leading zero
    const hasLeadingZero = originalFormat.startsWith("0");

    // For single-digit numbers
    if (num < 10) {
      return hasLeadingZero ? `0${num}` : `${num}`;
    }

    // For double digits and above
    return num.toString();
  }

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="py-16 md:py-24 px-4 text-center relative"
    >
      <div className="container">
        <h2
          ref={titleRef}
          className="font-48 font-extrabold text-primary-dark mb-12"
        >
          Our Stories
        </h2>
        <div
          ref={gridRef}
          className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <Image
            className="w-36 absolute top-1/2 -left-8 -translate-y-1/2"
            src={"/images/stories/stories-left.png"}
            alt="stories"
            width={400}
            height={400}
          />
          <Image
            className="w-36 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={"/images/stories/stories-blur-middle.png"}
            alt="stories"
            width={400}
            height={400}
          />
          <Image
            className="w-36 absolute top-1/2 -right-8 -translate-y-1/2"
            src={"/images/stories/stories-right.png"}
            alt="stories"
            width={400}
            height={400}
          />
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="card mx-auto max-w-[400px] w-full relative aspect-square transform transition-transform duration-300"
            >
              <div className="absolute flex items-center justify-center top-0 left-2 w-full h-full pointer-events-none">
                <StoriesLottie
                  onRef={(ref) => (lottieRefs.current[idx] = ref)}
                  delay={idx * 0.8}
                />
              </div>
              <div className="relative flex flex-col justify-center h-full py-8 2xl:py-12">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]">
                  <Image
                    src={"/images/stories/rectangle-5.png"}
                    width={400}
                    height={400}
                    alt={"unit"}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-6xl 2xl:text-7xl font-bold text-gray-800 leading-tight">
                  <div
                    ref={(el) => (countWrapperRefs.current[idx] = el)}
                    className="flex items-center justify-center relative"
                  >
                    <span className="stat-num will-change-contents">0</span>
                    <span className="stat-plus text-green-default opacity-0 will-change-transform will-change-opacity">
                      +
                    </span>
                  </div>
                </h3>
                <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
