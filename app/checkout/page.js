"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Package, CreditCard, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

// Initialize Stripe (Replace with your actual Publishable Key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",
  });

  if (!cart) {
    return (
      <div className="min-h-screen bg-off-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40 pb-20">
          <h1 className="text-3xl font-light text-dark-grey mb-4">Your Cart is Empty</h1>
          <p className="text-mid-grey mb-8">Start designing your perfect jacket first.</p>
          <Button onClick={() => router.push("/designs")}>Browse Designs</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // SIMULATED REAL-TIME PAYMENT PROCESSING
    // In a real app, you would call your API route here:
    // const res = await fetch('/api/checkout_sessions', { method: 'POST', body: JSON.stringify({ cart, formData }) });
    
    // Simulating network delay
    setTimeout(() => {
      setLoading(false);
      clearCart(); // Clear the cart after successful order
      router.push("/success?order=" + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-light text-dark-grey mb-12 text-center">
            Secure <span className="text-gradient-gold font-normal">Checkout</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-card p-8 h-fit">
              <h2 className="text-xl font-semibold text-dark-grey mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-gold" />
                Order Summary
              </h2>

              <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-beige">
                <div className="w-20 h-24 bg-cream rounded-md overflow-hidden flex-shrink-0">
                  {cart.image ? (
                    <img src={cart.image} alt="Product" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-mid-grey/10" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-dark-grey">{cart.name || "Custom Jacket"}</h3>
                  <p className="text-sm text-mid-grey">{cart.description || "Bespoke Design"}</p>
                  <div className="mt-2 text-sm text-mid-grey">
                    <span className="font-medium text-dark-grey">Color:</span> {cart.color?.name || cart.color}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8 pb-6 border-b border-beige">
                <div className="flex justify-between text-sm">
                  <span className="text-mid-grey">Quantity</span>
                  <span className="font-medium text-dark-grey">{cart.totalQuantity} items</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-mid-grey">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>

              <div className="bg-cream/50 rounded-lg p-4 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-mid-grey">
                  Your order is protected by our Lifetime Warranty and Manufacturing Guarantee. 
                  Secure SSL encryption ensures your data is safe.
                </p>
              </div>
            </div>

            {/* Shipping & Payment Form */}
            <div>
              <form onSubmit={handlePayment} className="space-y-8">
                {/* Shipping Details */}
                <div className="bg-white rounded-lg shadow-card p-8">
                  <h2 className="text-xl font-semibold text-dark-grey mb-6">Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark-grey mb-2">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark-grey mb-2">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-dark-grey mb-2">Address</label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="123 Manufacturing Lane"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-grey mb-2">City</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="London"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-grey mb-2">Post Code</label>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-card p-8">
                  <h2 className="text-xl font-semibold text-dark-grey mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gold" />
                    Payment Method
                  </h2>
                  
                  {/* Stripe Element Placeholder */}
                  <div className="p-4 border border-gold/30 bg-gold/5 rounded-lg mb-6">
                    <p className="text-sm text-dark-grey font-medium text-center">
                      Secure Credit Card Payment (Powered by Stripe)
                    </p>
                    {/* Simulated Card Input Visual */}
                    <div className="mt-4 flex space-x-2 justify-center opacity-60">
                       <div className="w-10 h-6 bg-dark-grey rounded"></div>
                       <div className="w-10 h-6 bg-red-600 rounded"></div>
                       <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gold hover:bg-gold-light border-gold shadow-lg hover:shadow-gold/20"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      "Confirm Order & Request Quote"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
