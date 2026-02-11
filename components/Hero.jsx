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
          src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Leather Craftsmanship"
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

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <span className="w-12 h-[1px] bg-gold" />
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">
                Elite Leather Manufacturing
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-sans font-light text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-white tracking-tighter"
            >
              Crafted for <br />
              <span className="font-serif italic font-normal text-gold">Dominance</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-off-white/80 max-w-xl font-light leading-relaxed tracking-wide italic"
            >
              "Where heritage meets innovation. We build jackets that don't just protect, they legacy."
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6 pt-6"
            >
              <a href="/designs" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-gold border-gold text-dark-grey hover:bg-white hover:border-white transition-all duration-500 py-6 px-10 text-base font-semibold group">
                  EXPLORE DESIGNS
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block ml-2">→</motion.span>
                </Button>
              </a>
              <a href="/builder" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto border-white/30 text-white backdrop-blur-md hover:bg-white hover:text-dark-grey transition-all duration-500 py-6 px-10 text-base font-light">
                  CUSTOM BUILDER
                </Button>
              </a>
            </motion.div>

            {/* Micro Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10 max-w-2xl"
            >
              <div>
                <p className="text-gold font-serif text-2xl">MOQ 10</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Minimum Order</p>
              </div>
              <div>
                <p className="text-gold font-serif text-2xl">4-6 WK</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Lead Time</p>
              </div>
              <div>
                <p className="text-gold font-serif text-2xl">UK BASE</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Production</p>
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
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 [writing-mode:vertical-lr]">Discover Luxe</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent opacity-40" />
      </motion.div>
    </section>
  );
}
