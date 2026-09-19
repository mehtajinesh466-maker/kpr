"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";

export function ContactSection() {
  const yellow = "#FFB800";
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
        throw new Error("Failed to submit contact inquiry");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi KPR Chess Academy! I have submitted a contact inquiry from your website.\n\n*Parent Name:* ${formData.parentFirstName} ${formData.parentLastName}\n*Student Name:* ${formData.studentFullName}\n*Contact:* ${formData.contactNumber}\n*WhatsApp:* ${formData.whatsappNumber || formData.contactNumber}\n*Email:* ${formData.email}\n${formData.message ? `*Message:* ${formData.message}` : ''}`
    );
    return `https://wa.me/919941987881?text=${text}`;
  };

  return (
    <section className="py-20 px-6 bg-slate-50 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* MAIN SIDE-BY-SIDE CARD CONTAINER */}
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT PANEL: DARK CHESSBOARD STYLE */}
          <div className="lg:col-span-5 bg-[#0B0202] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Chessboard Grid Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            {/* Glow backing */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#7A0C0C]/40 rounded-full blur-[100px] -z-10" />

            <div className="relative z-10 space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/30 border border-[#7A0C0C]/50">
                <Sparkles size={12} className="text-[#FFB800]" />
                <span className="text-[9px] font-black text-[#FFB800] uppercase tracking-widest">Contact Central</span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-[900] tracking-tighter leading-none uppercase">
                  Start the <br />
                  <span className="text-[#7A0C0C] bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Conversation.</span>
                </h3>
              </div>

              {/* Contact Channels */}
              <div className="space-y-6 pt-4">
                {[
                  {
                    icon: <Phone size={20} className="text-[#FFB800]" />,
                    title: "TALK TO US",
                    detail: "+91 99419 87881",
                    color: "bg-[#7A0C0C]/20 border-[#7A0C0C]/30"
                  },
                  {
                    icon: <Mail size={20} className="text-[#FFB800]" />,
                    title: "WRITE TO US",
                    detail: "kumartv1978@gmail.com",
                    color: "bg-blue-950/30 border-blue-500/20"
                  },
                  {
                    icon: <MapPin size={20} className="text-[#FFB800]" />,
                    title: "HEADQUARTERS",
                    detail: "KPR Chess Academy, Pallikaranai, Chennai",
                    color: "bg-amber-950/20 border-amber-500/20"
                  }
                ].map((channel, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${channel.color}`}>
                      {channel.icon}
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{channel.title}</p>
                      <p className="text-sm font-bold text-slate-200 mt-1 leading-tight">{channel.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent mark at bottom */}
            <div className="relative z-10 pt-10 text-[9px] font-black uppercase tracking-widest text-slate-600">
              © KPR Chess Academy Chennai
            </div>
          </div>

          {/* RIGHT PANEL: CLEAN WHITE FORM */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-[900] text-slate-900 tracking-tight">
                    Inquiry Sent Successfully!
                  </h3>
                  <p className="text-sm font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.parentFirstName}</span>! Your message regarding <span className="font-bold text-slate-900">{formData.studentFullName}</span> has been received. Our team will contact you shortly.
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
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        parentFirstName: "",
                        parentLastName: "",
                        studentFullName: "",
                        email: "",
                        contactNumber: "",
                        whatsappNumber: "",
                        message: "",
                      });
                    }}
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-[900] text-slate-900 tracking-tight mb-8 border-b-2 border-[#7A0C0C] pb-2 w-fit">
                  Send an Inquiry
                </h3>

                {error && (
                  <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Parent First Name / Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="text" 
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleChange}
                      placeholder="Parent First Name *"
                      required
                      className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                    />
                    <input 
                      type="text" 
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleChange}
                      placeholder="Last Name *"
                      required
                      className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
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
                    className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                  />

                  {/* Row 3: Email / Contact Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                      className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                    />
                    <input 
                      type="tel" 
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="Contact Number *"
                      required
                      className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
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
                    className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                  />

                  {/* Row 5: Message */}
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your Message..."
                    className="w-full px-6 py-5 rounded-[1.8rem] bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm resize-none"
                  ></textarea>

                  {/* Submit button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#7A0C0C] hover:bg-[#5E0909] disabled:opacity-70 text-[#FFB800] border border-[#FFB800]/20 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-950/20 active:scale-95 flex items-center justify-center gap-3 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        Sending Inquiry...
                        <Loader2 size={16} className="animate-spin text-[#FFB800]" />
                      </>
                    ) : (
                      <>
                        Send Message 
                        <div className="bg-white/10 p-1 rounded-full shrink-0">
                          <Send size={14} className="text-[#FFB800]" />
                        </div>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}