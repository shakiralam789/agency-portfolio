"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/form/Button";
import Title from "./Title";
import Subtitle from "./Subtitle";
import P from "./P";
import AboutAnim from "./lotties/About";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function AboutSection() {
  // Create refs for the elements we want to animate
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Set initial state - both parts are invisible
    gsap.set(textContentRef.current, { 
      opacity: 0,
      x: -50
    });
    
    gsap.set(animationRef.current, { 
      opacity: 0,
      x: 50
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%", // Animation starts when the top of the section hits 75% from the top of the viewport
        end: "bottom bottom",
        toggleActions: "play none none none"
      }
    });

    // Animate both parts fading in
    tl.to(textContentRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out"
    });

    tl.to(animationRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7"); // Start slightly before the first animation ends for a staggered effect

    // Cleanup function
    return () => {
      if (typeof window !== "undefined" && ScrollTrigger.getAll().length) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 bg-[#fcfaf8] overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Text Content */}
          <div ref={textContentRef} className="w-full lg:w-1/2">
            <Subtitle>Why us</Subtitle>
            <Title className="mt-3 mb-8">
              Reason Behind Choosing
              <Image
                className="mt-3 w-36"
                src="/images/logo.png"
                width={1920}
                height={1080}
                alt="logo"
              />
            </Title>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 2xl:gap-3 mb-2">
                  <CheckCircleIcon className="size-5 2xl:size-6" />
                  <div className="text-primary-dark font-semibold font-18">
                    Design-Led Approach
                  </div>
                </div>
                <P className="mb-8">
                  Every pixel we craft serves a purpose—balancing form and
                  function.
                </P>
              </div>
              <div>
                <div className="flex items-center gap-2 2xl:gap-3 mb-2">
                  <CheckCircleIcon className="size-5 2xl:size-6" />
                  <div className="text-primary-dark font-semibold font-18">
                    Agile and Scalable
                  </div>
                </div>
                <P className="mb-8">
                  We adapt to your product needs—startups to enterprises.
                </P>
              </div>
              <div>
                <div className="flex items-center gap-2 2xl:gap-3 mb-2">
                  <CheckCircleIcon className="size-5 2xl:size-6" />
                  <div className="text-primary-dark font-semibold font-18">
                    Client-Centric Collaboration
                  </div>
                </div>
                <P className="mb-8">
                  Transparent, communicative, and responsive from start to
                  finish.
                </P>
              </div>
            </div>

            <Button href="#contact">Contact us</Button>
          </div>
          <div ref={animationRef} className="w-full lg:w-1/2 overflow-hidden">
            <AboutAnim />
          </div>
        </div>
      </div>
    </section>
  );
}