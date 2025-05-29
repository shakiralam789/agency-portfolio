"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/form/Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ServiceCard = ({ title, imageSrc, alt }) => {
  return (
    <div className="relative service-card p-6 2xl:p-8 flex flex-col justify-between items-center min-w-[280px] mx-3">
     
        <Image
          src={imageSrc}
          alt={alt}
          width={180}
          height={180}
          className="mb-6 h-36 w-11/12 mx-auto block"
        />
      <h3 className="text-primary-dark font-18 font-bold text-center">
        {title}
      </h3>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          className="w-full h-full"
          src={"/images/testimonial/testimonial-card-bg.png"}
          alt="Map"
          width={1920}
          height={1080}
        />
      </div>
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
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const nextSection =
        document.querySelector("#services")?.nextElementSibling;

      // Set initial state for header
      gsap.set(headerRef.current, {
        opacity: 0,
        y: 100
      });

      // Animate header when entering viewport
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 60%",
          toggleActions: "play none none none"
        }
      });

      const setupScroll = () => {
        const cards = gsap.utils.toArray(".service-card");
        const servicesContainer = document.getElementById("services-container");
        const cardWidth = cards[0].offsetWidth + 24; // Including margin
        const totalWidth = cardWidth * cards.length;
        const scrollDistance = totalWidth - servicesContainer.offsetWidth + 200;

        // Pin the background separately
        ScrollTrigger.create({
          trigger: "#services",
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: "#service-bg",
          pinSpacing: false
        });

        // Animate cards to center
        gsap.to(cardsContainerRef.current, {
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top center",
            toggleActions: "play none none reverse"
          }
        });

        // Horizontal scroll animation
        gsap.to(cardsContainerRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "center center",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Check if last card is fully visible
              const lastCard = cards[cards.length - 1];
              const lastCardRect = lastCard.getBoundingClientRect();
              const isLastCardVisible = lastCardRect.right <= window.innerWidth;
              const isScrollingForward = self.direction > 0;

              if (
                isLastCardVisible &&
                isScrollingForward &&
                !self._nextSectionTriggered &&
                nextSection
              ) {
                self._nextSectionTriggered = true;
                setTimeout(() => {
                  window.scrollTo({
                    top: nextSection.offsetTop,
                    behavior: "smooth",
                  });
                }, 500);
              } else if (!isLastCardVisible || !isScrollingForward) {
                self._nextSectionTriggered = false;
              }
            },
          },
        });
      };

      setupScroll();

      window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, [cardHeight]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div id="service-bg" className="absolute top-0 left-0 w-full h-screen">
        <Image
          src={"/images/service-bg.jpg"}
          alt="Service Background"
          width={3840}
          height={2160}
          className="w-full h-full object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      <div id="services-container" className="relative z-10 container">
        <div
          className="flex flex-wrap items-end justify-between mb-8"
          ref={headerRef}
        >
          <div className="w-full sm:w-8/12 lg:w-1/2">
            <p className="text-green-default font-20 font-medium mb-2">
              OUR SERVICES
            </p>
            <h2 className="font-48 text-primary-dark font-extrabold">
              Our Featured Digital  <br/>Services
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href="#contact">Start your project</Button>
          </div>
        </div>

        <div ref={triggerRef} className="overflow-hidden">
          <div ref={cardsContainerRef} className="flex">
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
