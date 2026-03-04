"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/public/img/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-grey text-off-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6 h-16 w-32 relative">
              <Image
                src={logo}
                alt="ATSAS Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm text-off-white/70 leading-relaxed mb-6">
              Your Global Leather and Apparel Manufacturer Since 2010
            </p>
            <div className="flex space-x-4">
              <a href="https://www.tiktok.com/@ATSASCI" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
              <a href="https://www.instagram.com/ATSASUK" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/447375792237" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 2Z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/designs" className="text-sm text-off-white/70 hover:text-gold transition-colors">Ready-Made Designs</Link></li>
              <li><Link href="/customization" className="text-sm text-off-white/70 hover:text-gold transition-colors">Customization Options</Link></li>
              <li><Link href="/bulk" className="text-sm text-off-white/70 hover:text-gold transition-colors">Bulk Orders</Link></li>
              <li><Link href="/about" className="text-sm text-off-white/70 hover:text-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-off-white/70 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-off-white/70 hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/faq" className="text-sm text-off-white/70 hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-gold flex-shrink-0" />
                <span className="text-sm text-off-white/70">Hennerton way, High Wycombe, HP13 7UE</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm text-off-white/70">07375792237</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm text-off-white/70">sales@atsasci.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-off-white/10 pt-8 flex flex-col items-center justify-center">
          <p className="text-xs text-off-white/50 text-center">
            © {currentYear} ATSAS Ltd. All rights reserved. Registered in England & Wales.
          </p>
        </div>
      </div>
    </footer>
  );
}
