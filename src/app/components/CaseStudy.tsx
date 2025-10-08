"use client";
import React from "react";

const cases = [
  {
    text: "For a local restaurant, we implemented a strategy to focus on SEO. This resulted in a 70% increase in traffic and a 25% increase in sales.",
  },
  {
    text: "For a B2B software company, we developed an SEO strategy that led to a 40% increase in organic traffic.",
  },
  {
    text: "For a national retail chain, we implemented a combined SEO and advertising strategy that increased online sales 20%.",
  },
];

const CaseStudy = () => (
  <section className="py-10 px-8">
    <h2 className="px-6 py-3 bg-gradient-to-r from-green-900 to-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
      Case study
    </h2>
    <p className="mb-8 text-gray-700 max-w-xl">
      Explore Real-Life Examples of Our Proven Digital Marketing Success through
      Our Case Studies
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cases.map((c, idx) => (
        <div key={idx} className="rounded-xl p-6 bg-black text-white">
          <p className="mb-4 text-sm">{c.text}</p>
          <a
            href="#"
            className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600 transition-all duration-500"
          >
            Learn more →
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default CaseStudy;
