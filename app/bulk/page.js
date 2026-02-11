"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Package, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { bulkDiscounts } from "@/data/config";

export default function BulkPage() {
  const [quantity, setQuantity] = useState(50);
  const basePrice = 450;

  const getDiscount = (qty) => {
    const tier = bulkDiscounts.find(d => qty >= d.minQty && qty <= d.maxQty);
    return tier ? tier.discount : 0;
  };

  const calculatePrice = () => {
    const discount = getDiscount(quantity);
    const discountedPrice = basePrice * (1 - discount / 100);
    const total = discountedPrice * quantity;
    return { unitPrice: discountedPrice, total, discount };
  };

  const { unitPrice, total, discount } = calculatePrice();

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Bulk <span className="text-gradient-gold font-normal">Manufacturing</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Scale your brand with volume discounts up to 25%. MOQ: 10 jackets.
            </p>
          </div>

          {/* Calculator */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-lg shadow-luxury p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-semibold text-dark-grey">Bulk Pricing Calculator</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-grey mb-3">
                    Quantity: <span className="text-gold font-semibold">{quantity} jackets</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-cream rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-xs text-mid-grey mt-2">
                    <span>10</span>
                    <span>100</span>
                    <span>250</span>
                    <span>500+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-beige">
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <p className="text-sm text-mid-grey mb-1">Base Price</p>
                    <p className="text-2xl font-semibold text-dark-grey">£{basePrice}</p>
                    <p className="text-xs text-mid-grey mt-1">per jacket</p>
                  </div>

                  <div className="text-center p-4 bg-gold/10 rounded-lg border border-gold/20">
                    <p className="text-sm text-mid-grey mb-1">Your Discount</p>
                    <p className="text-2xl font-semibold text-gold">{discount}%</p>
                    <p className="text-xs text-mid-grey mt-1">volume savings</p>
                  </div>

                  <div className="text-center p-4 bg-dark-grey text-white rounded-lg">
                    <p className="text-sm text-off-white/70 mb-1">Unit Price</p>
                    <p className="text-2xl font-semibold">£{unitPrice.toFixed(2)}</p>
                    <p className="text-xs text-off-white/70 mt-1">per jacket</p>
                  </div>
                </div>

                <div className="bg-dark-grey text-white rounded-lg p-6 text-center">
                  <p className="text-sm text-off-white/70 mb-2">Total Order Value</p>
                  <p className="text-4xl font-light mb-1">£{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                  <p className="text-sm text-gold">
                    You save £{((basePrice - unitPrice) * quantity).toFixed(2)} with bulk pricing
                  </p>
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  Request Quote for {quantity} Jackets
                </Button>
              </div>
            </div>
          </div>

          {/* Discount Tiers */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-light text-dark-grey text-center mb-12">
              Volume <span className="text-gradient-gold font-normal">Discount Tiers</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {bulkDiscounts.map((tier, index) => (
                <motion.div
                  key={tier.minQty}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg text-center ${
                    quantity >= tier.minQty && quantity <= tier.maxQty
                      ? "bg-gold text-white shadow-glow"
                      : "bg-white shadow-card"
                  }`}
                >
                  <TrendingDown className={`w-8 h-8 mx-auto mb-3 ${
                    quantity >= tier.minQty && quantity <= tier.maxQty ? "text-white" : "text-gold"
                  }`} />
                  <p className="text-sm font-medium mb-1">
                    {tier.minQty}-{tier.maxQty === Infinity ? "∞" : tier.maxQty}
                  </p>
                  <p className="text-2xl font-bold">{tier.discount}%</p>
                  <p className="text-xs mt-1 opacity-70">discount</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits */}
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
                  title: "Scalable Pricing",
                  desc: "Grow your order size and unlock bigger savings automatically."
                },
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
