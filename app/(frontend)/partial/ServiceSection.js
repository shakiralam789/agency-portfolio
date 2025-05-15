"use client";
import { useEffect, useRef } from "react";
import Button from "@/components/form/Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ServiceCard = ({ title, imageSrc, alt }) => {
  return (
    <div className="service-card bg-black bg-opacity-5 rounded-xl p-8 flex flex-col justify-between items-center hover:shadow-lg min-w-[280px] mx-3 h-[350px]">
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
      imageSrc: "/images/cloud-sass.png",
      alt: "AI Model",
    },
    {
      id: 6,
      title: "Enterprise Software Solutions",
      imageSrc: "/images/cloud-sass.png",
      alt: "Cloud and SaaS illustration",
    },
    {
      id: 7,
      title: "UI Animation (2D+3D)",
      imageSrc: "/images/cloud-sass.png",
      alt: "UI Animation (2D+3D)",
    },
    {
      id: 8,
      title: "QA Testing & Maintenance",
      imageSrc: "/images/cloud-sass.png",
      alt: "QA Testing & Maintenance",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const nextSection =
        document.querySelector("#services").nextElementSibling;

      // Adjust height and position of container after measurements
      const adjustLayout = () => {
        if (headerRef.current && triggerRef.current) {
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
            400
          )}px`;

          // Calculate the ideal top position to vertically center the cards in the available space
          // without leaving too much space between header and cards
          const cardHeight =
            document.querySelector(".service-card").offsetHeight;
          const topSpace = Math.max((availableHeight - cardHeight) / 4, 20); // Use 1/4 of remaining space as top padding

          cardsContainerRef.current.style.paddingTop = `${topSpace}px`;
        }
      };

      // Initial adjustment
      setTimeout(adjustLayout, 100); // Small delay to ensure DOM elements are fully rendered

      // Update on window resize
      window.addEventListener("resize", adjustLayout);

      // Calculate the total width of all cards
      let cards = gsap.utils.toArray(".service-card");
      let totalWidth = 0;

      cards.forEach((card) => {
        totalWidth +=
          card.offsetWidth +
          parseInt(window.getComputedStyle(card).marginLeft) +
          parseInt(window.getComputedStyle(card).marginRight);
      });

      // Simple horizontal scroll animation - no centering
      const horizontalScroll = gsap.to(cardsContainerRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top+=68", // Adjust for 68px navbar
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // When scrolled to the end, scroll to the next section
            if (self.progress > 0.95 && nextSection) {
              if (!self._nextSectionTriggered) {
                self._nextSectionTriggered = true;

                // Get the position of the next section relative to the document
                const nextSectionTop =
                  nextSection.getBoundingClientRect().top + window.scrollY;

                // Smooth scroll to that position
                window.scrollTo({
                  top: nextSectionTop,
                  behavior: "smooth",
                });
              }
            }
          },
        },
      });

      return () => {
        // Clean up ScrollTrigger when component unmounts
        if (horizontalScroll.scrollTrigger) {
          horizontalScroll.scrollTrigger.kill();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Remove resize listener
        window.removeEventListener("resize", adjustLayout);
      };
    }
  }, []);

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
    </section>
  );
};

export default ServicesSection;
