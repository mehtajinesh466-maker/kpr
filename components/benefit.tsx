"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export function WhyChessMatters() {
  const yellow = "#FFB800";

  // Using your requested topics
  const benefits = [
    { title: "Critical Thinking", icon: "/creative.png" },
    { title: "Problem Solving", icon: "/problem.png" },
    { title: "Concentration", icon: "/focus.png" },
    { title: "Decision Making", icon: "/problem.png" },
    { title: "Patience", icon: "/time.png" },
    { title: "Strategic Planning", icon: "/academy.png" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
         {/* CENTERED HEADING UI */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Brain size={14} className="text-[#FFB800]" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Cognitive Benefits</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Why Chess
            </h2>
            <div className="inline-block bg-[#FFB800] text-black px-8 md:px-12 py-3 md:py-5 rounded-[2.5rem] shadow-xl shadow-amber-200/20">
              <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                Matters.
              </span>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg">
            Beyond the board, chess builds the mental infrastructure for a successful life. 
            It's not just a game; it's a brain-boosting superpower.
          </p>
        </div>

        {/* THE EXACT CARD GRID FROM IMAGE */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-[#FFF9F2] rounded-[2.5rem] border border-[#F3E8D9] p-2 flex flex-col items-center justify-between min-h-[220px] md:min-h-[260px] hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* The White Organic Wave Background inside card */}
              <div className="absolute top-0 left-0 w-full h-2/3 bg-white rounded-t-[2.3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" 
                   style={{ clipPath: 'ellipse(100% 70% at 50% 0%)' }} 
              />
              
              {/* White Circle behind icon (Matches Image) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-32 h-32 bg-white rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity" />

              {/* ICON AREA */}
              <div className="relative z-10 mt-8 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback in case gif isn't uploaded yet
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* TITLE AREA */}
              <div className="relative z-10 pb-8 text-center px-2">
                <h3 className="text-sm md:text-base font-black text-slate-800 leading-tight uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}