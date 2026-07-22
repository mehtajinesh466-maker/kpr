"use client";

import { motion } from "framer-motion";
import { Quote, Award, Star, ChevronRight, Facebook, Linkedin, User } from "lucide-react";
import Link from "next/link";

export function FounderSection() {
  const yellow = "#FFB800";

  return (
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADING - Responsive Typography */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <Star size={14} className="text-[#7A0C0C] fill-[#7A0C0C]" />
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">The Leadership</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Meet the
            </h2>
            <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-12 py-2.5 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-red-950/15">
              <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                Visionary.
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: FOUNDER IMAGE (Vertical Pill Style SVG Avatar) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative max-w-[400px] lg:max-w-none mx-auto w-full"
          >
            {/* Technical Dot Grid Background */}
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-48 h-48 md:w-64 md:h-64 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(${yellow} 2px, transparent 2px)`, backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 aspect-[3/4] rounded-full overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl shadow-slate-200 bg-gradient-to-tr from-[#7A0C0C] to-red-950 flex items-center justify-center">
               <div className="flex flex-col items-center justify-center text-white/95">
                 <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 mb-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="50" cy="35" r="18" fill="white" opacity="0.9" />
                   <path d="M15 80 C15 60, 30 55, 50 55 C70 55, 85 60, 85 80" fill="white" opacity="0.9" />
                   <path d="M35 30 L45 20 L50 25 L55 20 L65 30 L55 27 L50 35 L45 27 Z" fill="#FFB800" />
                 </svg>
                 <span className="font-black text-sm tracking-wider uppercase text-[#FFB800]">KPR Chief Coach</span>
               </div>
            </div>

            {/* FLOATING EXPERIENCE BADGE */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 z-20 bg-slate-900 text-white p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-4 border-white flex flex-col items-center justify-center text-center"
            >
               <Award size={20} className="text-[#FFB800] mb-1 md:w-6 md:h-6" />
               <span className="text-lg md:text-2xl font-black leading-none uppercase">Expert</span>
               <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">Mentor</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: FOUNDER BIO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 md:space-y-10"
          >
            <div className="space-y-4 text-center lg:text-left">
               <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                 TV Kumar
               </h3>
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900 text-[#FFB800] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                  Founder of KPR Chess Academy
               </div>
            </div>

            <div className="relative text-center lg:text-left">
               <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-[-2rem] lg:translate-x-0 lg:-top-8 text-slate-200 w-12 h-12 md:w-16 md:h-16 -z-10 opacity-50" />
               <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed italic relative z-10">
                 &quot;Our mission at KPR Chess Academy is to bridge the gap between passion and professional mastery. Every student has a king or queen within them; we simply provide the strategy to help them rule the board.&quot;
               </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-slate-500 font-medium leading-relaxed text-sm md:text-base text-center lg:text-left">
               <p>
                 With deep dedication to the game, <strong className="text-slate-900 font-black italic">TV Kumar</strong> established KPR Chess Academy to bring international-level coaching to the doorsteps of aspiring players in Chennai, with specialized branches in Mylapore and Pallikaranai.
               </p>
               <p className="hidden md:block">
                 His vision drives our structured curriculum, ensuring that strategic intelligence, mental endurance, and the joy of the game remain at the core of everything we teach to our players.
               </p>
            </div>

            {/* CREDENTIALS PILLS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
               {["FIDE Rated", "Strategic Coach", "Elite Chess Mentor"].map((tag) => (
                 <span key={tag} className="px-4 py-2 md:px-5 md:py-2 rounded-full bg-white border border-slate-200 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {tag}
                 </span>
               ))}
            </div>

            {/* CTA & SOCIAL */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 md:gap-8">
               <Link href="/contact" className="w-full sm:w-auto">
                 <button className="group w-full sm:w-auto flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 active:scale-95">
                    Schedule a chat
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                       <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </div>
                 </button>
               </Link>

               <div className="flex items-center gap-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect:</p>
                  <div className="flex gap-2">
                    <Link href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] hover:text-black transition-all">
                       <Linkedin size={18} />
                    </Link>
                    <Link href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] hover:text-black transition-all">
                       <Facebook size={18} />
                    </Link>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}