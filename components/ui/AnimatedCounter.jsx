"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Extract number from string (e.g., "10,000+" -> 10000)
  const numericValue = typeof value === "string"
    ? parseFloat(value.replace(/,/g, ""))
    : value;

  const suffix = typeof value === "string" ? value.replace(/[0-9,.]/g, "") : "";
  const prefix = typeof value === "string" && value.includes("/") ? "" : ""; // Handle 4.9/5

  const count = useMotionValue(0);
  const rounded = useSpring(count, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      // Small delay for better feel
      setTimeout(() => {
        count.set(numericValue);
      }, 200);
    }
  }, [inView, numericValue, count]);

  useEffect(() => {
    rounded.on("change", (latest) => {
      if (ref.current) {
        let displayValue = latest.toLocaleString(undefined, {
          maximumFractionDigits: value.toString().includes(".") ? 1 : 0,
        });

        // Custom logic for things like 4.9/5
        if (value.toString().includes("/")) {
          displayValue = `${displayValue}/5`;
        } else {
          displayValue = `${displayValue}${suffix}`;
        }

        ref.current.textContent = displayValue;
      }
    });
  }, [rounded, value, suffix]);

  return <span ref={ref}>0</span>;
}
