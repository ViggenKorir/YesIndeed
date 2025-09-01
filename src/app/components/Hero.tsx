"use client";
import React from "react";

const Hero = () => {
  // Debugging: Log rendering of Hero component
  console.log("Rendering Hero component");
  
  return (
    <section className="py-0 px-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Navigating the digital landscape for success</h1>
      <p className="mb-8 text-gray-700 max-w-xl mx-auto">
        Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.
      </p>
      <button className="bg-[rgba(130, 182, 62, 0.9)] text-black border px-16 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border hover:animate-pulse">
        Book a consultation
      </button>
      <button className="bg-[rgba(130, 182, 62, 0.9)] text-black border px-16 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border ml-7.5 animate-bounce ">
        Get a quotation
      </button>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
        <p>Our Clients:</p>
        {['amazon', 'dribbble', 'HubSpot', 'Notion', 'NETFLIX', 'zoom'].map((brand) => (
          <span key={brand} className="text-gray-500 text-lg font-semibold">{brand}</span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
