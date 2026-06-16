"use client";

import { motion } from "framer-motion";
import { ChevronRight, Trophy, Medal, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AchievementBanner() {
  const yellow = "#FFB800";

  return (
    <>
      <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617] font-sans">
        
        {/* 1. IMMERSIVE BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/chess-victory.jpg" // Replace with a trophy or celebration themed chess image
            alt="Chess Achievement Background"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
          
          {/* Technical Dot Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
               style={{ 
                 backgroundImage: `radial-gradient(white 1px, transparent 1px)`, 
                 backgroundSize: '35px 35px' 
               }} 
          />
        </div>

        {/* 2. CENTERED CONTENT - Shifted up */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center -mt-10 md:-mt-24">
          
          {/* BREADCRUMB PILL */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-[#1e293b]/40 backdrop-blur-md rounded-full px-8 py-2 border border-white/5 mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 text-[11px] font-black tracking-[0.3em] uppercase">
              <Link href="/" className="text-white hover:text-slate-300 transition-colors">Home</Link>
              <ChevronRight size={12} className="text-[#FFB800]" />
              <span className="text-[#FFB800]">Wall of Fame</span>
            </div>
          </motion.div>

          {/* PRIMARY HEADLINE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter leading-none uppercase flex items-center justify-center">
              <span className="text-white italic font-medium">THE</span>
              <span className="text-[#FFB800] not-italic ml-3">VICTORIES.</span>
            </h1>
            <p className="text-slate-300 font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs max-w-4xl mx-auto leading-relaxed">
              Visualizing <span className="text-white">Excellence</span>, Champion Mindsets <br className="hidden md:block" />
              & The Legacy of ChessEasy Triumphs.
            </p>
          </motion.div>
        </div>

        {/* 3. FLOATING DASHBOARD BADGES */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          
          {/* LEFT TOP: SUCCESS RATE */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[7%] bg-[#1e293b]/40 backdrop-blur-xl p-5 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Trophy className="text-[#FFB800] w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Glory</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">200+ Titles Won</p>
            </div>
          </motion.div>

          {/* LEFT BOTTOM: RECOGNITION */}
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[28%] left-[12%] bg-[#1e293b]/40 backdrop-blur-xl p-5 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4"
          >
            <div className="p-3 bg-[#5D3FD3]/20 border border-[#5D3FD3]/40 rounded-2xl">
              <Medal className="text-[#5D3FD3] w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Honors</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">National Merit</p>
            </div>
          </motion.div>

          {/* RIGHT: ELITE RANK */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[32%] right-[8%] bg-[#1e293b]/40 backdrop-blur-xl p-5 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Star className="text-[#FFB800] w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Elite</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Top 1% Global</p>
            </div>
          </motion.div>
        </div>

        {/* 4. REFINED SMALL RIPPLE WAVES */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
          <svg 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none" 
            className="w-full h-[100px] md:h-[160px]"
          >
            {/* Layer 1: Smaller Translucent Ripples */}
            <path 
              d="M0,80 C180,110 360,60 540,85 C720,110 900,55 1080,80 C1260,105 1440,75 1440,75 V120 H0 Z" 
              fill="#ffffff" 
              fillOpacity="0.12"
            />
            {/* Layer 2: Main Refined Small Waves */}
            <path 
              d="M0,100 C120,80 240,115 360,100 C480,85 600,120 720,100 C840,80 960,115 1080,100 C1200,85 1320,115 1440,100 V120 H0 Z" 
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* 5. WHITE SPACE BELOW SECTION */}
      <div className="w-full h-16 md:h-24 bg-white" />
    </>
  );
}