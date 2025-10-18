"use client";
import { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  desc: string;
  badge: string | null;
  url: string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface NavCategory {
  sections: NavSection[];
}

interface NavItems {
  [key: string]: NavCategory;
}

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

const NavBar: React.FC = () => {
  const [shadow, setShadow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItems = {
    Products: {
      sections: [
        {
          items: [
            {
              icon: Map,
              label: "Maps",
              desc: "Beautiful, customizable maps",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Navigation,
              label: "Navigation",
              desc: "Custom navigation services",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Search,
              label: "Search",
              desc: "Powerful location search",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Database,
              label: "Data",
              desc: "Rich location data",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Server,
              label: "Self-Hosted",
              desc: "Deploy on your infrastructure",
              badge: "New",
              url: "/upcoming",
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
              url: "/upcoming",
            },
            {
              icon: Globe,
              label: "Logistics",
              desc: "Fleet management solutions",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Zap,
              label: "Real Estate",
              desc: "Property visualization tools",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Users,
              label: "Social",
              desc: "Location-based apps",
              badge: null,
              url: "/upcoming",
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
              url: "/upcoming",
            },
            {
              icon: Globe,
              label: "Newsroom",
              desc: "Latest news and press",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Calendar,
              label: "Events",
              desc: "Virtual and in-person events",
              badge: null,
              url: "/upcoming",
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
              url: "/upcoming",
            },
            {
              icon: Book,
              label: "Documentation",
              desc: "Comprehensive guides",
              badge: null,
              url: "/upcoming",
            },
          ],
        },
        {
          title: "GET HELP",
          items: [
            {
              icon: Zap,
              label: "Support",
              desc: "Fast, expert help",
              badge: null,
              url: "/upcoming",
            },
            {
              icon: Shield,
              label: "Security",
              desc: "Protect your account",
              badge: null,
              url: "/upcoming",
            },
          ],
        },
      ],
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-5 z-10 rounded-full w-6xl px-4 py-3 transition-all duration-500 mb-1.5
        ${
          shadow
            ? "bg-[rgb(255,255,255)] dark:bg-white backdrop-blur-md shadow-md border-0.5"
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

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-1">
            {Object.keys(navItems).map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-black hover:text-gray-900 font-medium flex items-center space-x-1 transition-colors h-10.5">
                  <span>{item}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            ))}

            <button className="px-4 py-2 text-black hover:text-gray-900 font-medium">
              Pricing
            </button>
          </div>
        </div>

        {/* Dropdown Menus */}
        {Object.keys(navItems).map((item) => (
          <div
            key={item}
            className={`absolute left-0 right-0 bg-white rounded-3xl border-b border-gray-200 shadow-lg transition-all duration-300 ease-out z-50 ${
              activeDropdown === item
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
            onMouseEnter={() => setActiveDropdown(item)}
            onMouseLeave={() => setActiveDropdown(null)}
            style={{ top: "55px" }}
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
                        href={subItem.url}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <subItem.icon className="w-5 h-5 text-green-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              {subItem.label}
                            </span>
                            {subItem.badge && (
                              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-green-700 rounded uppercase">
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

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
            Contact us
          </button>

          {/* Authentication buttons */}
          <ClerkProvider>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-gradient-to-r from-green-900 to-green-600 text-white rounded-full hover:animate-pulse hover:cursor-pointer transition-colors font-medium">
                  Sign up
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </ClerkProvider>
        </div>
      </div>
      {/*</div>*/}

      {/*<div className="hidden lg:flex gap-8">
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
        </div>*/}

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
  );
};

export default NavBar;
