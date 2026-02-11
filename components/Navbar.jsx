"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import logo from "@/public/img/logo.png";
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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-black/5 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center group relative z-10 transition-transform duration-500 hover:scale-[1.02]"
          >
            <div className="relative w-32 h-12 md:w-56 md:h-16">
              <Image
                src={logo}
                alt="ATSAS Logo"
                fill
                className={cn(
                  "object-contain object-left transition-all duration-500 ease-out",
                  scrolled ? "brightness-0" : ""
                )}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-heading font-semibold uppercase tracking-[0.15em] transition-all duration-300 relative group py-2",
                  scrolled ? "text-dark-grey/80 hover:text-gold" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
                <motion.span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                    scrolled ? "bg-gold" : "bg-white"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={cn(
            "hidden md:flex items-center space-x-8 transition-colors duration-500",
            scrolled ? "text-dark-grey" : "text-white"
          )}>
            <button className="p-2 hover:text-gold transition-all duration-300 hover:scale-110">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button className="p-2 hover:text-gold transition-all duration-300 hover:scale-110">
              <User className="w-[18px] h-[18px]" />
            </button>
            <button className="p-2 hover:text-gold transition-all duration-300 hover:scale-110 relative group">
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="absolute top-0 right-0 bg-gold text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm group-hover:scale-110 transition-transform">
                0
              </span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-full transition-all duration-300",
              scrolled ? "text-dark-grey hover:bg-black/5" : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-white z-[60] lg:hidden shadow-2xl flex flex-col p-10"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-heading font-bold tracking-widest text-gold text-xl">ATSAS</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-dark-grey p-2">
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-lg font-heading font-medium text-dark-grey hover:text-gold flex items-center justify-between group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                      <span className="w-0 h-px bg-gold group-hover:w-8 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-gray-100 flex justify-between items-center">
                <div className="flex space-x-6">
                  <Search className="w-5 h-5 text-dark-grey" />
                  <User className="w-5 h-5 text-dark-grey" />
                </div>
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-dark-grey" />
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
