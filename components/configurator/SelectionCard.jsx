"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SelectionCard({
  item,
  isSelected,
  onSelect,
  showPrice = true,
  imageKey = "image",
  nameKey = "name",
  descKey = "description"
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "relative cursor-pointer rounded-lg border-2 transition-all duration-300 overflow-hidden group",
        isSelected
          ? "border-gold shadow-glow bg-white"
          : "border-light-grey hover:border-mid-grey bg-white shadow-card"
      )}
    >
      {/* Selection Indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-3 right-3 z-10 w-6 h-6 bg-gold rounded-full flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image (if exists) */}
      {item[imageKey] && (
        <div className="aspect-[4/3] bg-cream overflow-hidden">
          <img
            src={item[imageKey]}
            alt={item[nameKey]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x300/f5f5f4/8b5a2b?text=${encodeURIComponent(item[nameKey])}`;
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-dark-grey mb-1">{item[nameKey]}</h3>
        {item[descKey] && (
          <p className="text-sm text-mid-grey mb-3">{item[descKey]}</p>
        )}
      </div>
    </motion.div>
  );
}
