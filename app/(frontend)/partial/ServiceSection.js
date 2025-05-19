"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/form/Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ServiceCard = ({ title, imageSrc, alt }) => {
  return (
    <div className="service-card bg-black bg-opacity-5 rounded-xl p-8 flex flex-col justify-between items-center hover:shadow-lg transition-shadow min-w-[280px] mx-3">
      <div className="mb-6 h-36 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={alt}
          width={180}
          height={180}
          className="w-11/12 mx-auto"
        />
      </div>
      <h3 className="text-primary-dark font-18 font-semibold text-center">
        {title}
      </h3>
    </div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const triggerRef = useRef(null);
  const headerRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(350);

  const services = [
    {
      id: 1,
      title: "UI/UX Design",
      imageSrc: "/images/ui-ux.png",
      alt: "UI/UX Design illustration",
    },
    {
      id: 2,
      title: "Web Design & Development",
      imageSrc: "/images/web-design.png",
      alt: "Web Design illustration",
    },
    {
      id: 3,
      title: "App Development",
      imageSrc: "/images/app-development.png",
      alt: "App Development illustration",
    },
    {
      id: 4,
      title: "Cloud & SaaS Design + Development",
      imageSrc: "/images/cloud-sass.png",
      alt: "Cloud and SaaS illustration",
    },
    {
      id: 5,
      title: "AI Model Train & Machine Learning Integration",
      imageSrc: "/images/ai-model.png",
      alt: "AI Model",
    },
    {
      id: 6,
      title: "Enterprise Software Solutions",
      imageSrc: "/images/enterprise.png",
      alt: "Cloud and SaaS illustration",
    },
    {
      id: 7,
      title: "UI Animation (2D+3D)",
      imageSrc: "/images/ui-animation.png",
      alt: "UI Animation (2D+3D)",
    },
    {
      id: 8,
      title: "QA Testing & Maintenance",
      imageSrc: "/images/qa.png",
      alt: "QA Testing & Maintenance",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const nextSection = document.querySelector("#services")?.nextElementSibling;

      // Function to calculate and set the same height for all cards
      const setUniformCardHeight = () => {
        const cards = document.querySelectorAll(".service-card");
        if (cards.length === 0) return;

        // Reset any previously set height to get natural heights
        cards.forEach(card => {
          card.style.height = "auto";
        });

        // Wait a moment for the DOM to update
        setTimeout(() => {
          // Find the tallest card
          let maxHeight = 0;
          cards.forEach(card => {
            const cardHeight = card.offsetHeight;
            maxHeight = Math.max(maxHeight, cardHeight);
          });

          // Set all cards to the height of the tallest card + a little extra for safety
          const newHeight = maxHeight + 10;
          setCardHeight(newHeight);
          cards.forEach(card => {
            card.style.height = `${newHeight}px`;
          });
        }, 50);
      };

      // Adjust height and position of container after measurements
      const adjustLayout = () => {
        if (headerRef.current && triggerRef.current && cardsContainerRef.current) {
          const viewportHeight = window.innerHeight;
          const navbarHeight = 68; // Your fixed navbar height
          const headerHeight = headerRef.current.offsetHeight;
          const containerPadding =
            parseInt(
              window.getComputedStyle(document.querySelector(".container"))
                .paddingTop
            ) +
            parseInt(
              window.getComputedStyle(document.querySelector(".container"))
                .paddingBottom
            );

          // Calculate available space
          const availableHeight =
            viewportHeight - navbarHeight - headerHeight - containerPadding;

          // Set height based on available space, with a minimum to ensure cards are visible
          triggerRef.current.style.height = `${Math.max(
            availableHeight,
            cardHeight + 80 // Add extra padding
          )}px`;

          // Calculate the ideal top position to vertically center the cards in the available space
          const topSpace = Math.max((availableHeight - cardHeight) / 3, 30);
          cardsContainerRef.current.style.paddingTop = `${topSpace}px`;
          cardsContainerRef.current.style.paddingBottom = `${topSpace}px`;
        }
      };

      // Set uniform card heights first
      setUniformCardHeight();

      // Then adjust layout after cards have their heights set
      setTimeout(adjustLayout, 100);

      // Calculate the total width of all cards plus extra room for the last card
      let cards = gsap.utils.toArray(".service-card");
      let totalWidth = 0;
      let lastCardWidth = 0;

      cards.forEach((card, index) => {
        const cardWidth = card.offsetWidth +
          parseInt(window.getComputedStyle(card).marginLeft) +
          parseInt(window.getComputedStyle(card).marginRight);
        
        totalWidth += cardWidth;
        
        // Save the last card's width
        if (index === cards.length - 1) {
          lastCardWidth = cardWidth;
        }
      });

      // Add sufficient padding to ensure the last card can be fully centered on screen
      // We want to be able to scroll until the last card is in the center/right position
      const extraSpaceForLastCard = Math.max(window.innerWidth - lastCardWidth, window.innerWidth / 2);
      totalWidth += extraSpaceForLastCard;

      // Horizontal scroll animation with increased end buffer
      const horizontalScroll = gsap.to(cardsContainerRef.current, {
        x: () => -(totalWidth - window.innerWidth - 280), // Much larger buffer to ensure full visibility of last card
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top+=68", // Adjust for 68px navbar
          end: () => `+=${totalWidth + 400}`, // Much more space for complete scrolling
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Create a function to check if the last card is fully visible and centered/right-aligned
            const isLastCardFullyAndProperlyVisible = () => {
              const cards = document.querySelectorAll('.service-card');
              if (cards.length === 0) return false;
              
              const lastCard = cards[cards.length - 1];
              const lastCardRect = lastCard.getBoundingClientRect();
              const containerRect = triggerRef.current.getBoundingClientRect();
              const viewportWidth = window.innerWidth;
              
              // Check three conditions:
              // 1. Last card is fully inside the container (not cut off on right)
              const isFullyVisible = lastCardRect.right <= containerRect.right;
              
              // 2. Last card is positioned properly (center to right side) - should occupy right third of screen
              const isProperlyPositioned = lastCardRect.left >= viewportWidth / 3;
              
              // 3. Last card's right edge is close to the container's right edge (not too far left)
              // This ensures the card is "featured" on the right side, not just barely visible
              const isCloseToRightEdge = containerRect.right - lastCardRect.right < 100;
        
              return isFullyVisible && isProperlyPositioned && isCloseToRightEdge;
            };
            
            // Only trigger next section when last card is properly visible and we're near the end of scroll
            if (self.progress > 0.9 && nextSection) {
              const lastCardCheck = isLastCardFullyAndProperlyVisible();
              
              if (lastCardCheck && !self._nextSectionTriggered) {
                self._nextSectionTriggered = true;
                // Longer delay to ensure user has seen the last card before moving on
                setTimeout(() => {
                  // Get the position of the next section relative to the document
                  const nextSectionTop =
                    nextSection.getBoundingClientRect().top + window.scrollY;
  
                  // Smooth scroll to that position
                  window.scrollTo({
                    top: nextSectionTop,
                    behavior: "smooth",
                  });
                }, 800);
              }
            } else if (self.progress < 0.85) {
              // Reset the trigger when scrolling back
              self._nextSectionTriggered = false;
            }
          },
        },
      });

      // Update on window resize
      const handleResize = () => {
        setUniformCardHeight();
        setTimeout(adjustLayout, 100);
        // Force ScrollTrigger to recalculate
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        // Clean up ScrollTrigger when component unmounts
        if (horizontalScroll.scrollTrigger) {
          horizontalScroll.scrollTrigger.kill();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Remove resize listener
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [cardHeight]);

  
      // Also modify the component to add a container that ensures visibility of the last card
      return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={"/images/service-bg.jpg"}
          alt="Service Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 container py-16 md:py-24">
        <div
          className="flex flex-col md:flex-row items-end md:justify-between mb-8"
          ref={headerRef}
        >
          <div className="lg:w-1/2">
            <p className="text-green-default font-20 font-medium mb-2">
              OUR SERVICES
            </p>
            <h2 className="font-48 text-primary-dark font-bold">
              Our Featured Digital Services
            </h2>
          </div>

          <div className="mt-6 md:mt-0">
            <Button href="#contact">Contact us</Button>
          </div>
        </div>

        <div ref={triggerRef} className="overflow-hidden">
          {/* Added an inner div with padding to ensure the last card is visible */}
          <div className="pr-[300px]"> {/* Extra padding to ensure last card visibility */}
            <div ref={cardsContainerRef} className="flex flex-nowrap">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  imageSrc={service.imageSrc}
                  alt={service.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;