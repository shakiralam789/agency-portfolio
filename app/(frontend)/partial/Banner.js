"use client";
// app/page.js
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Button from "@/components/form/Button";

export default function Banner() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(taglineRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        titleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        descriptionRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

    // Animate blobs
    gsap.to(blob1Ref.current, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none",
    });

    gsap.to(blob2Ref.current, {
      rotation: -360,
      duration: 100,
      repeat: -1,
      ease: "none",
    });

    // Parallax effect on scroll
    gsap.to([blob1Ref.current, blob2Ref.current], {
      yPercent: 30,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-header-height relative min-h-screen w-full overflow-hidden flex items-center bg-gradient-to-br from-blue-50 via-pink-50 to-green-50"
    >
      <div
        ref={blob1Ref}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-200/30 to-blue-200/30 blur-3xl"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-200/30 to-yellow-200/30 blur-3xl"
      />

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        {/* Subtle tag line */}
        <div ref={taglineRef} className="inline-block mb-6">
          <span className="font-20 text-green-default font-medium uppercase tracking-wider">
            CRAFTING INTUITIVE
          </span>
        </div>

        {/* Main headline - outlined text */}
        <h1
          ref={titleRef}
          className="font-bold md:mb-2 font-90 text-transparent"
          style={{
            WebkitTextStroke: "1px #333",
            letterSpacing: "0em",
          }}
        >
          User-centered designs
        </h1>

        {/* Second headline - solid text */}
        <h2
          ref={subtitleRef}
          className="font-bold text-primary-dark mb-4 md:mb-6 font-90 leading-tight tracking-tight"
        >
          that drive Results
        </h2>

        {/* Descriptive text */}
        <p
          ref={descriptionRef}
          className="text-gray-700 max-w-2xl mx-auto mb-10 md:mb-12 font-20"
        >
          Nuehva Medium design seamless digital experiences that engage users
          and grow your business
        </p>

        {/* CTA Button */}
        <Button>
          <span>Contact us</span>
        </Button>
      </div>
    </section>
  );
}
