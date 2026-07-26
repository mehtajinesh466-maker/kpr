"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MapPin, Send, Sparkles } from "lucide-react";

export function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-demo-modal", handleOpen);
    return () => window.removeEventListener("open-demo-modal", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 md:p-6 flex items-center justify-center min-h-screen">
        
        {/* Backdrop click close */}
        <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

        {/* Modal Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[2rem] lg:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 my-8"
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)} 
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
                    detail: "KPR Chess Academy, Mylapore & Pallikaranai, Chennai",
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

          {/* RIGHT PANEL: CLEAN WHITE FORM */}
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-[900] text-slate-900 tracking-tight mb-8 border-b-2 border-[#7A0C0C] pb-2 w-fit">
              Send an Inquiry
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }} className="space-y-4">
              {/* Row 1: Parent First Name / Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Parent First Name *"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                />
                <input 
                  type="text" 
                  placeholder="Last Name *"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                />
              </div>

              {/* Row 2: Student Full Name */}
              <input 
                type="text" 
                placeholder="Student Full Name *"
                required
                className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
              />

              {/* Row 3: Email / Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder="Email Address *"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                />
                <input 
                  type="tel" 
                  placeholder="Contact Number *"
                  required
                  className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
                />
              </div>

              {/* Row 4: WhatsApp Number */}
              <input 
                type="tel" 
                placeholder="WhatsApp Number for Updates *"
                required
                className="w-full px-5 py-3.5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs"
              />

              {/* Row 5: Message */}
              <textarea 
                rows={3}
                placeholder="Your Message..."
                className="w-full px-5 py-4 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-xs resize-none"
              ></textarea>

              {/* Submit button */}
              <button 
                type="submit"
                className="w-full bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-red-950/20 active:scale-95 flex items-center justify-center gap-3 mt-4"
              >
                Send Message 
                <div className="bg-white/10 p-1 rounded-full shrink-0">
                  <Send size={12} className="text-[#FFB800]" />
                </div>
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
