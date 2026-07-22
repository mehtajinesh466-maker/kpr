"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";

export function CompactCTA() {
  const yellow = "#FFB800";

  return (
    <section className="py-12 px-4 md:px-6 bg-white font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-[#0B0202] rounded-[2.5rem] md:rounded-full p-6 md:p-2 md:pl-10 md:pr-2 relative overflow-hidden shadow-2xl border border-white/5"
      >
        {/* Technical Background Details */}
        <div className="absolute top-0 right-0 w-64 h-full bg-red-600/10 blur-[80px] -z-10" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(${yellow} 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-10">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="hidden lg:flex w-14 h-14 rounded-full bg-white/5 items-center justify-center shrink-0 border border-white/10">
               <Sparkles size={24} style={{ color: yellow }} />
            </div>
            <div className="space-y-1">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-tight">
                Ready to <span style={{ color: yellow }}>Master</span> the Board?
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-medium opacity-80">
                Begin your chess journey at Mylapore or Pallikaranai under FIDE Rated mentors.
              </p>
            </div>
          </div>

          {/* RIGHT: ACTION BAR */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            
            {/* Quick Contact Pill */}
            <Link 
              href="tel:+919941987881" 
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group w-full sm:w-auto justify-center"
            >
               <MessageCircle size={18} style={{ color: yellow }} />
               <div className="text-left">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Support</p>
                  <p className="text-xs font-bold text-white whitespace-nowrap">+91 99419 87881</p>
               </div>
            </Link>

            {/* MAIN PILL BUTTON */}
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-10 py-3 md:py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-red-950/20">
                Book Free Demo
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={20} className="text-[#FFB800]" />
                </div>
              </button>
            </Link>
          </div>

        </div>
      </motion.div>
    </section>
  );
}