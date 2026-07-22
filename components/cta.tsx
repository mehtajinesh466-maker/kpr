"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles, PhoneCall } from "lucide-react";
import Link from "next/link";

export function CompactCTA() {
  return (
    <section className="py-12 px-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-[#0B0202] rounded-full p-4 pl-6 pr-4 relative overflow-hidden shadow-2xl shadow-red-950/40 border border-white/5"
      >
        {/* Chessboard dot pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(white 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* LEFT: STAR BADGE + TITLE & DESCRIPTION */}
          <div className="flex items-center gap-5 text-center lg:text-left flex-col lg:flex-row">
            {/* Spark Star Icon Badge */}
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 hidden md:flex">
              <Sparkles size={20} className="text-[#FFB800]" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-[900] text-white tracking-tight leading-none">
                Ready to <span className="text-[#FFB800]">Master</span> the Board?
              </h2>
              <p className="text-slate-500 font-bold text-[10px] md:text-xs">
                Join KPR Chess Academy. Free trial class available.
              </p>
            </div>
          </div>

          {/* RIGHT: PHONE PILL + BOOKING BUTTON */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Support Phone Pill */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shrink-0 w-full sm:w-auto justify-center">
              <PhoneCall size={14} className="text-[#FFB800]" />
              <div className="text-left">
                <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-0.5">Support</p>
                <p className="text-[11px] font-black text-white leading-none">+91 99419 87881</p>
              </div>
            </div>

            {/* Book Free Demo Button */}
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-between sm:justify-center gap-6 bg-[#FFB800] hover:bg-[#FFA500] text-black pl-8 pr-2 py-2 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 active:scale-95 whitespace-nowrap">
                Book Free Demo
                <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={16} strokeWidth={3} />
                </div>
              </button>
            </Link>
          </div>

        </div>
      </motion.div>
    </section>
  );
}