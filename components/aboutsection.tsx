"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Medal, ChevronRight } from "lucide-react";
import Image from "next/image";

export function AboutUs() {
  const yellow = "#FFB800";

  const bulletPoints = [
    "Well structured syllabus customized for all age groups and skill levels.",
    "Specialized coaching for Beginners, Intermediates, and Advanced Players.",
    "Engaging, interactive classes that foster strategic thinking.",
    "Regular academy tournaments and practice games to hone competitive skills.",
    "Guidance from FIDE-rated coaches and veteran tournament players."
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* LEFT SIDE: 2 IMAGES STACKED (ONE OVER THE OTHER) */}
          <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-auto h-[500px] md:h-[650px]">
            {/* BACK CONTAINER */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-[80%] h-[75%] rounded-[3rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl z-10 bg-gradient-to-br from-[#7A0C0C] to-red-950 flex flex-col justify-between"
            >
              <Image
                src="/17.jpeg"
                alt="Mylapore Chess Center"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="relative z-20 flex justify-between items-start p-8">
                <Trophy size={48} className="text-[#FFB800] opacity-80" />
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">KPR CREST</span>
              </div>
              <div className="relative z-20 space-y-2 p-8">
                <h3 className="text-3xl font-black text-white tracking-tight leading-none">Mylapore</h3>
                <p className="text-xs text-white/60">Chennai Center</p>
              </div>
            </motion.div>

            {/* FRONT CONTAINER */}
            <motion.div 
              initial={{ opacity: 0, y: 50, x: 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-[65%] h-[55%] rounded-[3rem] overflow-hidden border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-20 bg-slate-900 flex flex-col justify-between"
            >
              <Image
                src="/21.jpeg"
                alt="Pallikaranai Chess Center"
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="relative z-20 flex justify-end p-6">
                <Medal size={36} className="text-[#FFB800] opacity-90" />
              </div>
              <div className="relative z-20 space-y-1 p-6">
                <h4 className="text-xl font-black text-[#FFB800] tracking-tight leading-none">Pallikaranai</h4>
                <p className="text-[10px] text-slate-400">Balaji Dental Clinic Road</p>
              </div>
            </motion.div>

            {/* EXPERIENCE BADGE - PILL STYLE */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 z-30 bg-[#FFB800] text-black px-6 py-8 rounded-[2.5rem] shadow-xl border-4 border-white flex flex-col items-center justify-center text-center"
            >
               <Medal size={24} className="mb-2" />
               <span className="text-3xl font-black leading-none">10+</span>
               <span className="text-[10px] font-bold uppercase tracking-tighter leading-tight mt-1">Years <br/> Experience</span>
            </motion.div>
          </div>

          {/* RIGHT SIDE: DATA CONTENT */}
          <div className="flex flex-col space-y-8">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#FFB800] rounded-full" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Who We Are?</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                Professional Chess Coaching <br />
                <span className="inline-block bg-[#FFB800] text-black px-5 py-2 rounded-[2rem] shadow-lg transform -rotate-1 mt-2">At KPR Chess Academy</span>
              </h2>

              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                Located in <strong className="text-slate-900 italic">Mylapore and Pallikaranai, Chennai</strong>, we aim to provide top-level chess coaching classes for Beginners, Intermediates, and Advanced players.
              </p>
              
              <p className="text-slate-500 font-medium leading-relaxed">
                Our main goal is to spread strategic thinking and create future champions by bringing out the best in every student's chess journey.
              </p>
            </div>

            {/* WHY KPR LIST */}
            <div className="bg-slate-50 rounded-[3rem] p-8 space-y-5 border border-slate-100">
               <p className="text-[11px] font-black text-[#FFB800] uppercase tracking-[0.2em] flex items-center gap-2">
                 <Trophy size={16} /> Why KPR Chess Academy?
               </p>
               <div className="space-y-4">
                 {bulletPoints.map((text, i) => (
                   <div key={i} className="flex items-start gap-3 group">
                       <div className="mt-1 shrink-0">
                         <CheckCircle2 size={20} className="text-[#FFB800]" />
                       </div>
                       <span className="text-sm font-bold text-slate-600 leading-snug">{text}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* CTA PILL */}
            <div className="pt-2">
              <button className="group flex items-center gap-4 bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95">
                Commence Your Journey
                <div className="w-8 h-8 bg-[#FFB800] rounded-full flex items-center justify-center text-black group-hover:translate-x-1 transition-transform">
                   <ChevronRight size={18} />
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}