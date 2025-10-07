"use client";
import Link from "next/link";
import { Search, ShoppingCart, Heart, SlidersHorizontal } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 z-20 relative">
      {/* Left: Logo and nav links */}
      <div className="flex items-center gap-8 min-w-fit">
        <span className="font-bold text-2xl tracking-tight select-none">BrandBucket</span>
        <div className="flex items-center gap-4 ml-4">
          <span className="font-semibold text-base">Buy business names:</span>
          <Link href="#" className="text-black text-base font-normal hover:underline">by style</Link>
          <Link href="#" className="text-black text-base font-normal hover:underline">by industry</Link>
        </div>
      </div>

      {/* Center: Search bar */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl flex justify-center">
        <div className="flex items-center bg-[#ececec] rounded-xl px-3 py-1 w-full shadow-sm">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="search business names"
            className="bg-transparent outline-none border-none flex-1 text-base py-2 text-gray-700 placeholder:text-gray-400"
          />
          <SlidersHorizontal size={20} className="text-gray-400 ml-2 cursor-pointer" />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6 min-w-fit">
        <ShoppingCart size={22} className="text-black cursor-pointer" />
        <Heart size={22} className="text-black cursor-pointer" />
      </div>
    </nav>
  );
};

export default NavBar;
