"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen py-12 px-6 text-center flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-900 to-red-600 mb-6">
            <AlertCircle className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-red-600 mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="text-transparent bg-clip-text bg-black">
              Page Not Found!
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-gray-700 max-w-xl mx-auto text-lg"
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
          <br />
          It might have been moved or deleted.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/">
            <button className="text-black border border-gray-300 px-12 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300 inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </Link>

          <Link href="/">
            <button className="border border-transparent px-12 py-4 rounded-full font-medium bg-gradient-to-r from-green-900 to-green-600 text-white hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>
            Still can&apos;t find what you&apos;re looking for?{" "}
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
}
