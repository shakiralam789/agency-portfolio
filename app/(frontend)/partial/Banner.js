"use client";
import { useEffect, useRef } from "react";
import Button from "@/components/form/Button";
import OutlinedHeading from "@/components/OutlinedHeading";
import gsap from "gsap";
import Image from "next/image";
import { loadingPromise } from "@/components/animation/LoadingSpin";

export default function Banner() {
  const bannerRef = useRef(null);
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const bgGradient1Ref = useRef(null);
  const bgGradient2Ref = useRef(null);

  useEffect(() => {
    const startAnimation = async () => {
      // Wait for loading to complete
      await loadingPromise;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(
        [
          taglineRef.current,
          headingRef.current,
          subheadingRef.current,
          descriptionRef.current,
          buttonsRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set([bgGradient1Ref.current, bgGradient2Ref.current], {
        opacity: 0,
        scale: 0.8,
      });

      // Background gradients animation
      tl.to([bgGradient1Ref.current, bgGradient2Ref.current], {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
      });

      // Tag line animation
      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.8"
      );

      // Main heading animation
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

      // Subheading animation
      tl.to(
        subheadingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

      // Description animation
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

      // Buttons animation
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      );
    };

    startAnimation();

    // Cleanup function
    return () => {
      gsap.killTweensOf([
        taglineRef.current,
        headingRef.current,
        subheadingRef.current,
        descriptionRef.current,
        buttonsRef.current,
        bgGradient1Ref.current,
        bgGradient2Ref.current,
      ]);
    };
  }, []);

  return (
    <section
      id="home"
      ref={bannerRef}
      className="sm:min-h-[calc(100vh-68px)] relative py-16 w-full overflow-hidden flex items-center bg-gradient-to-br from-blue-50 via-pink-50 to-green-50"
    >
      <div className="w-8/12 sm:w-6/12 2xl:w-5/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          className="w-full"
          src={"/images/colorful-liquid-shapes.png"}
          alt="colorful-liquid"
          width={1000}
          height={1000}
        />
      </div>
      <div
        ref={bgGradient1Ref}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-200/30 to-blue-200/30 blur-3xl"
      />
      <div
        ref={bgGradient2Ref}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-200/30 to-yellow-200/30 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <div ref={taglineRef} className="inline-block mb-6">
          <span className="font-20 text-green-default font-medium uppercase tracking-wider">
            CRAFTING INTUITIVE
          </span>
        </div>

        <div ref={headingRef}>
          <OutlinedHeading className="font-90">
            Designing Digital
          </OutlinedHeading>
        </div>

        <h2
          ref={subheadingRef}
          className="font-bold text-primary-dark mb-4 md:mb-6 font-90 leading-tight tracking-tight"
        >
          Experiences that Delight
        </h2>

        <p
          ref={descriptionRef}
          className="text-gray-700 max-w-2xl mx-auto mb-10 md:mb-12 font-20"
        >
          We craft beautiful, intuitive, and scalable user interfaces that
          elevate your product and connect deeply with your users.
        </p>

        <div ref={buttonsRef} className="flex items-center gap-6">
          <Button href="#contact">Start your project</Button>
          <Button variant="stroke" href="#contact">
            View our work
          </Button>
        </div>
      </div>
    </section>
  );
}
