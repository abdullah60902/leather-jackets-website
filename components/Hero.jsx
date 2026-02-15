"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-dark-grey">
      {/* Cinematic Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/img/hero-section-img.jpg"
          alt="Bespoke Leather Jacket Manufacturing Workshop London"
          className="w-full h-full object-cover"
        />
        {/* Luxury Vignette & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-grey via-dark-grey/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-grey via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Floating Particles/Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-gold/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-6 sm:px-12 mx-auto pt-24 md:pt-0">
        <div className="max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 md:space-y-8"
          >
            {/* Logo Slogan Removed to avoid conflict with Navbar logo */}

            <motion.h1
              variants={itemVariants}
              className="font-sans font-light text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white tracking-tighter"
            >
              The Premier <br />
              <span className="font-serif italic font-normal text-gold">Leather Manufacturer</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-off-white/80 max-w-lg font-light leading-relaxed tracking-wide italic"
            >
              "World-class bespoke leather jacket production for luxury brands and startups. Crafted in London, worn globally."
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-5 pt-3 md:pt-5"
            >
              <a href="/designs" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-gold border-gold text-dark-grey hover:bg-white hover:border-white transition-all duration-500 py-3 md:py-5 px-9 text-[13px] md:text-sm font-semibold group flex items-center justify-center">
                  EXPLORE DESIGNS
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block ml-2">→</motion.span>
                </Button>
              </a>
              <a href="/customization" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-dark-grey transition-all duration-500 py-3 md:py-5 px-9 text-[13px] md:text-sm font-light flex items-center justify-center">
                  CUSTOMIZATION OPTIONS
                </Button>
              </a>
            </motion.div>

            {/* Micro Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 md:gap-10 pt-8 border-t border-white/5 max-w-2xl"
            >
              <div className="space-y-0.5">
                <p className="text-gold font-serif text-lg sm:text-xl md:text-2xl">MOQ 10</p>
                <p className="text-white/30 text-[7px] sm:text-[9px] uppercase tracking-[0.2em]">Minimum Batch</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-gold font-serif text-lg sm:text-xl md:text-2xl">4-6 WK</p>
                <p className="text-white/30 text-[7px] sm:text-[9px] uppercase tracking-[0.2em]">Production Cycle</p>
              </div>
              <div className="hidden lg:block space-y-0.5">
                <p className="text-gold font-serif text-lg sm:text-xl md:text-2xl">UK BASE</p>
                <p className="text-white/30 text-[7px] sm:text-[9px] uppercase tracking-[0.2em]">Quality Control</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-6"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 [writing-mode:vertical-lr]">Discover ATSAS</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent opacity-40" />
      </motion.div>
    </section>
  );
}
