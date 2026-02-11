"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Check, Upload, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { preDesignedJackets } from "@/data/predesigned";
import { standardSizes } from "@/data/config";

export default function DesignDetailPage() {
  const params = useParams();
  const jacket = preDesignedJackets.find(j => j.id === params.id);

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(jacket?.availableColors[0] || "");
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [notes, setNotes] = useState("");

  if (!jacket) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light text-dark-grey mb-4">Design Not Found</h1>
          <a href="/designs" className="text-gold hover:underline">← Back to Designs</a>
        </div>
      </div>
    );
  }

  const updateQuantity = (size, delta) => {
    setSizeQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, (prev[size] || 0) + delta)
    }));
  };

  const totalQuantity = Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0);
  const meetsMinimum = totalQuantity >= 10;
  const totalPrice = totalQuantity * jacket.price;

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoFile(file);
  };

  const handleReferenceUpload = (e) => {
    const file = e.target.files[0];
    if (file) setReferenceFile(file);
  };

  /* Use Router and Cart */
  const router = useRouter();
  const { addToCart } = useCart();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meetsMinimum) {
      alert("Minimum order quantity is 10 jackets");
      return;
    }

    // Prepare Cart Item
    const cartItem = {
      id: jacket.id,
      name: jacket.name,
      description: jacket.description,
      image: jacket.images[0],
      price: jacket.price,
      color: selectedColor,
      sizes: sizeQuantities,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
      logo: logoFile ? logoFile.name : null,
      reference: referenceFile ? referenceFile.name : null,
      notes: notes
    };

    addToCart(cartItem);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Left: Images */}
            <div>
              {/* Main Image */}
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] bg-cream rounded-lg overflow-hidden mb-4"
              >
                <img
                  src={jacket.images[currentImage]}
                  alt={jacket.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {jacket.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`aspect-square bg-cream rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === index ? "border-gold" : "border-transparent hover:border-mid-grey"
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Details */}
              <div className="mt-8 bg-white rounded-lg shadow-card p-6">
                <h3 className="text-lg font-semibold text-dark-grey mb-4">Features</h3>
                <ul className="space-y-2">
                  {jacket.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-mid-grey">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-beige">
                  <p className="text-sm text-mid-grey mb-1">Material</p>
                  <p className="font-medium text-dark-grey">{jacket.material}</p>
                </div>
              </div>
            </div>

            {/* Right: Order Form */}
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-dark-grey mb-2">{jacket.name}</h1>
              <p className="text-lg text-mid-grey mb-6">{jacket.description}</p>
              
              <div className="flex items-baseline space-x-3 mb-8">
                <span className="text-4xl font-light text-dark-grey">£{jacket.price}</span>
                <span className="text-sm text-mid-grey">per jacket</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold text-dark-grey mb-3">
                    Select Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {jacket.availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? "border-gold bg-gold/5 text-dark-grey font-medium"
                            : "border-light-grey text-mid-grey hover:border-mid-grey"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size & Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-dark-grey mb-3">
                    Select Sizes & Quantities
                    <span className="ml-2 text-xs font-normal text-mid-grey">(Minimum 10 total)</span>
                  </label>
                  <div className="bg-white rounded-lg shadow-card p-6 space-y-4">
                    {standardSizes.map((size) => (
                      <div key={size} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-dark-grey w-16">{size}</span>
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(size, -1)}
                            className="w-8 h-8 rounded-lg bg-cream hover:bg-beige transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4 text-dark-grey" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={sizeQuantities[size] || 0}
                            onChange={(e) => setSizeQuantities(prev => ({
                              ...prev,
                              [size]: Math.max(0, parseInt(e.target.value) || 0)
                            }))}
                            className="w-16 text-center font-semibold text-dark-grey border border-light-grey rounded-lg py-1 focus:outline-none focus:border-gold"
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(size, 1)}
                            className="w-8 h-8 rounded-lg bg-cream hover:bg-beige transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4 text-dark-grey" />
                          </button>
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

                {/* Logo Upload (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-dark-grey mb-3">
                    Upload Logo <span className="text-xs font-normal text-mid-grey">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-light-grey rounded-lg hover:border-gold transition-colors cursor-pointer"
                    >
                      {logoFile ? (
                        <div className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-dark-grey">{logoFile.name}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setLogoFile(null); }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-6 h-6 text-mid-grey mx-auto mb-2" />
                          <p className="text-sm text-mid-grey">Click to upload logo (PNG, SVG, JPG)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Reference Image Upload (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-dark-grey mb-3">
                    Upload Reference Image <span className="text-xs font-normal text-mid-grey">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReferenceUpload}
                      className="hidden"
                      id="reference-upload"
                    />
                    <label
                      htmlFor="reference-upload"
                      className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-light-grey rounded-lg hover:border-gold transition-colors cursor-pointer"
                    >
                      {referenceFile ? (
                        <div className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-dark-grey">{referenceFile.name}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setReferenceFile(null); }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-6 h-6 text-mid-grey mx-auto mb-2" />
                          <p className="text-sm text-mid-grey">Upload design reference or inspiration</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-dark-grey mb-3">
                    Special Instructions <span className="text-xs font-normal text-mid-grey">(Optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="4"
                    placeholder="Any special requirements or customizations..."
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Summary & Submit */}
                <div className="bg-dark-grey text-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-off-white/70">Total Quantity:</span>
                    <span className="text-2xl font-semibold">{totalQuantity} jackets</span>
                  </div>
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                    <span className="text-off-white/70">Estimated Total:</span>
                    <span className="text-3xl font-light">£{totalPrice.toLocaleString()}</span>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gold hover:bg-gold-light border-gold"
                    disabled={!meetsMinimum}
                  >
                    {meetsMinimum ? "Proceed to Checkout" : `Add ${10 - totalQuantity} More to Order`}
                  </Button>
                  <p className="text-xs text-off-white/50 text-center mt-3">
                    VAT will be calculated at checkout
                  </p>
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
