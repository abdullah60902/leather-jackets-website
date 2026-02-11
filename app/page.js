"use client";

import { motion } from "framer-motion";
import { Ruler, Palette, Package, Shield, Award, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FloatingActions from "@/components/ui/FloatingActions";

export default function Home() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Precision Tailoring",
      description: "Every measurement matters. Custom sizing for perfect fit.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Unlimited Customization",
      description: "From leather type to hardware finish, every detail is yours to choose.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Bulk Manufacturing",
      description: "MOQ 10 jackets. Volume discounts up to 25% for 500+ units.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "Premium materials, expert craftsmanship, lifetime warranty.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "UK Certified",
      description: "ISO certified manufacturing, GDPR compliant operations.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Turnaround",
      description: "4-6 weeks production. Express options available.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Jackets Crafted" },
    { value: "500+", label: "Brand Partners" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "4.9/5", label: "Customer Rating" },
  ];

  return (
    <main className="bg-dark-grey min-h-screen">
      <Navbar />
      <Hero />

      {/* Interactive Feature Grid */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-grey to-transparent opacity-10" />
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-sm uppercase tracking-[0.5em] text-gold font-bold mb-4">Our Excellence</h2>
            <h3 className="text-4xl md:text-6xl font-light text-dark-grey">Precision in Every <span className="font-serif italic text-gold">Stitch</span></h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group p-12 bg-off-white hover:bg-dark-grey transition-all duration-700 rounded-xl text-left border border-beige/50"
              >
                <div className="text-gold group-hover:scale-110 transition-transform duration-500 mb-8 p-4 bg-white rounded-lg w-fit shadow-sm">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-semibold text-dark-grey group-hover:text-white mb-4 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-mid-grey group-hover:text-off-white/70 leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - DARK CINEMATIC */}
      <section className="py-40 bg-dark-grey relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gold/5 blur-[150px] -rotate-12 transform translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[50%] h-full bg-gold/5 blur-[150px] rotate-12 transform -translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h4 className="text-6xl md:text-7xl font-serif text-gold mb-3 tracking-tighter">
                  <AnimatedCounter value={stat.value} />
                </h4>
                <p className="text-off-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-off-white border-t border-beige/30">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-dark-grey rounded-3xl p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10">
               <img src="https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-light mb-8">Ready to define your <br/><span className="font-serif italic text-gold font-normal">Brand Identity?</span></h2>
              <p className="text-off-white/60 mb-12 max-w-2xl mx-auto text-lg font-light">
                Join 500+ global brands who trust ATSAS for their premium manufacturing needs. 
                Experience the heritage of craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="/designs" className="inline-block px-10 py-5 bg-gold text-dark-grey rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 duration-300">
                  BROWSE ALL DESIGNS
                </a>
                <a href="/bulk" className="inline-block px-10 py-5 border border-white/30 text-white rounded-full font-medium hover:bg-white hover:text-dark-grey transition-all transform hover:scale-105 duration-300">
                  BULK QUOTE CALCULATOR
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FloatingActions />
      <Footer />
    </main>
  );
}
