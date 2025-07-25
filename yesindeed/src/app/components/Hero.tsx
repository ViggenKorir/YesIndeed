"use client";
import React from "react";

const Hero = () => (
  <section className="py-12 px-8 text-center">
    <h1 className="text-3xl font-bold mb-4">Navigating the digital landscape for success</h1>
    <p className="mb-6 text-gray-700 max-w-xl mx-auto">
      Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.
    </p>
    <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800">Book a consultation</button>
    <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
      {['amazon', 'dribbble', 'HubSpot', 'Notion', 'NETFLIX', 'zoom'].map((brand) => (
        <span key={brand} className="text-gray-500 text-lg font-semibold">{brand}</span>
      ))}
    </div>
  </section>
);

export default Hero;
