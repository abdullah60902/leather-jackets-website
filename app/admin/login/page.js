"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: null });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setStatus({ loading: false, error: data.message || "Login failed" });
      }
    } catch (err) {
      setStatus({ loading: false, error: "Something went wrong" });
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 border border-beige"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-dark-grey text-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-light text-dark-grey">Admin <span className="text-gold font-normal">Panel</span></h1>
            <p className="text-mid-grey mt-2">Secure access for ATSAS management</p>
          </div>

          {status.error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{status.error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-grey mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-light-grey rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-off-white/50"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-grey mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-light-grey rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-off-white/50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-dark-grey text-white py-4 rounded-xl font-semibold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status.loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-mid-grey">
            © {new Date().getFullYear()} ATSAS Ltd. Restricted access only.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
