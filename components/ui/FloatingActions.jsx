"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const softBounce = {
    y: [0, -12, 0],
    scale: [1, 1.02, 1], // Subtle scale change during bounce
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95], // Natural cubic-bezier
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* WhatsApp Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative"
              href="https://wa.me/442079460958"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                animate={softBounce}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                className="bg-gold text-dark-grey p-4 rounded-full shadow-2xl flex items-center justify-center group relative border border-white/20"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute right-full mr-4 bg-white text-dark-grey px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                  Chat with us
                </span>
              </motion.div>
            </motion.a>

            {/* Scroll to Top Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.1 }}
              className="self-end"
            >
              <motion.button
                animate={softBounce}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="bg-dark-grey text-gold p-3 rounded-full shadow-2xl flex items-center justify-center group relative border border-gold/30"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
                <span className="absolute right-full mr-4 bg-white text-dark-grey px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                  Scroll to top
                </span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
