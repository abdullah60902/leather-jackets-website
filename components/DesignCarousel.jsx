"use client";
import React from "react";
import { motion } from "framer-motion";
import { preDesignedJackets } from "@/data/predesigned";
import Link from "next/link";

export default function DesignCarousel() {
  // Extract all first images from the products
  const productImages = preDesignedJackets
    .filter(jacket => jacket.images && jacket.images.length > 0)
    .map(jacket => ({
      id: jacket.id,
      image: jacket.images[0],
      name: jacket.name,
      category: jacket.category
    }));

  // Duplicate items to ensure seamless loop without gaps
  // If we have enough items (e.g., > 10), duplicating once is usually enough for a wide screen.
  // Given we have ~30 items, duplicating once results in 60 items, which is plenty.
  const carouselItems = [...productImages, ...productImages];

  return (
    <section className="py-24 bg-dark-grey relative overflow-hidden border-t border-white/5">
      {/* Background Gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-grey z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-grey z-10" />

      <div className="container mx-auto px-6 mb-16 text-center relative z-20">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
          Our <span className="text-gold italic">Designs</span>
        </h2>
        <p className="text-off-white/60 max-w-2xl mx-auto font-light">
          Explore our latest designs available for immediate bulk order or customization.
        </p>
      </div>

      <div className="flex w-full overflow-hidden relative z-0">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-grey z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-grey z-10 hidden md:block" />

        <motion.div
          className="flex gap-6 md:gap-8 px-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 80, // Slow, elegant scroll
              ease: "linear",
            },
          }}
          style={{ width: "max-content", display: "flex" }}
        >
          {carouselItems.map((item, index) => (
            <Link href="/designs" key={`${item.id}-${index}`} className="group relative block w-[280px] md:w-[320px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-xl bg-off-white/5 border border-white/10 hover:border-gold/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20">
                <p className="text-gold text-xs uppercase tracking-widest font-bold mb-1">{item.category}</p>
                <h3 className="text-white font-serif text-lg leading-tight">{item.name}</h3>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-12 relative z-20">
        <Link href="/designs" className="inline-block px-8 py-3 border border-white/20 rounded-full text-white text-sm hover:bg-gold hover:border-gold hover:text-dark-grey transition-all duration-300">
          VIEW ALL DESIGNS
        </Link>
      </div>
    </section>
  );
}
