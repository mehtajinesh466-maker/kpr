"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronRight, Sparkles } from "lucide-react";

export function ContactSection() {
  const yellow = "#FFB800";

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
                    detail: "KPR Chess Academy, Mylapore & Pallikaranai, Chennai",
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
            <h3 className="text-2xl font-[900] text-slate-900 tracking-tight mb-8 border-b-2 border-[#7A0C0C] pb-2 w-fit">
              Send an Inquiry
            </h3>

            <form className="space-y-5">
              {/* Row 1: Parent First Name / Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  placeholder="Parent First Name *"
                  required
                  className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Last Name *"
                  required
                  className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                />
              </div>

              {/* Row 2: Student Full Name */}
              <input 
                type="text" 
                placeholder="Student Full Name *"
                required
                className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
              />

              {/* Row 3: Email / Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="email" 
                  placeholder="Email Address *"
                  required
                  className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                />
                <input 
                  type="tel" 
                  placeholder="Contact Number *"
                  required
                  className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
                />
              </div>

              {/* Row 4: WhatsApp Number */}
              <input 
                type="tel" 
                placeholder="WhatsApp Number for Updates *"
                required
                className="w-full px-6 py-4 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm"
              />

              {/* Row 5: Message */}
              <textarea 
                rows={4}
                placeholder="Your Message..."
                className="w-full px-6 py-5 rounded-[1.8rem] bg-slate-50 border-2 border-transparent focus:border-[#7A0C0C] focus:bg-white transition-all outline-none font-semibold text-slate-800 text-sm resize-none"
              ></textarea>

              {/* Submit button */}
              <button 
                type="submit"
                className="w-full bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-950/20 active:scale-95 flex items-center justify-center gap-3 mt-4"
              >
                Send Message 
                <div className="bg-white/10 p-1 rounded-full shrink-0">
                  <Send size={14} className="text-[#FFB800]" />
                </div>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}