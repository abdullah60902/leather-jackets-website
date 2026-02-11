"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Leather Jacket Care",
    excerpt: "Learn how to maintain and preserve your premium leather jacket for decades to come.",
    author: "James Mitchell",
    date: "2026-02-08",
    category: "Care & Maintenance",
    image: "https://placehold.co/800x500/f5f5f4/8b5a2b?text=Leather+Care",
    slug: "leather-jacket-care-guide"
  },
  {
    id: 2,
    title: "5 Trends Shaping Custom Leather Manufacturing in 2026",
    excerpt: "Discover the latest innovations and trends in bespoke leather jacket production.",
    author: "Sarah Chen",
    date: "2026-02-05",
    category: "Industry Insights",
    image: "https://placehold.co/800x500/f5f5f4/8b5a2b?text=2026+Trends",
    slug: "leather-trends-2026"
  },
  {
    id: 3,
    title: "How to Choose the Right Leather Type for Your Brand",
    excerpt: "A comprehensive comparison of nappa, full-grain, suede, and patent leather.",
    author: "Marcus Thompson",
    date: "2026-02-01",
    category: "Buying Guide",
    image: "https://placehold.co/800x500/f5f5f4/8b5a2b?text=Leather+Types",
    slug: "choosing-leather-type"
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-4">
              Leather <span className="text-gradient-gold font-normal">Journal</span>
            </h1>
            <p className="text-lg text-mid-grey max-w-2xl mx-auto">
              Insights, guides, and stories from the world of luxury leather manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-card overflow-hidden group hover:shadow-float transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video bg-cream overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-mid-grey mb-3">
                      <span className="px-3 py-1 bg-cream rounded-full">{post.category}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-dark-grey mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-mid-grey mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-beige">
                      <div className="flex items-center space-x-2 text-sm text-mid-grey">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gold font-medium group-hover:translate-x-1 transition-transform">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-dark-grey text-white rounded-lg p-12 text-center">
              <h2 className="text-3xl font-light mb-4">
                Stay <span className="text-gold font-normal">Informed</span>
              </h2>
              <p className="text-off-white/70 mb-8">
                Subscribe to our newsletter for industry insights, manufacturing tips, and exclusive offers
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gold text-white rounded-lg hover:bg-gold-light transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
