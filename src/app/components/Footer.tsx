"use client";
import React from "react";

const Footer = () => (
  <footer className="bg-black text-white py-10 px-8 rounded-t-4xl mt-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-bold text-lg mb-2">YesIndeed</h3>
        <p className="text-gray-400 text-sm mb-4">
          We are a team of passionate developers and designers who are dedicated
          to creating innovative and user-friendly products. Our mission is to
          help businesses and individuals achieve their goals by providing the
          best possible solutions.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Company</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>
            <a href="#" className="hover:text-lime-400">
              About us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Blog
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Services</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>
            <a href="#" className="hover:text-lime-400">
              AI SEO
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Web Development
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Motion Graphics
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-lime-400">
              Social Media Marketing + Analytics
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Contact</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>
            <a href="https://www.yesindeed.com" className="hover:text-lime-400">
              www.yesindeed.com
            </a>
          </li>
          <li>
            Email:{" "}
            <a href="mailto:info@wizardz.com" className="hover:text-lime-400">
              info@wizardz.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+254721164181" className="hover:text-lime-400">
              +254 721 164 181
            </a>
          </li>
          <li>Location: Nairobi, Kenya</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} Viggen Inc. All rights reserved.
    </div>
  </footer>
);

export default Footer;
