"use client";

import { motion } from "framer-motion";
import { Target, Eye, Rocket, Trophy, Globe, ChevronRight } from "lucide-react";

export function MissionVision() {
  const yellow = "#FFB800";

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. SECTION HEADING - Responsive Sizes */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Rocket size={14} className="text-[#7A0C0C]" />
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Our Strategic Core</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              The Path to
            </h2>
            <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-12 py-2.5 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-red-950/15">
              <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                Mastery.
              </span>
            </div>
          </div>
        </div>

        {/* 2. CORE CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-20">
          
          {/* MISSION CARD (Dark Style) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#0B0202] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden shadow-2xl border-4 border-white"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(${yellow} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
            
            <div className="relative z-10 space-y-6 md:space-y-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 flex items-center justify-center shadow-lg shadow-red-950/20 group-hover:rotate-6 transition-transform duration-500">
                <Target size={32} className="md:w-10 md:h-10" />
              </div>
              
              <div className="space-y-4">
                {/* Heading: 3xl Mobile / 5xl Desktop */}
                <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                  Our <span className="text-[#FFB800]">Mission</span>
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                  To provide <span className="text-white">structured, world-class chess coaching</span> across Chennai. We focus on nurturing young minds, building logic, and preparing students for tournament success.
                </p>
              </div>

              <div className="flex items-center gap-4 text-[#FFB800] font-black text-[10px] uppercase tracking-[0.2em]">
                 <span className="w-8 md:w-12 h-px bg-white/10" />
                 Nurturing Chennai's Chess Champions
              </div>
            </div>
          </motion.div>

          {/* VISION CARD (Crimson Red Style) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#7A0C0C] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden shadow-2xl border-4 border-white text-white"
          >
            <div className="relative z-10 space-y-6 md:space-y-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-slate-900 flex items-center justify-center text-[#FFB800] border border-[#FFB800]/20 shadow-lg group-hover:-rotate-6 transition-transform duration-500">
                <Eye size={32} className="md:w-10 md:h-10" />
              </div>
              
              <div className="space-y-4">
                {/* Heading: 3xl Mobile / 5xl Desktop */}
                <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-tight">
                  Our <span className="text-[#FFB800]">Vision</span>
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed font-medium">
                  To build a premier chess training ecosystem in Mylapore and Pallikaranai, developing strategic thinking as a vital cognitive life skill for the next generation.
                </p>
              </div>

              <div className="flex items-center gap-4 text-[#FFB800] font-black text-[10px] uppercase tracking-[0.2em]">
                 <span className="w-8 md:w-12 h-px bg-white/10" />
                 Building Strategic Thinkers
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. BOTTOM STATS BAR - Fully Responsive Stack */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 shadow-2xl"
        >
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Globe size={24} className="md:w-8 md:h-8 text-[#FFB800]" />
                </div>
                <div className="text-left">
                    <p className="text-white font-black text-2xl md:text-3xl leading-none italic uppercase">Worldwide</p>
                    <p className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-1">Coaching Network</p>
                </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/10" />

            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Trophy size={24} className="md:w-8 md:h-8 text-[#FFB800]" />
                </div>
                <div className="text-left">
                    <p className="text-white font-black text-2xl md:text-3xl leading-none italic uppercase">12+ Years</p>
                    <p className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-1">Playing Experience</p>
                </div>
            </div>

            <button className="group w-full md:w-auto flex items-center justify-center gap-4 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-red-950/20">
                Join our mission
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                   <ChevronRight size={16} className="md:w-5 md:h-5 text-[#FFB800]" />
                </div>
            </button>
        </motion.div>

      </div>
    </section>
  );
}