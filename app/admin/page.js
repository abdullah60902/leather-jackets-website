"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Search, 
  LogOut, 
  Mail, 
  Phone, 
  Building2, 
  Clock,
  ArrowRight,
  ExternalLink,
  RefreshCcw,
  CheckCircle2,
  Copy,
  Check,
  X,
  Send,
  AlertCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const router = useRouter();

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: replyingTo.email,
          subject: `ATSAS Inquiry: Follow-up regarding your request`,
          body: replyMessage,
          customerName: replyingTo.firstName
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReplyingTo(null);
        setReplyMessage("");
        alert("Reply sent successfully!");
        // Refresh to maybe show 'replied' status in future
        fetchSubmissions();
      } else {
        setSendError(data.error || "Failed to send email");
      }
    } catch (err) {
      setSendError("An unexpected error occurred");
    } finally {
      setIsSending(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data || []);
        setFetchError(null);
      } else {
        setFetchError(data.message || "Failed to load submissions");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setFetchError("System Error: Could not reach the API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    router.push("/admin/login");
  };

  const filtered = submissions.filter(s => 
    s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Inquiries", value: submissions.length, icon: MessageSquare, color: "bg-blue-500" },
    { label: "Recent (7 Days)", value: submissions.filter(s => {
      const date = new Date(s.date);
      const now = new Date();
      return (now - date) / (1000 * 60 * 60 * 24) <= 7;
    }).length, icon: Calendar, color: "bg-gold" },
    { label: "Bulk (100+)", value: submissions.filter(s => s.quantity?.includes("100") || s.quantity?.includes("250")).length, icon: Users, color: "bg-green-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <RefreshCcw className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6 md:p-12 mt-20 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-light text-dark-grey mb-2">Operations <span className="font-normal text-gold">Dashboard</span></h1>
            <p className="text-mid-grey">Manage and respond to manufacturer inquiries.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchSubmissions}
              className="p-3 bg-white rounded-xl shadow-sm border border-beige hover:bg-cream transition-colors text-dark-grey"
              title="Refresh"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium border border-red-100"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-card border border-beige flex items-center gap-6"
            >
              <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-semibold text-mid-grey uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-dark-grey">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Error Alert */}
        {fetchError && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 text-red-600"
          >
            <AlertCircle className="w-6 h-6" />
            <div>
              <p className="font-bold">Connection Issue</p>
              <p className="text-sm opacity-90">{fetchError}</p>
              <p className="text-[10px] mt-1 font-mono uppercase">Check Vercel Environment Variables: GITHUB_TOKEN, GITHUB_REPO, GITHUB_OWNER</p>
            </div>
          </motion.div>
        )}

        {/* Search and List */}
        <div className="bg-white rounded-2xl shadow-card border border-beige overflow-hidden">
          <div className="p-6 border-b border-beige bg-white/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-dark-grey">Recent Inquiries</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mid-grey" />
              <input 
                type="text" 
                placeholder="Search by name, email, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-beige rounded-xl bg-off-white/50 focus:ring-2 focus:ring-gold outline-none w-full md:w-80 transition-all"
              />
            </div>
          </div>

          <div className="max-h-[700px] overflow-y-auto divide-y divide-beige scrollbar-thin scrollbar-thumb-gold/20">
            {filtered.length > 0 ? filtered.map((sub, i) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-cream/30 transition-colors group"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Client Info */}
                  <div className="lg:w-1/3 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-dark-grey group-hover:text-gold transition-colors">
                        {sub.firstName} {sub.lastName}
                      </h3>
                      <span className="text-[10px] bg-dark-grey text-white px-2 py-1 rounded tracking-wide font-bold">
                        {new Date(sub.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-mid-grey">
                      <Mail className="w-4 h-4 text-gold" /> {sub.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-mid-grey">
                      <Phone className="w-4 h-4 text-gold" /> {sub.phone || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-mid-grey">
                      <Building2 className="w-4 h-4 text-gold" /> {sub.company || 'Private Client'}
                    </div>
                  </div>

                  {/* Right: Message & Metadata */}
                  <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-beige rounded-full text-xs font-bold text-dark-grey uppercase">
                          Qty: {sub.quantity}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-mid-grey font-medium">
                          <Clock className="w-3 h-3" /> {new Date(sub.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <p className="text-dark-grey/80 text-sm leading-relaxed mb-4 italic border-l-2 border-gold/30 pl-4 py-1">
                        "{sub.message}"
                      </p>

                      {sub.categories && sub.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {sub.categories
                            .filter(cat => !cat.toLowerCase().includes('bomber') && !cat.toLowerCase().includes('biker'))
                            .map((cat, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold rounded uppercase">
                                {cat}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-4 md:mt-0">
                      <button 
                        onClick={() => handleCopyEmail(sub.email)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                          copiedEmail === sub.email 
                            ? "bg-green-50 text-green-600 border-green-200" 
                            : "bg-white text-mid-grey border-beige hover:bg-cream"
                        }`}
                      >
                        {copiedEmail === sub.email ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedEmail === sub.email ? "Copied!" : "Copy Email"}
                      </button>
                      <button 
                        onClick={() => {
                          setReplyingTo(sub);
                          setReplyMessage(`Dear ${sub.firstName},\n\nThank you for your inquiry about ${sub.quantity} pieces. We have reviewed your request and would like to discuss it further...`);
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gold text-dark-grey rounded-full font-bold text-sm hover:scale-105 transition-all shadow-md active:scale-95 whitespace-nowrap"
                      >
                        Reply via Email <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="p-20 text-center">
                <p className="text-mid-grey">No matching inquiries found.</p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-mid-grey font-medium">
          Note: This dashboard is connected to your GitHub Database for live updates.
        </p>
      </main>

      {/* Reply Modal */}
      <AnimatePresence>
        {replyingTo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSending && setReplyingTo(null)}
              className="absolute inset-0 bg-dark-grey/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 border border-beige"
            >
              <div className="p-6 border-b border-beige flex items-center justify-between bg-cream/30">
                <div>
                  <h3 className="text-xl font-bold text-dark-grey">Reply to Inquiry</h3>
                  <p className="text-sm text-mid-grey">Sending to: <span className="text-gold font-medium">{replyingTo.email}</span></p>
                </div>
                <button 
                  onClick={() => setReplyingTo(null)}
                  disabled={isSending}
                  className="p-2 hover:bg-beige rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="w-6 h-6 text-mid-grey" />
                </button>
              </div>

              <form onSubmit={handleSendReply} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-dark-grey mb-2 uppercase tracking-wider">Message</label>
                  <textarea 
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={10}
                    required
                    className="w-full p-4 bg-off-white border border-beige rounded-2xl focus:ring-2 focus:ring-gold outline-none resize-none text-dark-grey leading-relaxed"
                    placeholder="Type your reply here..."
                  />
                </div>

                {sendError && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{sendError}</p>
                  </div>
                )}

                <div className="flex items-center justify-end gap-4 pt-2">
                  <button 
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="px-6 py-3 text-sm font-bold text-mid-grey hover:text-dark-grey transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSending}
                    className="flex items-center gap-2 px-8 py-3 bg-gold text-dark-grey rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:grayscale"
                  >
                    {isSending ? (
                      <>Sending... <RefreshCcw className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Send Professional Reply <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
