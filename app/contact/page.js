"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-grey mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-grey mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-grey mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your Company Ltd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-grey mb-2">Estimated Quantity</label>
                  <select className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors">
                    <option>10-24 jackets</option>
                    <option>25-49 jackets</option>
                    <option>50-99 jackets</option>
                    <option>100-249 jackets</option>
                    <option>250+ jackets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-grey mb-2">Message</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border border-light-grey rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
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
                      <p className="text-mid-grey">123 Leather Lane, Shoreditch<br />London E1 6AN, United Kingdom</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-grey mb-1">Phone</p>
                      <p className="text-mid-grey">+44 20 7946 0958</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-grey mb-1">Email</p>
                      <p className="text-mid-grey">orders@luxeleather.co.uk</p>
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

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg shadow-card overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4!2d-0.0759!3d51.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMxJzI3LjgiTiAwwrAwNCczMy4yIlc!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
