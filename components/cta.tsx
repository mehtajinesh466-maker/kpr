"use client";

import { motion } from "framer-motion";
import { ChevronRight, Zap, Sparkles } from "lucide-react";

export function CompactCTA() {
  return (
    <section className="py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-purple-900/20"
      >
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 blur-[80px] -z-10" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <Sparkles size={12} className="text-[#FFB800]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Limited Slots Available</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight">
              Ready to <span className="text-[#FFB800]">Master</span> the <br />
              Game of Strategy?
            </h2>
            
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-md">
              Join 2,000+ students across the globe. No credit card required to start your free demo class.
            </p>
          </div>

          {/* Compact Buttons Side */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button className="group flex items-center gap-3 bg-[#FFB800] hover:bg-[#FFA500] text-black px-10 py-5 rounded-full font-black text-sm transition-all shadow-xl shadow-amber-200/10 active:scale-95 whitespace-nowrap">
              BOOK YOUR FREE DEMO
              <div className="bg-black/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={16} />
              </div>
            </button>
            
            <div className="flex flex-col items-center sm:items-start">
               <div className="flex -space-x-2 mb-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700" />
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#FFB800] flex items-center justify-center text-[8px] font-black">+2k</div>
               </div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Happy Students</span>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}