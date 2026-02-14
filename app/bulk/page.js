"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Package, Award, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { bulkDiscounts } from "@/data/config";

export default function BulkPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Bulk <span className="text-gradient-gold font-normal">Manufacturing</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Scale your brand with premium quality manufacturing. Dedicated production lines for volume orders.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-dark-grey text-white rounded-lg shadow-luxury p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-3xl -mr-32 -mt-32 rounded-full" />
               <div className="relative z-10">
                <MessageSquare className="w-12 h-12 text-gold mx-auto mb-6" />
                <h2 className="text-3xl font-light mb-4">Get a Custom Quote</h2>
                <p className="text-off-white/70 mb-8 max-w-xl mx-auto">
                  Every bulk project has unique requirements. Speak with our production experts to get a tailored quote for your brand's specific needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/contact" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full bg-gold border-gold hover:bg-gold-light text-dark-grey">
                      Contact Sales Team
                    </Button>
                  </a>
                  <a href="/designs" className="w-full sm:w-auto">
                    <Button variant="ghost" size="lg" className="w-full border-white/20 text-white hover:bg-white/10">
                      Browse Designs
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-light text-dark-grey text-center mb-12">
              Volume <span className="text-gradient-gold font-normal">Production Tiers</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {bulkDiscounts.map((tier, index) => (
                <motion.div
                  key={tier.minQty}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white shadow-card p-6 rounded-lg text-center"
                >
                  <TrendingDown className="w-8 h-8 mx-auto mb-3 text-gold" />
                  <p className="text-sm font-medium mb-1">
                    {tier.minQty}-{tier.maxQty === Infinity ? "∞" : tier.maxQty}
                  </p>
                  <p className="text-xl font-bold">Tier {index + 1}</p>
                  <p className="text-xs mt-1 opacity-70">Volume Tier</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-dark-grey text-center mb-12">
              Bulk Order <span className="text-gradient-gold font-normal">Benefits</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Package className="w-8 h-8" />,
                  title: "Flexible MOQ",
                  desc: "Start with just 10 jackets. Perfect for small brands and startups."
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Consistent Quality",
                  desc: "Every jacket undergoes our 12-point quality inspection process."
                },
                {
                  icon: <TrendingDown className="w-8 h-8" />,
                  title: "Scalable Production",
                  desc: "Grow your brand with dedicated manufacturing capacity and expert support."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-8 shadow-card text-center"
                >
                  <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-gold mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-dark-grey mb-3">{benefit.title}</h3>
                  <p className="text-mid-grey">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

