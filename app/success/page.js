"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Printer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center pt-40 pb-20 min-h-[80vh]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-luxury p-12 text-center max-w-2xl px-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light text-dark-grey mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-mid-grey mb-8">
            Thank you for your order. We have received your request and will begin processing your bespoke jackets shortly.
          </p>

          <div className="bg-cream rounded-lg p-6 mb-8 border border-gold/20">
            <p className="text-sm text-mid-grey uppercase tracking-wider mb-2">Order Reference</p>
            <p className="text-2xl font-mono font-semibold text-dark-grey">{orderId || "ORD-2026-XJL"}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => window.print()} variant="secondary">
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
            <Button onClick={() => router.push("/")} variant="primary">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
