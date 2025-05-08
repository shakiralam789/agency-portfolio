// components/FooterSection.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
const FooterSection = () => {
  return (
    <footer className="bg-white py-12 px-4 md:px-8">
      <div className="container">
        {/* Top section with logo and tagline */}

        {/* Footer navigation menu */}
        <div className="grid grid-cols-12 gap-4">
          <div className="text-center sm:text-left col-span-12 lg:col-span-5">
            <div className="mb-10">
              <Link href="/" className="inline-block mb-3">
                <Logo />
              </Link>
              <p className="def-para sm:max-w-md">
                An AI-powered support ecosystem built to give your users an
                outstanding customer experience - on autopilot.
              </p>
            </div>

            {/* Social icons */}
            <div className="justify-center sm:justify-start flex mb-10 space-x-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12">
            <div>
              <h3 className="font-20 font-medium text-gray-800 mb-4">
                Products
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/home"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-20 font-medium text-gray-800 mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/inventory-management"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/invoice-system"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Invoice System
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mvp-apps"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    MVP Apps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hybrid-software"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Hybrid Software
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-20 font-medium text-gray-800 mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/data-processing"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Data Processing Agreement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brand-kit"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Brand Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10">
          <p className="text-center sm:text-left text-gray-600 text-sm">
            <span className="text-green-500 font-16">Nuehva Medium</span> © 2024
            - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
