"use client";

import { motion } from "framer-motion";
import { Medal, ChevronRight, Trophy } from "lucide-react";
import Image from "next/image";

export function Achievements() {
  const achievements = [
    {
      name: "Viruthika",
      title: "Under-10 Girls Champion",
      description: "Clinched the Championship in the Under-10 Girls category at the 15th Tamil Nadu State Level Chess Tournament.",
      tag: "State Champion",
      image: "/viruthika.jpg",
      bgColor: "bg-[#7A0C0C]",
      waveColor: "#7A0C0C",
      icon: "🏆"
    },
    {
      name: "Sreenikesh Arunprasath",
      title: "Under-10 Boys Champion",
      description: "Won 1st Place with a perfect score of 6/6 at the 3rd OMR Chess Club 1st State Level Chess Tournament 2026.",
      tag: "State Champion",
      image: "/sreenikesh.jpg",
      bgColor: "bg-slate-900",
      waveColor: "#0f172a",
      icon: "🏆"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
              <span className="w-2 h-2 bg-[#7A0C0C] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Our Wall of Fame</span>
            </div>

            {/* RESPONSIVE HEADING */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                Academy
              </h2>
              <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-10 py-2.5 md:py-3.5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-red-950/15">
                <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                  Achievements
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STATIC 2-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              className="w-full"
            >
              <div className="flex flex-col bg-white rounded-[2rem] border border-slate-100 transition-all relative group h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 duration-300">
                
                {/* TOP HEADER BOX WITH GRADIENT & IMAGE */}
                <div className="relative h-[320px] overflow-hidden shrink-0 border-b border-slate-100 bg-slate-900">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
                  />
                  {/* Subtle dark overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest w-fit flex items-center gap-2">
                    <Medal size={10} className="text-[#FFB800]" /> {item.tag}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-xl md:text-2xl font-[900] text-slate-900 mb-1 leading-tight tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-[#7A0C0C] font-black uppercase text-[10px] tracking-[0.2em] mb-4">
                    {item.title}
                  </p>
                  
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA PILL */}
        <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-4 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs md:text-sm transition-all shadow-xl active:scale-95 group">
                BECOME OUR NEXT CHAMPION
                <ChevronRight size={18} className="text-[#FFB800] group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}