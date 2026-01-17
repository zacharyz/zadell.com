"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const checkBlogPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/hasBlogPosts");
        if (!response.ok) throw new Error("Failed to fetch blog status");
        const { hasPosts } = await response.json();
        if (mounted) setShowBlog(hasPosts);
      } catch (error) {
        console.error("Error checking blog posts:", error);
        if (mounted) setShowBlog(false);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    checkBlogPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const baseNavLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const navLinks =
    !isLoading && showBlog
      ? [
          ...baseNavLinks.slice(0, 4),
          { href: "/blog", label: "Blog" },
          ...baseNavLinks.slice(4),
        ]
      : baseNavLinks;

  return (
    <nav className="fixed w-full bg-background border-b-4 border-foreground z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-4 group px-2">
              <div className="relative w-16 h-16 flex-shrink-0">
                <div className="absolute -inset-1 border-2 border-foreground rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute -inset-1 border-2 border-primary -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                <div className="relative w-full h-full ink-sketch bg-card overflow-hidden">
                  <Image
                    src={theme === "dark" ? "/images/logo_zz_escher_dark.jpg" : "/images/logo_zz_escher.jpg"}
                    alt="ZZ Escher Logo"
                    fill
                    className="object-cover scale-150 group-hover:scale-175 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl font-serif text-foreground tracking-tighter uppercase leading-none">Zac Zadell</span>
                <span className="text-xs font-serif italic opacity-50 tracking-[0.2em] uppercase">The Strange Loop</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-primary italic underline"
                    : "text-foreground hover:text-primary transition-all hover:scale-110"
                } font-serif text-xl tracking-tight`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-3 ink-sketch bg-white hover:bg-black hover:text-white transition-colors rotate-45"
            >
              <div className="-rotate-45">
                 {theme === "dark" ? "🌞" : "🌙"}
              </div>
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="w-full text-left px-3 py-2"
            >
              {theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
