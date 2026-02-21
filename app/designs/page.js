"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Filter, X, ZoomIn, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { preDesignedJackets, categories } from "@/data/predesigned";

export default function DesignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJacket, setSelectedJacket] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const filteredJackets = selectedCategory === "all" 
    ? preDesignedJackets 
    : preDesignedJackets.filter(j => j.category === selectedCategory);

  const openModal = (jacket) => {
    setSelectedJacket(jacket);
    setActiveImageIndex(0);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setSelectedJacket(null);
    setActiveImageIndex(0);
    setZoomLevel(1);
    setMousePosition({ x: 50, y: 50 });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Ready-Made <span className="text-gradient-gold font-normal">Designs</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Choose from our curated collection. Click on any jacket to see detailed view.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white rounded-lg shadow-card p-2 max-w-full">
              <div className="flex items-center justify-center w-full sm:w-auto mb-2 sm:mb-0">
                <Filter className="w-4 h-4 text-mid-grey mx-2" />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-dark-grey text-white"
                      : "text-mid-grey hover:bg-cream"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Jacket Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredJackets.map((jacket, index) => (
              <motion.div
                key={jacket.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-card overflow-hidden group hover:shadow-float transition-all duration-300"
              >
                {/* Image - clickable to open modal */}
                <div 
                  onClick={() => openModal(jacket)}
                  className="aspect-[3/4] bg-cream overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={jacket.images[0]}
                    alt={jacket.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-dark-grey">
                    {jacket.category.charAt(0).toUpperCase() + jacket.category.slice(1)}
                  </div>
                  {/* Zoom hint on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
                      <ZoomIn className="w-5 h-5 text-dark-grey" />
                      <span className="text-dark-grey font-medium">Click to View</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-grey mb-2">
                    {jacket.name}
                  </h3>
                  <p className="text-sm text-mid-grey mb-3 line-clamp-2">
                    {jacket.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-beige">
                    <div className="flex flex-col w-full gap-2">
                      <Link href="/contact" className="w-full">
                        <Button variant="primary" size="sm" className="w-full">
                          Get in Touch
                        </Button>
                      </Link>
                      {jacket.images.length > 1 && (
                        <p className="text-[10px] text-center text-mid-grey uppercase tracking-widest font-semibold italic">Multiple Views Available</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJackets.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-mid-grey">No designs found in this category</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 bg-dark-grey text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-light mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-off-white/70 mb-8 max-w-2xl mx-auto">
              Learn about our professional customization capabilities including embroidery, hardware, and premium treatments.
            </p>
            <Link href="/customization">
              <Button variant="primary" size="lg" className="bg-gold hover:bg-gold-light border-gold text-dark-grey">
                Explore Customization Options
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Image Modal/Lightbox */}
      <AnimatePresence>
        {selectedJacket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="fixed md:absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-dark-grey text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-dark-grey font-bold">-</span>
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-dark-grey font-bold">+</span>
                </button>
                <div className="px-3 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-dark-grey text-sm font-medium">{Math.round(zoomLevel * 100)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
                {/* Left: Zoomable Image */}
                <div className="bg-cream relative overflow-hidden lg:max-h-[80vh] flex flex-col">
                  <div className="flex-1 p-8 flex items-center justify-center min-h-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        src={selectedJacket.images[activeImageIndex]}
                        alt={selectedJacket.name}
                        className="transition-transform duration-500 ease-out cursor-crosshair max-w-full h-auto object-contain"
                        style={{ 
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setZoomLevel(1.5)}
                        onMouseLeave={() => setZoomLevel(1)}
                      />
                    </AnimatePresence>
                  </div>
                  
                  {/* Image Selector / Views Toggle */}
                  {selectedJacket.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-beige flex gap-2">
                        {selectedJacket.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                              activeImageIndex === idx
                                ? "bg-dark-grey text-white shadow-md"
                                : "text-mid-grey hover:bg-cream"
                            }`}
                          >
                            {idx === 0 ? "Front View" : idx === 1 ? "Back View" : `View ${idx + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="p-6 lg:p-10 flex flex-col justify-center h-full bg-white">
                  <div className="mb-4">
                    <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-medium">
                      {selectedJacket.category.charAt(0).toUpperCase() + selectedJacket.category.slice(1)}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-light text-dark-grey mb-4">
                    {selectedJacket.name}
                  </h2>

                  <p className="text-lg text-mid-grey mb-6 leading-relaxed">
                    {selectedJacket.description}
                  </p>

                  {selectedJacket.category !== "t-shirt" && selectedJacket.category !== "hoodies" && (
                    <div className="border-t border-b border-beige py-6 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-mid-grey">Material</span>
                        <span className="font-semibold text-dark-grey">{selectedJacket.material}</span>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-dark-grey mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {selectedJacket.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-mid-grey">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact" className="w-full block">
                    <Button variant="primary" size="lg" className="w-full shadow-lg hover:shadow-xl transition-shadow">
                      Request a Custom Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
