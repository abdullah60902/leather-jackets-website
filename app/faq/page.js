"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    category: "Orders & Pricing",
    questions: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "Our MOQ is 10 jackets. This allows small brands and startups to access premium manufacturing without massive upfront investment."
      },
      {
        q: "How is pricing calculated?",
        a: "Pricing is based on jacket type, leather selection, customization options, and quantity. Volume discounts range from 5% (25+ units) to 25% (500+ units). Use our configurator for instant quotes."
      },
      {
        q: "Do you charge for samples?",
        a: "Sample jackets are charged at full price but the cost is credited toward your bulk order if placed within 60 days."
      },
    ]
  },
  {
    category: "Production & Timeline",
    questions: [
      {
        q: "What is the production timeline?",
        a: "Standard production is 4-6 weeks from order confirmation. Express production (2-3 weeks) is available for an additional 30% fee."
      },
      {
        q: "Can I track my order?",
        a: "Yes! You'll receive a unique tracking ID and can monitor progress through our Order Tracking portal with real-time updates."
      },
      {
        q: "What if I need changes after ordering?",
        a: "Minor changes can be made within 48 hours of order placement. Major changes may incur fees and extend production time."
      },
    ]
  },
  {
    category: "Customization",
    questions: [
      {
        q: "Can I add my company logo?",
        a: "Absolutely! We offer embroidery, screen printing, leather embossing, and leather patches. Upload your logo during configuration."
      },
      {
        q: "Can I mix sizes in one order?",
        a: "Yes, you can order multiple sizes (XS-XXXL) and even custom measurements within a single order at no extra charge."
      },
      {
        q: "What customization options are available?",
        a: "You can customize: jacket type, leather type, finish, color, stitching, hardware, collar, lining, weather resistance, and add custom designs via our draw tool."
      },
    ]
  },
  {
    category: "Quality & Warranty",
    questions: [
      {
        q: "What quality standards do you follow?",
        a: "We're ISO 9001:2015 certified and source leather from Leather Working Group certified tanneries. Every jacket undergoes 12-point quality inspection."
      },
      {
        q: "Do you offer a warranty?",
        a: "Yes, all jackets come with a lifetime warranty against manufacturing defects. This covers stitching, hardware, and material flaws."
      },
      {
        q: "What if I'm not satisfied?",
        a: "We offer a 30-day satisfaction guarantee. If the jackets don't meet specifications, we'll remake them at no cost."
      },
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Where do you ship?",
        a: "We ship worldwide. UK delivery is free for orders over £2,000. International shipping costs are calculated at checkout."
      },
      {
        q: "How are jackets packaged?",
        a: "Each jacket is individually wrapped in tissue paper, placed in a garment bag, and shipped in protective boxes to ensure pristine condition."
      },
    ]
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Frequently Asked <span className="text-gradient-gold font-normal">Questions</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Everything you need to know about our manufacturing process
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={category.category}>
                <h2 className="text-2xl font-semibold text-dark-grey mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, qIndex) => {
                    const globalIndex = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <motion.div
                        key={globalIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: qIndex * 0.05 }}
                        className="bg-white rounded-lg shadow-card overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cream transition-colors"
                        >
                          <span className="font-medium text-dark-grey pr-8">{faq.q}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gold flex-shrink-0" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 text-mid-grey leading-relaxed">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-lg shadow-card p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-dark-grey mb-4">Still have questions?</h3>
              <p className="text-mid-grey mb-6">
                Our team is here to help. Get in touch and we'll respond within 24 hours.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-dark-grey text-white rounded-lg hover:bg-black transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
