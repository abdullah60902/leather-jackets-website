"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Scissors, 
  Ruler, 
  Settings, 
  Palette, 
  Layers, 
  Shield, 
  Zap, 
  Droplets, 
  Printer, 
  Tag, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  Maximize,
  CheckCircle2,
  Box
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Premium Full-Grain Leather Selection",
    description: "Only the finest full-grain hides are selected and hand-inspected for natural texture, strength, and authenticity.",
    image: "/img/Full-Grain.png",
    details: "We partner exclusively with LWG-certified tanneries to ensure ethical sourcing and superior hide quality."
  },
  {
    number: "02",
    title: "Precision Hand Cutting",
    description: "Expert artisans cut each panel with care to maintain perfect alignment, reduce waste, and preserve leather integrity.",
    image: "/img/Precision-Hand-Cutting.png",
    details: "Every curve and seam is mapped by hand to respect the natural grain of the hide."
  },
  {
    number: "03",
    title: "Reinforced Luxury Stitching",
    description: "Industrial-strength stitching combined with artisan finishing ensures durability and refined luxury appearance.",
    image: "/img/Reinforced-Luxury-Stitching.png",
    details: "We use high-tensile bonded threads that resist fraying and maintain structural integrity for a lifetime."
  },
  {
    number: "04",
    title: "Premium Hardware & Fine Detailing",
    description: "Solid brass zippers, custom buttons, and silk linings are carefully installed for maximum luxury impact.",
    image: "/img/Premium-Hardware.png",
    details: "Featuring YKK Excella zippers and custom-engraved hardware that defines the ATSAS signature."
  },
  {
    number: "05",
    title: "Factory-Direct Manufacturing",
    description: "Each jacket is crafted in-house with strict quality control, ensuring a flawless finish and real leather authenticity.",
    image: "/img/Factory-Direct.png",
    details: "By manufacturing in-house, we eliminate traditional retail markups while maintaining total quality oversight."
  }
];

const premiumFeatures = [
  {
    icon: <Maximize className="w-6 h-6" />,
    title: "Custom Size & Perfect Fit",
    description: "Bespoke tailoring to your exact body measurements for a silhouette that is uniquely yours."
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Personalized Color & Finishes",
    description: "Choose from a curated palette of artisanal dyes, matte, semi-gloss, or vintage patinas."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Logo & Name Customization",
    description: "Personalize your garment with custom embroidery, laser-etched hardware, or embossed insignia."
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Multi-Step Quality Inspection",
    description: "Every jacket undergoes a rigorous 12-point inspection before it leaves our atelier."
  },
  {
    icon: <Box className="w-6 h-6" />,
    title: "Secure Premium Packaging",
    description: "Luxury presentation boxes and dust bags designed for safe, carbon-neutral global delivery."
  }
];

export default function CustomizationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-dark-grey text-white">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1521446704028-acfa7574762b?auto=format&fit=crop&q=80&w=1920" 
               className="w-full h-full object-cover opacity-20" 
               alt="Craftsmanship" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-dark-grey via-dark-grey/40 to-dark-grey" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block">The Art of Manufacturing</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight">
                Crafting <span className="text-gold font-serif italic font-normal">Excellence</span>
              </h1>
              <p className="text-lg md:text-xl text-off-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Discover the meticulous journey of an ATSAS leather jacket. From the first hide selection to the final hand-finish, luxury is built into every fiber.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 5-Step Craftsmanship Process */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-28">
              <h2 className="text-3xl md:text-5xl font-light text-dark-grey mb-6 tracking-tight">
                Craftsmanship <span className="font-serif italic text-gold">Process</span>
              </h2>
              <div className="w-24 h-px bg-gold/50 mx-auto" />
            </div>

            <div className="space-y-40 md:space-y-56 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}
                >
                  {/* Image Part */}
                  <div className="w-full md:w-1/2 group relative">
                    <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-luxury relative">
                      <img 
                        src={step.image} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        alt={step.title} 
                      />
                      <div className="absolute inset-0 bg-dark-grey/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    {/* Decorative border */}
                    <div className={`absolute -inset-4 border border-gold/10 -z-10 rounded-sm ${index % 2 === 0 ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'}`} />
                  </div>

                  {/* Text Part */}
                  <div className="w-full md:w-1/2">
                    <span className="text-7xl md:text-9xl font-serif text-gold/10 block mb-6 leading-none">
                      {step.number}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-light text-dark-grey mb-6 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-lg text-mid-grey font-light leading-relaxed mb-8">
                      {step.description}
                    </p>
                    <div className="pt-6 border-t border-beige">
                      <p className="text-sm font-light text-gold italic uppercase tracking-widest">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Feature Points Grid */}
        <section className="py-32 bg-[#FAF9F6]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Uncompromising Standards</span>
              <h2 className="text-3xl md:text-5xl font-light text-dark-grey mb-6">Premium Features</h2>
              <div className="w-20 h-px bg-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {premiumFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-10 rounded-sm shadow-sm border border-beige/30 hover:shadow-luxury transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-[#FAF9F6] text-gold rounded-full flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-dark-grey mb-4 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-mid-grey font-light leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 bg-white relative overflow-hidden">
          {/* Subtle background abstract */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full -mr-32" />
          
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto px-8 py-20 rounded-sm bg-dark-grey text-white border border-gold/20 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
                  Create Your <br />
                  <span className="font-serif italic text-gold font-normal">Signature</span> Leather Jacket
                </h2>
                <p className="text-off-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
                  Every masterpiece begins with a conversation. Start your bespoke production journey with our master artisans today.
                </p>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="bg-gold text-dark-grey hover:bg-white hover:text-dark-grey px-12 py-7 h-auto font-bold tracking-[0.2em] text-xs transition-all duration-500 shadow-xl"
                  >
                    START CUSTOM ORDER <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
