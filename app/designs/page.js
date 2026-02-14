"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Filter, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { preDesignedJackets, categories } from "@/data/predesigned";

export default function DesignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredJackets = selectedCategory === "all" 
    ? preDesignedJackets 
    : preDesignedJackets.filter(j => j.category === selectedCategory);

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
              Choose from our curated collection. Simply select your design, sizes, and quantity.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white rounded-lg shadow-card p-2">
              <Filter className="w-4 h-4 text-mid-grey ml-2" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-dark-grey text-white"
                      : "text-mid-grey hover:bg-cream"
                  }`}
                >
                  {cat.name}
                  <span className="ml-2 text-xs opacity-70">({cat.count})</span>
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
                <Link href={`/designs/${jacket.id}`}>
                  {/* Image */}
                  <div className="aspect-[3/4] bg-cream overflow-hidden relative">
                    <img
                      src={jacket.images[0]}
                      alt={jacket.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-dark-grey">
                      {jacket.category.charAt(0).toUpperCase() + jacket.category.slice(1)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-dark-grey mb-2 group-hover:text-gold transition-colors">
                      {jacket.name}
                    </h3>
                    <p className="text-sm text-mid-grey mb-3 line-clamp-2">
                      {jacket.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-beige">
                      <Link href="/contact" className="w-full">
                        <Button variant="primary" size="sm" className="w-full">
                          Get in Touch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Link>
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
    </div>
  );
}
