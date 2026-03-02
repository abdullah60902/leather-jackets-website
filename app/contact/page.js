"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    quantity: "10-24",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to send message");
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        quantity: "10-24",
        message: "",
      });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Get In <span className="text-gradient-gold font-normal">Touch</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Have a project in mind? Our team is ready to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-card p-8"
            >
              <h2 className="text-2xl font-semibold text-dark-grey mb-6">Send us a message</h2>
              
              {status.success ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you shortly.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setStatus({ ...status, success: false })}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-grey mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-grey mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                      placeholder="+44 7375 792237"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">Estimated Quantity</label>
                    <select 
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                    >
                      <option>10-24</option>
                      <option>25-49</option>
                      <option>50-99</option>
                      <option>100-249</option>
                      <option>250+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {status.error && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    type="submit"
                    disabled={status.submitting}
                  >
                    {status.submitting ? (
                      <span className="flex items-center space-x-2">
                        <Send className="w-5 h-5 animate-pulse" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-card p-8">
                <h3 className="text-xl font-semibold text-dark-grey mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-grey mb-1">Address</p>
                      <p className="text-mid-grey">Hennerton way, High Wycombe, <br />HP13 7UE, United Kingdom</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-grey mb-1">Phone & WhatsApp</p>
                      <a href="tel:07375792237" className="text-mid-grey hover:text-gold transition-colors">07375792237</a>
                      <div className="mt-2">
                        <a 
                          href="https://wa.me/447375792237" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-sm font-semibold text-gold hover:underline"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2Z"/></svg>
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-grey mb-1">Email</p>
                      <a href="mailto:sales@atsasci.com" className="text-mid-grey hover:text-gold transition-colors">sales@atsasci.com</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-grey mb-1">Business Hours</p>
                      <p className="text-mid-grey">Monday - Friday: 9:00 - 18:00<br />Saturday: 10:00 - 16:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

