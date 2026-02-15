"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/public/img/logo.png";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force scrolled state (white background/dark text) if not on home page
  const shouldShowSolid = scrolled || !isHome;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Designs", href: "/designs" },
    { name: "Bulk Orders", href: "/bulk" },
    { name: "Customization", href: "/customization" },
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
          shouldShowSolid
            ? "bg-white/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-black/5 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center group relative z-10 transition-transform duration-500 hover:scale-[1.02] shrink-0"
          >
            <div className="relative w-28 h-10 md:w-36 md:h-12 lg:w-44 lg:h-14">
              <Image
                src={logo}
                alt="ATSAS Logo"
                fill
                className={cn(
                  "object-contain object-left transition-all duration-500 ease-out",
                  shouldShowSolid ? "brightness-0" : ""
                )}
                priority
              />
            </div>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[10px] xl:text-[12px] font-heading font-semibold uppercase tracking-wider xl:tracking-[0.12em] transition-all duration-300 relative group py-2 whitespace-nowrap",
                  shouldShowSolid ? "text-dark-grey/80 hover:text-gold" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
                <motion.span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                    shouldShowSolid ? "bg-gold" : "bg-white"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Actions - Replaced with Get in Touch */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <Button
                variant="primary"
                size="sm"
                className={cn(
                  "px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.1em] transition-all duration-500",
                  shouldShowSolid
                    ? "bg-dark-grey text-gold hover:bg-gold hover:text-dark-grey"
                    : "bg-gold text-dark-grey hover:bg-white border-transparent"
                )}
              >
                GET IN TOUCH
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-full transition-all duration-300",
              shouldShowSolid ? "text-dark-grey hover:bg-black/5" : "text-white hover:bg-white/10"
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

              <div className="mt-auto pt-10 border-t border-gray-100">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full bg-gold border-gold text-dark-grey hover:bg-dark-grey hover:text-white transition-all duration-300">
                    GET IN TOUCH
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
