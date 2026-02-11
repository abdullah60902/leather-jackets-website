"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Eye, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-light text-dark-grey mb-6">
              Crafting Excellence <span className="text-gradient-gold font-normal">Since 2026</span>
            </h1>
            <p className="text-xl text-mid-grey leading-relaxed">
              We are a UK-based luxury leather jacket manufacturer specializing in bespoke production for brands, companies, and discerning individuals worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl font-light text-dark-grey mb-6">Our Story</h2>
              <p className="text-mid-grey leading-relaxed mb-4">
                Founded in the heart of London's creative district, LuxeLeather was born from a simple belief: every brand deserves access to world-class leather jacket manufacturing without compromising on quality or customization.
              </p>
              <p className="text-mid-grey leading-relaxed mb-4">
                Our team of master craftsmen combines traditional leatherworking techniques with cutting-edge technology to deliver jackets that are not just garments, but statements of identity and excellence.
              </p>
              <p className="text-mid-grey leading-relaxed">
                From startups to established brands, we've helped over 500 companies bring their vision to life with our flexible MOQ of just 10 jackets and unparalleled customization options.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-dark-grey mb-4">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Target className="w-8 h-8" />, title: "Precision", desc: "Every stitch, every detail matters" },
              { icon: <Eye className="w-8 h-8" />, title: "Vision", desc: "Bringing your ideas to life" },
              { icon: <Award className="w-8 h-8" />, title: "Excellence", desc: "Uncompromising quality standards" },
              { icon: <Users className="w-8 h-8" />, title: "Partnership", desc: "Your success is our mission" },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-gold mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark-grey mb-2">{value.title}</h3>
                <p className="text-mid-grey">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light text-dark-grey mb-8">Certified & Compliant</h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="bg-white rounded-lg shadow-card p-6">
                <p className="text-sm font-semibold text-dark-grey">ISO 9001:2015</p>
                <p className="text-xs text-mid-grey mt-1">Quality Management</p>
              </div>
              <div className="bg-white rounded-lg shadow-card p-6">
                <p className="text-sm font-semibold text-dark-grey">GDPR Compliant</p>
                <p className="text-xs text-mid-grey mt-1">Data Protection</p>
              </div>
              <div className="bg-white rounded-lg shadow-card p-6">
                <p className="text-sm font-semibold text-dark-grey">Leather Working Group</p>
                <p className="text-xs text-mid-grey mt-1">Sustainable Sourcing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
