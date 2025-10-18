"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, ShieldCheck, UserCheck } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const SignIn = () => {
  const searchParams = useSearchParams();
  // Get the redirect URL from query params, default to dashboard
  const redirectUrl = searchParams.get("redirect") || "/quote";
  return (
    <section className="py-12 px-6 text-center flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-900 to-green-600 mb-6">
            <Lock className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-600">
            Authentication Required
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-gray-700 max-w-xl mx-auto text-lg"
        >
          You need to sign in to access this page.
          <br />
          Please log in or create an account to continue.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/*<Link href="/">
            <button className="text-black border border-gray-300 px-12 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300 inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return Home
            </button>
          </Link>*/}

          <SignInButton
            mode="redirect"
            // redirectUrl={redirectUrl}
            forceRedirectUrl={redirectUrl}
          >
            <button className="border border-transparent px-12 py-4 rounded-full font-medium bg-gradient-to-r from-green-900 to-green-600 text-white hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Sign In
            </button>
          </SignInButton>

          <SignUpButton
            mode="redirect"
            // redirectUrl={redirectUrl}
            forceRedirectUrl={redirectUrl}
          >
            <button className="border border-green-600 px-12 py-4 rounded-full font-medium text-green-900 hover:bg-green-50 transition-all duration-300">
              Create Account
            </button>
          </SignUpButton>
        </div>

        {/*</div>*/}

        {/*<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-12 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why Sign In?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Secure Access
              </h4>
              <p className="text-sm text-gray-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Save Progress
              </h4>
              <p className="text-sm text-gray-600">
                Access your quotes and invoices anytime, anywhere
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Fast Generation
              </h4>
              <p className="text-sm text-gray-600">
                AI-powered quotes and invoices in seconds
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6"
        >
          <p className="text-gray-600 font-medium">Protected Features:</p>
          {[
            "Invoice Management",
            "Quote Generator",
            "Client Portal",
            "Analytics Dashboard",
          ].map((feature) => (
            <span
              key={feature}
              className="text-gray-700 text-sm font-semibold px-4 py-2 bg-gray-100 rounded-full"
            >
              {feature}
            </span>
          ))}
        </motion.div>*/}

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

export default SignIn;
