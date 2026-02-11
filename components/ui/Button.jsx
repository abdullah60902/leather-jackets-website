"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-none font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide";

  const variants = {
    primary: "bg-dark-grey text-off-white hover:bg-black hover:shadow-luxury border border-transparent",
    secondary: "bg-transparent text-dark-grey border border-dark-grey hover:bg-dark-grey hover:text-off-white",
    ghost: "bg-transparent text-dark-grey hover:bg-cream",
    outline: "bg-transparent border border-gray-300 text-dark-grey hover:border-dark-grey",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-8 py-3",
    lg: "text-base px-10 py-4",
    xl: "text-lg px-12 py-5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
