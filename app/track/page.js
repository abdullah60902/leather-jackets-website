"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    // Mock data - in production, this would fetch from API
    setOrderData({
      id: orderId,
      status: "in_production",
      created: "2026-02-01",
      estimated: "2026-03-15",
      timeline: [
        { stage: "Order Confirmed", date: "2026-02-01", completed: true },
        { stage: "In Production", date: "2026-02-05", completed: true },
        { stage: "Quality Check", date: "2026-03-10", completed: false },
        { stage: "Shipped", date: "2026-03-12", completed: false },
        { stage: "Delivered", date: "2026-03-15", completed: false },
      ]
    });
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Track Your <span className="text-gradient-gold font-normal">Order</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Enter your order ID to see real-time production status
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Search Form */}
            <form onSubmit={handleTrack} className="bg-white rounded-lg shadow-card p-8 mb-12">
              <label className="block text-sm font-medium text-dark-grey mb-3">Order ID</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., LUX-2026-001234"
                  className="flex-1 px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                  required
                />
                <Button type="submit" variant="primary">
                  <Search className="w-4 h-4 mr-2" />
                  Track
                </Button>
              </div>
              <p className="text-xs text-mid-grey mt-3">
                You can find your order ID in the confirmation email
              </p>
            </form>

            {/* Order Status */}
            {orderData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-card p-8"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-beige">
                  <div>
                    <h2 className="text-2xl font-semibold text-dark-grey mb-1">Order #{orderData.id}</h2>
                    <p className="text-sm text-mid-grey">Placed on {orderData.created}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-mid-grey mb-1">Estimated Delivery</p>
                    <p className="text-lg font-semibold text-dark-grey">{orderData.estimated}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  {orderData.timeline.map((item, index) => (
                    <div key={item.stage} className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.completed ? "bg-gold text-white" : "bg-cream text-mid-grey"
                      }`}>
                        {item.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : index === 1 ? (
                          <Package className="w-6 h-6" />
                        ) : (
                          <Truck className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className={`font-semibold mb-1 ${
                          item.completed ? "text-dark-grey" : "text-mid-grey"
                        }`}>
                          {item.stage}
                        </h3>
                        <p className="text-sm text-mid-grey">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-beige">
                  <p className="text-sm text-mid-grey">
                    Need help? <a href="/contact" className="text-gold hover:underline">Contact our support team</a>
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
