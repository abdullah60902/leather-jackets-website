"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Ready-Made Designs", href: "/designs" },
    { name: "Custom Builder", href: "/builder" },
    { name: "Bulk Orders", href: "/bulk" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "glass shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              "font-heading text-2xl tracking-widest uppercase font-bold transition-colors duration-300",
              scrolled ? "text-dark-grey" : "text-white"
            )}
          >
            Luxe<span className="font-light">Leather</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-300 relative group",
                  scrolled ? "text-dark-grey hover:text-gold" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                  scrolled ? "bg-gold" : "bg-white"
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={cn(
            "hidden md:flex items-center space-x-6 transition-colors duration-300",
            scrolled ? "text-dark-grey" : "text-white"
          )}>
            <button className="hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-gold transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-gold transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden transition-colors duration-300",
              scrolled ? "text-dark-grey" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[70px] left-0 w-full bg-white z-40 border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-dark-grey hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-6 pt-4 border-t border-gray-100">
                <button className="text-dark-grey hover:text-gold"><Search className="w-5 h-5" /></button>
                <button className="text-dark-grey hover:text-gold"><User className="w-5 h-5" /></button>
                <button className="text-dark-grey hover:text-gold"><ShoppingBag className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
