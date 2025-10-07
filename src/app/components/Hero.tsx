"use client";
import React from "react";

const Hero = () => {
  // Debugging: Log rendering of Hero component
  console.log("Rendering Hero component");
  const fields = { field: "business" }; // Example sector object

  return (
    <section className="py-0 px-2 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Need a digital presence for your {fields.field}?
      </h1>
      <p className="mb-8 text-gray-700 max-w-xl mx-auto">
        Our Web Development agency helps you grow and succeed online through a
        range of services including website development, Search Engine
        Optimization (SEO), PPC (Pay-Per-Click) advertising, social media
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
