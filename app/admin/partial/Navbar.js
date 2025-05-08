"use client";

// components/Navbar.jsx
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/form/Button";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  const navItems = [
    { label: "Home", section: "home" },
    { label: "About Us", section: "about" },
    { label: "Services", section: "services" },
    { label: "Technologies", section: "technologies" },
    { label: "Our Courses", section: "courses" },
  ];

  return (
    <nav className="h-header-height flex items-center fixed top-0 left-0 z-40 w-full bg-white shadow-sm">
      {/* Logo */}
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-16">
          {navItems.map((item) => (
            <a
              key={item.section}
              href={'#'+item.section}
              className={`${
                isActive(item.section)
                  ? "text-green-default font-medium"
                  : "text-gray-700"
              } hover:text-gray-900`}
            >
              {item.label}
            </a>
          ))}
          <Button href={"#contact"}>Contact us</Button>
        </div>

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
          <div className="flex flex-col space-y-3 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.section}
                href={'#'+item.section}
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
            <Button href={"#contact"}>
              Contact us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
