"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Phone,
  HelpCircle,
} from "lucide-react";

const SupportPage = () => {
  const supportEmail = "koriremanuel0@gmail.com";
  const supportSubject = "Support Request";

  const handleEmailSupport = () => {
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(supportSubject)}`;
  };

  const supportTopics = [
    {
      icon: HelpCircle,
      title: "Getting Started",
      description:
        "Learn how to use our platform and generate your first quote",
      color: "blue",
    },
    {
      icon: MessageSquare,
      title: "Technical Issues",
      description: "Report bugs or technical problems you're experiencing",
      color: "purple",
    },
    {
      icon: Mail,
      title: "Billing & Payments",
      description: "Questions about invoices, payments, or subscription",
      color: "green",
    },
    {
      icon: Phone,
      title: "General Inquiries",
      description: "Any other questions or feedback about our services",
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      green: "bg-green-100 text-green-600",
      orange: "bg-orange-100 text-orange-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="min-h-screen py-12 px-6 text-center flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-900 to-green-600 mb-6">
            <MessageSquare className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-600">
            We're Here to Help
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-gray-700 max-w-xl mx-auto text-lg"
        >
          Have questions or need assistance?
          <br />
          Our support team is ready to help you succeed.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/">
            <button className="text-black border border-gray-300 px-12 py-4 rounded-full font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300 inline-flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return Home
            </button>
          </Link>

          <button
            onClick={handleEmailSupport}
            className="border border-transparent px-12 py-4 rounded-full font-medium bg-gradient-to-r from-green-900 to-green-600 text-white hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 hover:cursor-pointer"
          >
            <Mail className="h-5 w-5" />
            Email Support
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto mb-12 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            How Can We Assist You?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  onClick={handleEmailSupport}
                  className="flex flex-col items-start text-left p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${getColorClasses(topic.color)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-green-900 to-green-600 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-12 text-white"
        >
          <h3 className="text-2xl font-semibold mb-4">Quick Contact Info</h3>
          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 flex-shrink-0" />
              <a
                href={`mailto:${supportEmail}`}
                className="hover:underline break-all"
              >
                {supportEmail}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <span>Average response time: 24 hours</span>
            </div>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              <span>Available Monday - Friday, 9AM - 6PM EAT</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>
            Prefer live chat?{" "}
            <Link
              href="/waitlist"
              className="text-green-600 hover:underline font-medium"
            >
              Join our waitlist
            </Link>{" "}
            for early access to chat support
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportPage;
