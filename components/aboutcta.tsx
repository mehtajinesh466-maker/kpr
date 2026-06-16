"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Users2, Trophy } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  const yellow = "#FFB800";

  return (
    <section className="py-20 px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-[#0A0F1C] rounded-[4rem] md:rounded-[4rem] p-8 md:pl-12 md:pr-4 relative overflow-hidden shadow-2xl shadow-purple-900/20"
      >
        {/* Technical Background Details */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -z-10" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(${yellow} 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* LEFT: TEXT & SOCIAL PROOF */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles size={12} className="text-[#FFB800]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Start Your Legacy</span>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                Your Success Story Starts <br className="hidden lg:block" />
                With A <span className="text-[#FFB800]">Single Move.</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Join 2,000+ students globally mastering strategy with us.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="flex items-center gap-4 pt-1">
               <div className="flex items-center gap-1.5">
                  <Users2 size={14} className="text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-nowrap">2k+ Enrolled</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-slate-800" />
               <div className="flex items-center gap-1.5">
                  <Trophy size={14} className="text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-nowrap">12+ Years Exp.</span>
               </div>
            </div>
          </div>

          {/* RIGHT: ACTION PILL */}
          <div className="shrink-0 w-full md:w-auto">
            <Link href="/contact" className="block w-full">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black pl-10 pr-3 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-500/20 active:scale-95">
                Book Free Demo
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={24} />
                </div>
              </button>
            </Link>
          </div>

        </div>
      </motion.div>
    </section>
  );
}