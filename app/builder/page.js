"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepIndicator from "@/components/configurator/StepIndicator";
import SelectionCard from "@/components/configurator/SelectionCard";
import ConfigSummary from "@/components/configurator/ConfigSummary";
import { Button } from "@/components/ui/Button";
import {
  jacketTypes,
  leatherTypes,
  finishOptions,
  colorPalette,
  stitchingStyles,
  hardwareOptions,
  collarStyles,
  liningOptions,
  weatherResistance,
} from "@/data/config";

const steps = [
  { id: "type", name: "Jacket Type" },
  { id: "leather", name: "Leather" },
  { id: "finish", name: "Finish" },
  { id: "color", name: "Color" },
  { id: "details", name: "Details" },
  { id: "features", name: "Features" },
  { id: "quantity", name: "Size & Quantity" },
];

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function BuilderPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  /* Config State */
  const [config, setConfig] = useState({
    jacketType: null,
    leatherType: null,
    finish: null,
    color: null,
    stitching: null,
    hardware: null,
    collar: null,
    lining: null,
    weatherResistance: null,
  });

  /* New State for Size & Quantity */
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [notes, setNotes] = useState("");

  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateQuantity = (size, delta) => {
    setSizeQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, (prev[size] || 0) + delta)
    }));
  };

  const totalQuantity = Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0);
  const meetsMinimum = totalQuantity >= 10;

  const canProceed = () => {
    const requiredFields = [
      config.jacketType,
      config.leatherType,
      config.finish,
      config.color,
      config.stitching, // Step 4 part 1
      config.collar,    // Step 5 part 1
    ];
    
    if (currentStep < 5) return requiredFields[currentStep] !== null;
    if (currentStep === 5) return config.collar && config.lining && config.weatherResistance;
    return true; // Step 6 is final
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /* Submit Logic */
  const handleSubmit = () => {
    if (!meetsMinimum) {
      alert("Minimum order quantity is 10 jackets");
      return;
    }

    // Calculate dynamic price
    let basePrice = config.jacketType?.basePrice || 450;
    let modifiers = [
      config.leatherType?.priceModifier,
      config.finish?.priceModifier,
      config.stitching?.priceModifier,
      config.hardware?.priceModifier,
      config.collar?.priceModifier,
      config.lining?.priceModifier,
      config.weatherResistance?.priceModifier
    ].reduce((a, b) => a + (b || 0), 0);
    
    const unitPrice = basePrice + modifiers;
    const finalTotalPrice = unitPrice * totalQuantity;

    const cartItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${config.jacketType?.name || "Jacket"}`,
      description: `${config.leatherType?.name}, ${config.finish?.name} Finish`,
      image: config.jacketType?.image, // Use the selected jacket type image
      price: unitPrice,
      color: config.color,
      sizes: sizeQuantities,
      totalQuantity: totalQuantity,
      totalPrice: finalTotalPrice,
      config: config, // Save full config
      logo: logoFile ? logoFile.name : null,
      reference: referenceFile ? referenceFile.name : null,
      notes: notes
    };

    addToCart(cartItem);
    router.push("/contact");
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Design Your <span className="text-gradient-gold font-normal">Perfect Jacket</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Craft a bespoke leather jacket tailored to your exact specifications
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator steps={steps} currentStep={currentStep} />

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Configuration Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-lg shadow-card p-8"
                >
                  {/* Step 0: Jacket Type */}
                  {currentStep === 0 && (
                    <StepContent title="Choose Your Jacket Style">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jacketTypes.map((type) => (
                          <SelectionCard
                            key={type.id}
                            item={type}
                            isSelected={config.jacketType?.id === type.id}
                            onSelect={() => updateConfig("jacketType", type)}
                          />
                        ))}
                      </div>
                    </StepContent>
                  )}

                  {/* Step 1: Leather Type */}
                  {currentStep === 1 && (
                    <StepContent title="Select Leather Type">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {leatherTypes.map((leather) => (
                          <SelectionCard
                            key={leather.id}
                            item={leather}
                            isSelected={config.leatherType?.id === leather.id}
                            onSelect={() => updateConfig("leatherType", leather)}
                          />
                        ))}
                      </div>
                    </StepContent>
                  )}

                  {/* Step 2: Finish */}
                  {currentStep === 2 && (
                    <StepContent title="Choose Finish">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {finishOptions.map((finish) => (
                          <SelectionCard
                            key={finish.id}
                            item={finish}
                            isSelected={config.finish?.id === finish.id}
                            onSelect={() => updateConfig("finish", finish)}
                          />
                        ))}
                      </div>
                    </StepContent>
                  )}

                  {/* Step 3: Color */}
                  {currentStep === 3 && (
                    <StepContent title="Pick Your Color">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {colorPalette.map((color) => (
                          <motion.div
                            key={color.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateConfig("color", color)}
                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                              config.color?.id === color.id
                                ? "border-gold shadow-glow"
                                : "border-light-grey hover:border-mid-grey"
                            }`}
                          >
                            <div
                              className="w-full aspect-square rounded-lg mb-3 border border-light-grey"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-sm font-medium text-dark-grey text-center">{color.name}</p>
                          </motion.div>
                        ))}
                      </div>
                    </StepContent>
                  )}

                  {/* Step 4: Details (Stitching & Hardware) */}
                  {currentStep === 4 && (
                    <StepContent title="Customize Details">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Stitching Style</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stitchingStyles.map((stitch) => (
                              <SelectionCard
                                key={stitch.id}
                                item={stitch}
                                isSelected={config.stitching?.id === stitch.id}
                                onSelect={() => updateConfig("stitching", stitch)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Hardware Finish</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hardwareOptions.map((hardware) => (
                              <SelectionCard
                                key={hardware.id}
                                item={hardware}
                                isSelected={config.hardware?.id === hardware.id}
                                onSelect={() => updateConfig("hardware", hardware)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </StepContent>
                  )}

                  {/* Step 5: Features (Collar, Lining, Weather) */}
                  {currentStep === 5 && (
                    <StepContent title="Additional Features">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Collar Style</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {collarStyles.map((collar) => (
                              <SelectionCard
                                key={collar.id}
                                item={collar}
                                isSelected={config.collar?.id === collar.id}
                                onSelect={() => updateConfig("collar", collar)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Inner Lining</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {liningOptions.map((lining) => (
                              <SelectionCard
                                key={lining.id}
                                item={lining}
                                isSelected={config.lining?.id === lining.id}
                                onSelect={() => updateConfig("lining", lining)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Weather Resistance</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {weatherResistance.map((weather) => (
                              <SelectionCard
                                key={weather.id}
                                item={weather}
                                isSelected={config.weatherResistance?.id === weather.id}
                                onSelect={() => updateConfig("weatherResistance", weather)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </StepContent>
                  )}

                  {/* Step 6: Size & Quantity (NEW) */}
                  {currentStep === 6 && (
                    <StepContent title="Size & Quantity">
                      <div className="space-y-8">
                         {/* Images Upload */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-3">Upload Logo (Optional)</label>
                                <div className="relative">
                                    <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="hidden" id="logo-upload-builder" />
                                    <label htmlFor="logo-upload-builder" className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-light-grey rounded-lg hover:border-gold transition-colors cursor-pointer text-center">
                                        {logoFile ? <span className="text-green-600 font-medium">{logoFile.name}</span> : <span className="text-mid-grey">Click to upload Logo</span>}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-3">Reference Image (Optional)</label>
                                <div className="relative">
                                    <input type="file" accept="image/*" onChange={(e) => setReferenceFile(e.target.files[0])} className="hidden" id="ref-upload-builder" />
                                    <label htmlFor="ref-upload-builder" className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-light-grey rounded-lg hover:border-gold transition-colors cursor-pointer text-center">
                                        {referenceFile ? <span className="text-green-600 font-medium">{referenceFile.name}</span> : <span className="text-mid-grey">Click to upload Reference</span>}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Size Matrix */}
                        <div>
                          <label className="block text-sm font-semibold text-dark-grey mb-3">Select Sizes & Quantities (Min 10 Total)</label>
                          <div className="bg-white rounded-lg border border-light-grey p-6 space-y-4">
                             {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => ( // Using explicit array or import standardSizes
                                <div key={size} className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-dark-grey w-16">{size}</span>
                                  <div className="flex items-center space-x-3">
                                    <button onClick={() => updateQuantity(size, -1)} className="w-8 h-8 rounded-lg bg-cream hover:bg-beige transition-colors flex items-center justify-center">-</button>
                                    <input
                                      type="number"
                                      min="0"
                                      value={sizeQuantities[size] || 0}
                                      onChange={(e) => setSizeQuantities(prev => ({...prev, [size]: Math.max(0, parseInt(e.target.value) || 0)}))}
                                      className="w-16 text-center font-semibold text-dark-grey border border-light-grey rounded-lg py-1 focus:outline-none focus:border-gold"
                                    />
                                    <button onClick={() => updateQuantity(size, 1)} className="w-8 h-8 rounded-lg bg-cream hover:bg-beige transition-colors flex items-center justify-center">+</button>
                                  </div>
                                </div>
                             ))}
                          </div>
                           <div className={`mt-4 p-4 rounded-lg ${meetsMinimum ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                            <p className={`text-sm font-medium ${meetsMinimum ? "text-green-800" : "text-red-800"}`}>
                              Total Quantity: {totalQuantity} jackets
                              {!meetsMinimum && ` (Need ${10 - totalQuantity} more to meet MOQ)`}
                              {meetsMinimum && " ✓ Minimum requirement met!"}
                            </p>
                          </div>
                        </div>

                         {/* Notes */}
                        <div>
                           <label className="block text-sm font-semibold text-dark-grey mb-3">Special Instructions (Optional)</label>
                           <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold resize-none" placeholder="Add notes..." />
                        </div>
                      </div>
                    </StepContent>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-beige">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    
                    {currentStep < steps.length - 1 ? (
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={!canProceed()}
                      >
                        Continue
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleSubmit} disabled={!meetsMinimum}>
                        Get in Touch
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <ConfigSummary config={config} isOpen={summaryOpen} onToggle={() => setSummaryOpen(!summaryOpen)} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StepContent({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-dark-grey mb-6">{title}</h2>
      {children}
    </div>
  );
}
