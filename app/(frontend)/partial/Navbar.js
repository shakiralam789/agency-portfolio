"use client";

// components/Navbar.jsx
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/form/Button";
import Logo from "@/components/Logo";
import DiscoveryCall from "./BookNow/DiscoveryCall";
import gsap from "gsap";
import { PhoneIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const bookNowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  const navItems = [
    { label: "Home", section: "home" },
    { label: "About Us", section: "about" },
    { label: "Services", section: "services" },
    { label: "Contact Us", section: "contact" },
  ];

  function openBookNow() {
    setIsBookNowOpen(true);
  }

  function closeAnim() {
    document.body.style.overflow = "auto";
    if (bookNowRef.current) {
      gsap.to(bookNowRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => {
          setIsBookNowOpen(false);
        },
      });
    }
  }

  function openAnim() {
    document.body.style.overflow = "hidden";
    if (bookNowRef.current) {
      gsap.fromTo(
        bookNowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power4.out" }
      );
    }
  }

  useEffect(() => {
    if (isBookNowOpen) {
      openAnim();
    } else {
      closeAnim();
    }
  }, [isBookNowOpen]);

  return (
    <nav className="h-header-height flex items-center fixed top-0 left-0 z-40 w-full bg-white shadow-sm">
      {/* Logo */}
      <div className="container py-3 flex items-center justify-between">
        <Link
          href="/"
          className="cursor-pointer flex items-center h-header-height overflow-hidden"
        >
          <Logo className="-ml-9" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-16">
          {navItems.map((item) => (
            <Link
              key={item.section}
              href={"/#" + item.section}
              className={`${
                isActive(item.section)
                  ? "text-green-default font-medium"
                  : "text-gray-700"
              } hover:text-gray-900`}
            >
              {item.label}
            </Link>
          ))}

          <Button onClick={openBookNow} className="flex items-center gap-2">
            <PhoneIcon className="size-4 2xl:size-5" /> <span>Book a call</span>
          </Button>
        </div>
        {isBookNowOpen && (
          <DiscoveryCall
            ref={bookNowRef}
            isBookNowOpen={isBookNowOpen}
            closeAnim={closeAnim}
          ></DiscoveryCall>
        )}

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-10 shadow-md">
          <div className="flex flex-col items-center space-y-3 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.section}
                href={"/#" + item.section}
                className={`${
                  isActive(item.section)
                    ? "text-green-600 font-medium"
                    : "text-gray-700"
                } hover:text-gray-900 py-2 font-16`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={openBookNow} className="flex items-center gap-2">
              <PhoneIcon className="size-4 2xl:size-5" />{" "}
              <span>Book a call</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
