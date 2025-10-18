"use client";
import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Hero = () => {
  // Debugging: Log rendering of Hero component
  console.log("Rendering Hero component");
  const services = [
    "Branding",
    "Web Design",
    "AI Services",
    "AI SEO",
    "App Development",
    "App Design",
    "Marketing",
    "UI/UX Design",
    "Development",
    "Motion Design",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 800); // change every 1/2 seconds (800ms)

    return () => clearInterval(interval);
  }, [services.length]);

  const router = useRouter();

  return (
    <section className="py-2 px-2 text-center mt-0">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Your competitive edge starts with
        <br />{" "}
      </motion.h3>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-600 transition-all duration-500">
          {services[index]}
        </span>
        !
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 text-gray-700 max-w-xl mx-auto"
      >
        Our Web Development agency helps you grow and succeed online through a
        range of services including website development, Search Engine
        Optimization (SEO), PPC (Pay-Per-Click) advertising, social media
        marketing, and email marketing.
      </motion.div>
      <button
        onClick={() => router.push("/support")}
        className="bg-[rgba(130, 182, 62, 0.9)] text-black border px-16 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border hover:cursor-pointer hover:animate-pulse"
      >
        Book a consultation
      </button>

      <button
        onClick={() => router.push("/quote")}
        className="border px-16 py-4 rounded-full font-medium bg-gradient-to-r from-green-900 to-green-600 text-white hover:border-s-stone-950 hover:underline hover:cursor-pointer ml-7.5 animate-bounce"
      >
        Get a quotation
      </button>

      <div className="flex flex-wrap justify-center items-center gap-6 mt-8 mb-8">
        <p>Our Clients:</p>
        {[
          "YesIndeed",
          "DesignSpec LTD",
          "Rafiki Partners",
          "Smartistics",
          "BebaSafe",
        ].map((brand) => (
          <span key={brand} className="text-gray-500 text-lg font-semibold">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
