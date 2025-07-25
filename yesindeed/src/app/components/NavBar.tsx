"use client";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [shadow, setShadow] = useState(false);

const name = "Korir Emmanuel";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-[rgb(255,255,255)] dark:bg-[rgba(203,255,136,0.67)] px-4 py-3 fixed top-5 z-10 w-290 backdrop-blur-md rounded-full ${
        shadow ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-black ml-3.5">
          YesIndeed
        </a>
        <div className="flex gap-6">
          <a href="https://www.icdl.org" className="text-black hover:underline">
            Home
          </a>
          <a href="#" className="text-black hover:underline">
            Our Products
          </a>
          <a href="#" className="text-black hover:underline">
            About Us
          </a>
          <a href="#" className="text-black hover:underline">
            Contact Us
          </a>
          <a href="#" className="text-black hover:underline">
            Pricing
          </a>
        </div>
        <a href="" className="mr-3.5">{name}</a>
      </div>
    </nav>
  );
};

export default NavBar;
