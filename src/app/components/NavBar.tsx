"use client";
import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import { Search, SlidersHorizontal } from "lucide-react";

// const NavBar = () => {
//   const [shadow, setShadow] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShadow(window.scrollY > 0);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 z-10 w-full px-4 py-3 transition-all duration-500
//         ${
//           shadow
//             ? "bg-[rgb(255,255,255)] dark:bg-white backdrop-blur-md shadow-md border-0.5"
//             : "bg-[rgb(255,255,255)] backdrop-blur-0 shadow-none"
//         }
//       `}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold text-black mr-25">
//           Smartistics
//         </Link>

//         {/* Burger menu button */}
//         <button
//           className="lg:hidden flex flex-col justify-center items-center w-10 h-10"
//           onClick={() => setMenuOpen((prev) => !prev)}
//           aria-label="Toggle menu"
//         >
//           <span
//             className={`block h-0.5 w-6 bg-black mb-1 transition-all duration-300 ${
//               menuOpen ? "rotate-45 translate-y-2" : ""
//             }`}
//           />
//           <span
//             className={`block h-0.5 w-6 bg-black mb-1 transition-all duration-300 ${
//               menuOpen ? "opacity-0" : ""
//             }`}
//           />
//           <span
//             className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
//               menuOpen ? "-rotate-45 -translate-y-1 " : ""
//             }`}
//           />
//         </button>

//         {/* Desktop menu */}
//         <div className="hidden lg:flex gap-8">
//           <Link href="/" className="text-black hover:underline hover:animate-bounce h-8.5">
//             Home
//           </Link>
//           <Link href="/dashboard" className="text-black hover:underline hover:animate-bounce h-8.5">
//             Dashboard
//           </Link>
//           <Link href="/products" className="text-black hover:underline hover:animate-bounce h-8.5">
//             Our Products
//           </Link>
//           <Link href="/about" className="text-black hover:underline hover:animate-bounce h-8.5">
//             About Us
//           </Link>
//           <Link href="/contact" className="text-black hover:underline hover:animate-bounce h-8.5">
//             Contact Us
//           </Link>
//           <Link href="/pricing" className="text-black hover:underline hover:animate-bounce h-8.5">
//             Pricing
//           </Link>
//         </div>

//         <div className="hidden lg:flex ml-25">
//           {/* Authentication buttons */}
//           <ClerkProvider>
//             <SignedOut>
//               <SignInButton />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </ClerkProvider>
//         </div>
//       </div>

//       {/* Center: Search bar */}
//       <div className="absolute left-1/2 ml-10 mt-2 -translate-x-1/2 w-full max-w-xl flex justify-center bg-[rgb(255,255,255)] ">
//         <div className="flex items-center bg-[#ececec] rounded-xl px-3 py-1 w-full shadow-sm">
//           <Search size={20} className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="search business names"
//             // className="bg-transparent outline-none border-none flex-1 text-base py-2 text-gray-700 placeholder:text-gray-400"
//           />
//           <select className="bg-transparent outline-none border-none flex-1 text-base py-2 text-gray-700 placeholder:text-gray-400">
//             <p>We do Web Development for the following fields:</p>
//             <option value="e-commerce">e-commerce</option>
//             <option value="health">health</option>
//             <option value="education">education</option>
//             <option value="finance">finance</option>
//             <option value="real-estate">real-estate</option>
//             <option value="portfolio">portfolio</option>
//             <option value="blog">blog</option>
//             <option value="entertainment">entertainment</option>
//             <option value="non-profit">non-profit</option>
//             <option value="technology">technology</option>
//             <option value="travel">travel</option>
//             <option value="restaurant">restaurant</option>
//             <option value="personal">personal</option>
//             <option value="fashion">fashion</option>
//             <option value="automotive">automotive</option>
//             <option value="legal">legal</option>
//             <option value="consulting">consulting</option>
//             <option value="marketing">marketing</option>
//             <option value="media">media</option>
//             <option value="sports">sports</option>
//             <option value="other">other</option>
//           </select>
//           <SlidersHorizontal size={20} className="text-gray-400 ml-2 cursor-pointer" />
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="lg:hidden mt-4 rounded-2xl shadow-lg bg-white py-4 px-6 flex flex-col gap-4 absolute left-0 right-0 mx-4 top-full z-20">
//           <Link href="/" className="text-black hover:underline">
//             Home
//           </Link>
//           <Link href="/dashboard" className="text-black hover:underline">
//             Dashboard
//           </Link>
//           <Link href="/products" className="text-black hover:underline">
//             Our Products
//           </Link>
//           <Link href="/about" className="text-black hover:underline">
//             About Us
//           </Link>
//           <Link href="/contact" className="text-black hover:underline">
//             Contact Us
//           </Link>
//           <Link href="/pricing" className="text-black hover:underline">
//             Pricing
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;

// ("use client");
// import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

const NavBar = () => {
  const [shadow, setShadow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-5 z-10 rounded-full w-6xl px-4 py-3 transition-all duration-500
        ${
          shadow
            ? "bg- [rgb(255,255,255)] dark:bg-white backdrop-blur-md shadow-md border-0.5"
            : "bg-[rgb(255,255,255)] backdrop-blur-0 shadow-none"
        }
      `}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-black mr-25">
            YesIndeed
          </Link>

          {/* Burger menu button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black mb-1 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black mb-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1 " : ""
              }`}
            />
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex gap-8">
            <Link
              href="/"
              className="text-black hover:underline hover:animate-bounce h-8.5"
            >
              Products
            </Link>
            <Link
              href="/dashboard"
              className="text-black hover:underline hover:animate-bounce h-8.5"
            >
              Solutions
            </Link>
            <Link
              href="/products"
              className="text-black hover:underline hover:animate-bounce h-8.5"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-black hover:underline hover:animate-bounce h-8.5"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-black hover:underline hover:animate-bounce h-8.5"
            >
              Contact Us
            </Link>
            <Link
              href="/pricing"
              className="text-black hover:underline hover:animate-bounce h-8.5"
            >
              Docs
            </Link>
          </div>

          <div className="hidden lg:flex ml-25">
            {/* Authentication buttons */}{" "}
            {/*<ClerkProvider>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkProvider>*/}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 rounded-2xl shadow-lg bg-white py-4 px-6 flex flex-col gap-4 absolute left-0 right-0 mx-4 top-full z-20">
            <Link href="/" className="text-black hover:underline">
              Home
            </Link>
            <Link href="/dashboard" className="text-black hover:underline">
              Dashboard
            </Link>
            <Link href="/products" className="text-black hover:underline">
              Our Products
            </Link>
            <Link href="/about" className="text-black hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-black hover:underline">
              Contact Us
            </Link>
            <Link href="/pricing" className="text-black hover:underline">
              Pricing
            </Link>
          </div>
        )}
      </nav>
      <br />
      <SearchBar />
    </>
  );
};

export default NavBar;
