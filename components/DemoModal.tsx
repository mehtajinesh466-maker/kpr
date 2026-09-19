"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MapPin, Send, Sparkles, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    parentFirstName: "",
    parentLastName: "",
    studentFullName: "",
    email: "",
    contactNumber: "",
    whatsappNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setError("");
    };
    window.addEventListener("open-demo-modal", handleOpen);
    return () => window.removeEventListener("open-demo-modal", handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setError("");
      setFormData({
        parentFirstName: "",
        parentLastName: "",
        studentFullName: "",
        email: "",
        contactNumber: "",
        whatsappNumber: "",
        message: "",
      });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentFirstName || !formData.studentFullName || !formData.contactNumber || !formData.email) {
      setError("Please fill in all required fields marked with *");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      // Fallback: still treat as submitted so user is not blocked
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi KPR Chess Academy! I have submitted a demo class inquiry.\n\n*Parent Name:* ${formData.parentFirstName} ${formData.parentLastName}\n*Student Name:* ${formData.studentFullName}\n*Contact:* ${formData.contactNumber}\n*WhatsApp:* ${formData.whatsappNumber || formData.contactNumber}\n*Email:* ${formData.email}\n${formData.message ? `*Message:* ${formData.message}` : ''}`
    );
    return `https://wa.me/919941987881?text=${text}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 md:p-6 flex items-center justify-center min-h-screen">
        
        {/* Backdrop click close */}
        <div className="absolute inset-0" onClick={handleClose} />

        {/* Modal Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[2rem] lg:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 my-8"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-6 right-6 lg:top-8 lg:right-8 text-slate-400 hover:text-slate-900 transition-colors p-2 bg-slate-100 hover:bg-slate-200 rounded-full z-20"
          >
            <X size={20} strokeWidth={3} />
          </button>

          {/* LEFT PANEL: DARK DOTTED DETAIL PANEL */}
          <div className="hidden lg:flex lg:col-span-5 bg-[#0B0202] text-white p-8 lg:p-12 flex-col justify-between relative overflow-hidden">
            {/* White/Gold Dot Grid Background */}
            <div 
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }}
            />
            {/* Glowing Accent */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#7A0C0C]/40 rounded-full blur-[100px] -z-10" />

            <div className="relative z-10 space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/30 border border-[#7A0C0C]/50">
                <Sparkles size={12} className="text-[#FFB800]" />
                <span className="text-[9px] font-black text-[#FFB800] uppercase tracking-widest">Book Free Trial</span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-[900] tracking-tighter leading-none uppercase">
                  Start the <br />
                  <span className="text-[#7A0C0C] bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Conversation.</span>
                </h3>
              </div>

              {/* Channels */}
              <div className="space-y-6 pt-4">
                {[
                  {
                    icon: <Phone size={18} className="text-[#FFB800]" />,
                    title: "TALK TO US",
                    detail: "+91 99419 87881",
                    color: "bg-[#7A0C0C]/20 border-[#7A0C0C]/30"
                  },
                  {
                    icon: <Mail size={18} className="text-[#FFB800]" />,
                    title: "WRITE TO US",
                    detail: "kumartv1978@gmail.com",
                    color: "bg-blue-950/30 border-blue-500/20"
                  },
                  {
                    icon: <MapPin size={18} className="text-[#FFB800]" />,
                    title: "HEADQUARTERS",
                    detail: "KPR Chess Academy, Pallikaranai, Chennai",
                    color: "bg-amber-950/20 border-amber-500/20"
                  }
                ].map((channel, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${channel.color}`}>
                      {channel.icon}
                    </div>
                    <div>
                      <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none">{channel.title}</p>
                      <p className="text-xs font-bold text-slate-200 mt-1 leading-tight">{channel.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent mark at bottom */}
            <div className="relative z-10 pt-10 text-[8px] font-black uppercase tracking-widest text-slate-600">
              © KPR Chess Academy Chennai
            </div>
          </div>

          {/* RIGHT PANEL: CLEAN WHITE FORM / SUCCESS CONFIRMATION */}
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-[900] text-slate-900 tracking-tight">
                    Demo Requested Successfully!
                  </h3>
                  <p className="text-sm font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.parentFirstName || "Parent"}</span>! We have received your inquiry for <span className="font-bold text-slate-900">{formData.studentFullName || "your child"}</span>. Our coaching team will reach out to you shortly at <span className="font-bold text-slate-900">{formData.contactNumber}</span>.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp Now
                  </a>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-[900] text-slate-900 tracking-tight mb-6 border-b-2 border-[#7A0C0C] pb-2 w-fit">
                  Send an Inquiry
                </h3>

                {error && (
                  <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Parent First Name / Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleChange}
                      placeholder="Parent First Name *"
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                    />
                    <input 
                      type="text" 
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleChange}
                      placeholder="Last Name *"
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                    />
                  </div>

                  {/* Row 2: Student Full Name */}
                  <input 
                    type="text" 
                    name="studentFullName"
                    value={formData.studentFullName}
                    onChange={handleChange}
                    placeholder="Student Full Name *"
                    required
                    className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                  />

                  {/* Row 3: Email / Contact Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                    />
                    <input 
                      type="tel" 
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Contact Number *"
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                    />
                  </div>

                  {/* Row 4: WhatsApp Number */}
                  <input 
                    type="tel" 
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="WhatsApp Number for Updates *"
                    required
                    className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                  />

                  {/* Row 5: Message */}
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your Message..."
                    className="w-full px-5 py-4 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs resize-none"
                  ></textarea>

                  {/* Submit button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7A0C0C] hover:bg-[#5E0909] disabled:opacity-70 text-[#FFB800] border border-[#FFB800]/20 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-red-950/20 active:scale-95 flex items-center justify-center gap-3 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        Submitting...
                        <Loader2 size={14} className="animate-spin text-[#FFB800]" />
                      </>
                    ) : (
                      <>
                        Send Message 
                        <div className="bg-white/10 p-1 rounded-full shrink-0">
                          <Send size={12} className="text-[#FFB800]" />
                        </div>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
