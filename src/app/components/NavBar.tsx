"use client";
import { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const NavBar = () => {
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-5 z-10 w-290 rounded-full px-4 py-3 transition-all duration-500
        ${
          shadow
            ? "bg-[rgb(255,255,255)] dark:bg-[rgba(203,255,136,0.67)] backdrop-blur-md shadow-md"
            : "bg-transparent backdrop-blur-0 shadow-none"
        }
      `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-black">
          YesIndeed
        </a>
        <div className="flex gap-8 ">
          <a href="#" className="text-black hover:underline hover:animate-bounce">
            Home
          </a>
          <a href="#" className="text-black hover:underline hover:animate-bounce">
            Our Products
          </a>
          <a href="#" className="text-black hover:underline hover:animate-bounce">
            About Us
          </a>
          <a href="#" className="text-black hover:underline hover:animate-bounce">
            Contact Us
          </a>
          <a href="#" className="text-black hover:underline hover:animate-bounce">
            Pricing
          </a>
        </div>
        <ClerkProvider>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkProvider>
      </div>
    </nav>
  );
};

export default NavBar;
