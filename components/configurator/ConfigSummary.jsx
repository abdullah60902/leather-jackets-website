"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ConfigSummary({ config, isOpen, onToggle }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateTotal = () => {
    let total = config.jacketType?.basePrice || 0;
    total += config.leatherType?.priceModifier || 0;
    total += config.stitching?.priceModifier || 0;
    total += config.hardware?.priceModifier || 0;
    total += config.collar?.priceModifier || 0;
    total += config.lining?.priceModifier || 0;
    total += config.weatherResistance?.priceModifier || 0;
    return total;
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-dark-grey text-white px-6 py-3 rounded-full shadow-float font-medium"
      >
        View Summary
      </button>

      {/* Desktop Sidebar */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className={cn(
              "fixed lg:sticky top-0 right-0 h-screen lg:h-auto w-full max-w-md lg:max-w-sm bg-white shadow-luxury p-6 overflow-y-auto z-40",
              "lg:rounded-lg lg:top-24"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-grey">Your Configuration</h3>
              <button onClick={onToggle} className="lg:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Items */}
            <div className="space-y-4 mb-6">
              {config.jacketType && (
                <SummaryItem label="Jacket Type" value={config.jacketType.name} />
              )}
              {config.leatherType && (
                <SummaryItem label="Leather" value={config.leatherType.name} />
              )}
              {config.finish && (
                <SummaryItem label="Finish" value={config.finish.name} />
              )}
              {config.color && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mid-grey">Color</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-dark-grey">{config.color.name}</span>
                    <div
                      className="w-5 h-5 rounded-full border border-light-grey"
                      style={{ backgroundColor: config.color.hex }}
                    />
                  </div>
                </div>
              )}
              {config.stitching && (
                <SummaryItem label="Stitching" value={config.stitching.name} />
              )}
              {config.hardware && (
                <SummaryItem label="Hardware" value={config.hardware.name} />
              )}
              {config.collar && (
                <SummaryItem label="Collar" value={config.collar.name} />
              )}
              {config.lining && (
                <SummaryItem label="Lining" value={config.lining.name} />
              )}
              {config.weatherResistance && config.weatherResistance.id !== "none" && (
                <SummaryItem label="Weather Protection" value={config.weatherResistance.name} />
              )}
            </div>

            {/* Total Removed */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-mid-grey">{label}</span>
      <div className="text-right">
        <p className="font-medium text-dark-grey">{value}</p>
      </div>
    </div>
  );
}
