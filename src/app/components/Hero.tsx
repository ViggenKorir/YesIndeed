"use client";
import React from "react";
import { useEffect, useState } from "react";

const Hero = () => {
  // Debugging: Log rendering of Hero component
  console.log("Rendering Hero component");
  const fields = { field: "business" }; // Example sector object
  const services = [
    "Branding",
    "Web Design",
    "Marketing",
    "UI/UX Design",
    "Development",
    "Motion Design",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2000); // change every 2 seconds (2000ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-2 px-2 text-center mt-0">
      <h1 className="text-6xl font-bold mb-6 ">
        Need a digital presence for your
        <br />{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-600 transition-all duration-500">
          {services[index]}
        </span>
        ?
      </h1>
      <p className="mb-8 text-gray-700 max-w-xl mx-auto">
        Our Web Development agency helps you grow and succeed online through a
        range of services including website development, Search Engine
        Optimization (SEO), PPC (Pay-Per-Click) advertiHerosing, social media
        marketing, and e-mail marketing.
      </p>
      <button className="bg-[rgba(130, 182, 62, 0.9)] text-black border px-16 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border hover:animate-pulse">
        Book a consultation
      </button>
      <button className="bg-[rgba(130, 182, 62, 0.9)] text-black border px-16 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border ml-7.5 animate-bounce ">
        Get a quotation
      </button>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
        <p>Our Clients:</p>
        {[
          "Products",
          "Solutions",
          "Resources",
          "Enterprise",
          "Pricing",
          "business",
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
