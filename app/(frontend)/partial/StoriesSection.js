"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StatsSection() {
  const sectionRef = useRef(null);
  const countWrapperRefs = useRef([]);
  
  // Ensure all numbers are displayed as at least double digits
  const stats = [
    { value: "10", label: "Team" },
    { value: "310", label: "Projects" },
    { value: "08", label: "Years" },  // Already formatted as 08
    { value: "20", label: "Industries" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a high-performance GSAP context for better rendering
    const ctx = gsap.context(() => {
      // Set up the scroll trigger with optimal settings
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%", // Trigger slightly earlier for better perceived performance
        onEnter: () => {
          // Stagger the start times slightly for a more natural flow
          countWrapperRefs.current.forEach((wrapper, index) => {
            if (!wrapper) return;
            
            // Get elements
            const numElement = wrapper.querySelector('.stat-num');
            const plusElement = wrapper.querySelector('.stat-plus');
            
            if (!numElement || !plusElement) return;
            
            // Parse the target value
            const targetValue = parseInt(stats[index].value);
            
            // Calculate optimal duration based on number size - tuned for smoothness
            const baseDuration = 0.9; // Fast base duration
            const durationScaleFactor = 0.3; // Additional time for emphasis on small numbers
            
            // Weighted duration calculation for optimal visual rhythm
            let duration = baseDuration;
            if (targetValue <= 10) {
              duration += durationScaleFactor * 2.5;
            } else if (targetValue <= 30) {
              duration += durationScaleFactor * 2;
            } else if (targetValue <= 100) {
              duration += durationScaleFactor * 1.5;
            } else {
              duration += durationScaleFactor * 0.8;
            }
            
            // Temporary counter object
            const counter = { value: 0 };
            
            // Add a tiny random delay to create natural staggering
            const randomDelay = index * 0.15 + (Math.random() * 0.1);
            
            // MAIN ANIMATION: Count up with high-performance settings
            gsap.to(counter, {
              value: targetValue,
              duration: duration,
              delay: randomDelay,
              ease: "power2.out", // Perfect balance of smoothness and character
              
              // High-frequency updates for buttery smooth counting
              onUpdate: () => {
                // Format the number to ensure always double digits
                const currentValue = Math.floor(counter.value);
                numElement.textContent = formatNumberWithDoubleDigits(currentValue, stats[index].value);
              },
              
              onComplete: () => {
                // Always show the exact format specified in the stats array
                numElement.textContent = stats[index].value;
                
                // PLUS SIGN ANIMATION: Elegant fade in with subtle motion
                gsap.fromTo(plusElement, 
                  { 
                    opacity: 0, 
                    scale: 0.7, 
                    x: -3 
                  },
                  { 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    duration: 0.35, 
                    ease: "back.out(1.4)",
                    onComplete: () => {
                      // Add a subtle pulse effect for emphasis
                      gsap.to(plusElement, {
                        scale: 1.15,
                        duration: 0.15,
                        yoyo: true,
                        repeat: 1,
                        ease: "sine.inOut"
                      });
                    }
                  }
                );
              }
            });
          });
        },
        once: true
      });
    });
    
    // Helper function to ensure double-digit formatting
    function formatNumberWithDoubleDigits(num, originalFormat) {
      // Check if the original format has a leading zero
      const hasLeadingZero = originalFormat.startsWith('0');
      
      // For single-digit numbers
      if (num < 10) {
        return hasLeadingZero ? `0${num}` : `${num}`;
      }
      
      // For double digits and above
      return num.toString();
    }
    
    // Clean up all animations on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stories" className="py-20 px-4 text-center relative">
      <div className="container">
        <h2 className="font-48 font-bold text-primary-dark mb-12">
          Our Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-[32px] border-2 border-primary-dark/70 shadow-md p-6 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex flex-col justify-center border h-full border-gray-400 px-2 py-8 2xl:py-12 rounded-3xl">
                <h3 className="text-6xl 2xl:text-7xl font-bold text-gray-800 leading-tight">
                  <div 
                    ref={el => (countWrapperRefs.current[idx] = el)}
                    className="flex items-center justify-center relative"
                  >
                    <span className="stat-num will-change-contents">0</span>
                    <span className="stat-plus text-green-default opacity-0 will-change-transform will-change-opacity">+</span>
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