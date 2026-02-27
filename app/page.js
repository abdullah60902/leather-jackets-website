"use client";

import { motion } from "framer-motion";
import { Ruler, Palette, Package, Shield, Award, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DesignCarousel from "@/components/DesignCarousel";

export default function Home() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Bespoke Tailoring Services",
      description: "Precision-fit leather jackets tailored to your exact measurements. We specialize in made-to-measure sizing for men and women.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design & Branding",
      description: "Full customization options: from leather hides (cow, sheep, goat) to hardware, linings, and private label embossing.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Lifetime Leather Warranty",
      description: "Our premium genuine leather jackets are built to last. We guarantee our stitching and material quality.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Ethical Manufacturing",
      description: "Sustainable leather sourcing and UK-standard labor practices. Certified eco-friendly tanning processes.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Rapid Bulk Production",
      description: "Fast turnaround for wholesale orders. From prototype to production in 4-6 weeks for fashion startups.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Jackets Manufactured" },
    { value: "500+", label: "Brand Partners" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "4.9/5", label: "Google Reviews" },
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
            <h2 className="text-sm uppercase tracking-[0.5em] text-gold font-bold mb-4">World-Class Manufacturing</h2>
            <h3 className="text-4xl md:text-6xl font-light text-dark-grey">Redefining Luxury <span className="font-serif italic text-gold">Leather Apparel</span></h3>
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

      {/* Statistics Replacement Image */}
      {/* Design Showcase Carousel */}
      <DesignCarousel />

      {/* SEO Content Section - NEW */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading text-dark-grey mb-12 text-center">Why Choose ATSAS for Custom Leather Jacket Manufacturing?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-grey mb-3">1. UK Based Manufacturer</h3>
                <p className="text-mid-grey leading-relaxed">
                  UK based manufacturer with advanced production facilities in Pakistan, ATSAS combines British design standards with world-class leather craftsmanship to deliver products that meet international market expectations.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-grey mb-3">2. Genuine Leather Expertise</h3>
                <p className="text-mid-grey leading-relaxed">
                  We specialize in premium genuine leather jackets, working with high-quality sheepskin, cowhide, goat suede, and buffalo leather. Every piece is manufactured with strict quality control to ensure durability, comfort, and refined finishing.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-grey mb-3">3. Custom & Private Label Solutions</h3>
                <p className="text-mid-grey leading-relaxed">
                  From concept development to final production, we offer private label services. Custom designs, branding, labels, packaging, and specifications are tailored to your brand’s identity and market positioning.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-grey mb-3">4. Scalable Production Capacity</h3>
                <p className="text-mid-grey leading-relaxed">
                  Whether you are an emerging startup or an established fashion label, our production infrastructure supports flexible MOQs and large volume manufacturing with consistent quality standards.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-grey mb-3">5. Competitive Pricing</h3>
                <p className="text-mid-grey leading-relaxed">
                  Our vertically integrated supply chain and strategic manufacturing model allow us to offer competitive wholesale pricing while maintaining premium craftsmanship.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dark-grey mb-3">6. Reliable Global Export</h3>
                <p className="text-mid-grey leading-relaxed">
                  With streamlined logistics and export experience, we ensure timely production schedules and dependable international shipping.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg md:col-span-2 lg:col-span-3 lg:w-2/3 lg:mx-auto">
                <h3 className="text-xl font-bold text-dark-grey mb-3">7. Long-Term Partnership Approach</h3>
                <p className="text-mid-grey leading-relaxed">
                  At ATSAS, we focus on building lasting business relationships. Our team works closely with clients to support growth, product development, and long-term supply chain success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Advanced Techniques & Materials */}
      <section className="py-24 bg-dark-grey text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Printing Techniques */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm uppercase tracking-[0.5em] text-gold font-bold mb-6">Printing techniques</h2>
              <h3 className="text-4xl font-light mb-12">Advanced <span className="font-serif italic text-gold">Decoration Techniques</span></h3>
              
              <div className="space-y-8">
                {[
                  { title: "Screen Printing", desc: "The industry standard for large, simple designs (1-3 colors). Highly durable and cost-effective for bulk orders of 50+ items." },
                  { title: "Direct-to-Garment (DTG)", desc: "Uses special printers to spray ink directly onto cotton, ideal for detailed, photographic designs and small orders." },
                  { title: "Direct-to-Film (DTF)", desc: "A versatile, newer method that prints designs onto film, then transfers them to any fabric. Known for high durability and vibrant prints." },
                  { title: "Heat Transfer Vinyl (HTV)", desc: "Involves cutting designs from colored vinyl and heat-pressing them onto garments. Excellent for personalization." },
                  { title: "Embroidery", desc: "A key decoration technique for hoodies and hats, offering a premium, textured, and high-quality look." },
                  { title: "Puff Print", desc: "A screen-printing technique that creates a raised, 3D, and soft-touch texture on hoodies and t-shirts." }
                ].map((item, idx) => (
                  <div key={idx} className="group border-l border-gold/30 pl-6 hover:border-gold transition-colors duration-300">
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-gold transition-colors">{item.title}</h4>
                    <p className="text-off-white/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leather Materials */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 lg:mt-0"
            >
              <h2 className="text-sm uppercase tracking-[0.5em] text-gold font-bold mb-6">Premium Sourcing</h2>
              <h3 className="text-4xl font-light mb-12">Premium <span className="font-serif italic text-gold">Leather Hides</span></h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Cowhide", desc: "The most common, durable leather used for furniture, bags, belts, and automotive interiors." },
                  { title: "Sheepskin / Lambskin", desc: "Exceptionally soft, lightweight, and supple, ideal for garments, jackets, and gloves." },
                  { title: "Goatskin", desc: "Strong, flexible, and resistant to wear, often used for shoes, boots, and high-quality accessories." },
                  { title: "Buffalo", desc: "Similar to cowhide but thicker with a more prominent grain, often used for heavy-duty leather goods." }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                    <div className="w-12 h-1 bg-gold mb-6 group-hover:w-full transition-all duration-500" />
                    <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
                    <p className="text-off-white/60 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-gold/10 rounded-2xl border border-gold/20">
                <p className="text-gold italic font-serif">"Our materials are ethically sourced and processed using environmentally responsible tanning methods, ensuring luxury that doesn't compromise on values."</p>
              </div>
            </motion.div>
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
               <img 
                 src="https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200" 
                 className="w-full h-full object-cover" 
                 alt="ATSAS premium leather craftsmanship background" 
               />
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
                  GET IN TOUCH
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
