"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Lock, UserCheck } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const SignInContent = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirect") || "/quote";

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
          <SignInButton mode="redirect" forceRedirectUrl={redirectUrl}>
            <button className="border border-transparent px-12 py-4 rounded-full font-medium bg-gradient-to-r from-green-900 to-green-600 text-white hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="redirect" forceRedirectUrl={redirectUrl}>
            <button className="border border-green-600 px-12 py-4 rounded-full font-medium text-green-900 hover:bg-green-50 transition-all duration-300">
              Create Account
            </button>
          </SignUpButton>
        </div>

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

const SignInPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
