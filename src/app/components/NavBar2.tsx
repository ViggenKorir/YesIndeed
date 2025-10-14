"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  Map,
  Navigation,
  Search,
  Database,
  Server,
  Globe,
  Zap,
  Book,
  Users,
  Calendar,
  Shield,
} from "lucide-react";

const NavBar2 = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = {
    Products: {
      sections: [
        {
          items: [
            {
              icon: Map,
              label: "Maps",
              desc: "Beautiful, customizable maps",
              badge: null,
            },
            {
              icon: Navigation,
              label: "Navigation",
              desc: "Custom navigation services",
              badge: null,
            },
            {
              icon: Search,
              label: "Search",
              desc: "Powerful location search",
              badge: null,
            },
            {
              icon: Database,
              label: "Data",
              desc: "Rich location data",
              badge: null,
            },
            {
              icon: Server,
              label: "Self-Hosted",
              desc: "Deploy on your infrastructure",
              badge: "New",
            },
          ],
        },
      ],
    },
    Solutions: {
      sections: [
        {
          items: [
            {
              icon: Navigation,
              label: "Automotive",
              desc: "In-vehicle navigation systems",
              badge: null,
            },
            {
              icon: Globe,
              label: "Logistics",
              desc: "Fleet management solutions",
              badge: null,
            },
            {
              icon: Zap,
              label: "Real Estate",
              desc: "Property visualization tools",
              badge: null,
            },
            {
              icon: Users,
              label: "Social",
              desc: "Location-based apps",
              badge: null,
            },
          ],
        },
      ],
    },
    Resources: {
      sections: [
        {
          title: "NEWS",
          items: [
            {
              icon: Book,
              label: "Blog",
              desc: "Product launches and features",
              badge: null,
            },
            {
              icon: Globe,
              label: "Newsroom",
              desc: "Latest news and press",
              badge: null,
            },
            {
              icon: Calendar,
              label: "Events",
              desc: "Virtual and in-person events",
              badge: null,
            },
          ],
        },
        {
          title: "LEARN",
          items: [
            {
              icon: Users,
              label: "Customer Showcase",
              desc: "See customer use cases",
              badge: null,
            },
            {
              icon: Book,
              label: "Documentation",
              desc: "Comprehensive guides",
              badge: null,
            },
          ],
        },
        {
          title: "GET HELP",
          items: [
            {
              icon: Zap,
              label: "Support",
              desc: "Fast and expert help",
              badge: null,
            },
            {
              icon: Shield,
              label: "Security",
              desc: "Protect your account",
              badge: null,
            },
          ],
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              {/*<div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Map className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">mapbox</span>
              </div>*/}

              {/* Nav Items */}
              <div className="flex items-center space-x-1">
                {Object.keys(navItems).map((item) => (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="px-4 py-2 text-black hover:text-gray-900 font-medium flex items-center space-x-1 transition-colors">
                      <span>{item}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  Developers
                </button>
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  Pricing
                </button>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Contact us
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Log in
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Menus */}
      {Object.keys(navItems).map((item) => (
        <div
          key={item}
          className={`absolute left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-out z-50 ${
            activeDropdown === item
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          onMouseEnter={() => setActiveDropdown(item)}
          onMouseLeave={() => setActiveDropdown(null)}
          style={{ top: "64px" }}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-8">
              {navItems[item].sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="space-y-4">
                  {section.title && (
                    <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      {section.title === "NEWS" && (
                        <Globe className="w-4 h-4" />
                      )}
                      {section.title === "LEARN" && (
                        <Book className="w-4 h-4" />
                      )}
                      {section.title === "GET HELP" && (
                        <Shield className="w-4 h-4" />
                      )}
                      <span>{section.title}</span>
                    </div>
                  )}
                  {section.items.map((subItem, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <subItem.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {subItem.label}
                          </span>
                          {subItem.badge && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded uppercase">
                              {subItem.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {subItem.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Build with Mapbox
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hover over the navigation items above to see the animated dropdowns
            in action
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar2;

// import Link from "next/link";
// import { Search, ShoppingCart, Heart, SlidersHorizontal } from "lucide-react";

// const NavBar2 = () => {
//   return (
//     <nav className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 z-20 relative">
//       {/* Left: Logo and nav links */}
//       <div className="flex items-center gap-8 min-w-fit">
//         <span className="font-bold text-2xl tracking-tight select-none">
//           BrandBucket
//         </span>
//         <div className="flex items-center gap-4 ml-4">
//           <span className="font-semibold text-base">Buy business names:</span>
//           <Link
//             href="#"
//             className="text-black text-base font-normal hover:underline"
//           >
//             by style
//           </Link>
//           <Link
//             href="#"
//             className="text-black text-base font-normal hover:underline"
//           >
//             by industry
//           </Link>
//         </div>
//       </div>

//       {/* Center: Search bar */}
//       <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl flex justify-center">
//         <div className="flex items-center bg-[#ececec] rounded-xl px-3 py-1 w-full shadow-sm">
//           <Search size={20} className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="search business names"
//             className="bg-transparent outline-none border-none flex-1 text-base py-2 text-gray-700 placeholder:text-gray-400"
//           />
//           <SlidersHorizontal
//             size={20}
//             className="text-gray-400 ml-2 cursor-pointer"
//           />
//         </div>
//       </div>

//       {/* Right: Icons */}
//       <div className="flex items-center gap-6 min-w-fit">
//         <ShoppingCart size={22} className="text-black cursor-pointer" />
//         <Heart size={22} className="text-black cursor-pointer" />
//       </div>
//     </nav>
//   );
// };

// export default NavBar2;
