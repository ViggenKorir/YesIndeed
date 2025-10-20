"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <section className="py-2 px-2 text-center mt-25 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-600">
            Coming Soon
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-gray-700 max-w-xl mx-auto text-lg"
        >
          Sorry! your request is currently unavailable,
          <br />
          We&apos;re working on it. Join Our waitlist to get notified once
          available
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <button className=" text-black border px-16 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border hover:cursor-pointer hover:animate-pulse inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return Home
            </button>
          </Link>
          <Link href="mailing/waitlist">
            <button className="border px-16 py-4 rounded-full font-medium bg-gradient-to-r from-green-900 to-green-600 text-white hover:border-s-stone-950 hover:underline hover:cursor-pointer animate-bounce">
              Join waitlist
            </button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-25"
        >
          <p>Upcoming Updates and Integrations:</p>
          {[
            "Smart Analytics",
            "AI Services",
            "Cloud Solutions",
            "Mobile Apps",
          ].map((brand) => (
            <span key={brand} className="text-gray-500 text-lg font-semibold">
              {brand}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>
            Need help?{" "}
            <Link
              href="/support"
              className="text-green-600 hover:underline font-medium"
            >
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonPage;
