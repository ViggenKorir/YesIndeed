"use client";
import React from "react";

const CallToAction = () => (
  <section className="py-10 px-8 bg-gray-100 rounded-xl my-8 text-center grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-2">Let&apos;s make things happen</h2>
      <p className="mb-4 text-gray-700 max-w-xl mx-auto">
        Contact us today to learn more about how our digital marketing services
        can help your business grow and succeed online.
      </p>
      <button
        style={{ margin: "0 auto" }}
        className="bg-black text-white px-6  py-2 w-100 rounded-full font-medium hover:bg-gray-800"
      >
        Get your free proposal
      </button>
    </div>
    <div>
      <aside>
        <img src="/image1.jpg" alt="Sci-Fi Image" className="ml-30 h-100" />
      </aside>
    </div>
  </section>
);

export default CallToAction;
