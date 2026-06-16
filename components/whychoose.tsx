"use client";

import { motion } from "framer-motion";
import { Users, Target, Globe, Trophy, ChevronRight } from "lucide-react";
import Image from "next/image";

export function WhyChooseUs() {
  const points = [
    {
      side: "left",
      title: "Expert Coaches",
      sub: "International Masters",
      desc: "Our team consists of professional trainers with first-hand experience in global championships.",
      icon: <Users size={28} />,
      bgColor: "bg-[#2196F3]", // Blue
    },
    {
      side: "left",
      title: "Tailored Training",
      sub: "Personalized Roadmap",
      desc: "We provide customized learning paths that adapt to each student's unique level and style.",
      icon: <Target size={28} />,
      bgColor: "bg-[#E91E63]", // Crimson
    },
    {
      side: "right",
      title: "Proven Success",
      sub: "Champion Mindset",
      desc: "A structured curriculum that has consistently produced state and national level title holders.",
      icon: <Trophy size={28} />,
      bgColor: "bg-[#4CAF50]", // Emerald
    },
    {
      side: "right",
      title: "Global Reach",
      sub: "Online Worldwide",
      desc: "Based in Kottayam, we deliver high-quality coaching to students globally using professional tools.",
      icon: <Globe size={28} />,
      bgColor: "bg-[#9C27B0]", // Purple
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. CENTERED HEADING UI - Responsive Sizes */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <span className="w-2 h-2 bg-[#FFB800] rounded-full animate-pulse" />
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Our Edge</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Why Choose
            </h2>
            <div className="inline-block bg-[#FFB800] text-black px-6 md:px-12 py-2.5 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-amber-200/20">
              <span className="text-3xl lg:text-5xl font-black tracking-tighter leading-none">
                ChessEasy
              </span>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-lg leading-relaxed">
            We provide the best coaching with a guarantee of improvement, 
            bringing international standards to your home.
          </p>
        </div>

        {/* 2. CENTRAL LAYOUT WITH COLORED CARDS */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 items-center gap-8 lg:gap-12">
          
          {/* Column 1: Left Cards (Top on Mobile) */}
          <div className="w-full space-y-6 md:space-y-8 order-2 lg:order-1">
            {points.filter(p => p.side === "left").map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${point.bgColor} p-7 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] text-white border-4 border-white shadow-xl shadow-black/5 hover:scale-[1.02] lg:hover:scale-105 transition-all duration-500 group flex flex-col justify-between h-auto min-h-[240px] md:min-h-[280px]`}
              >
                <div className="bg-white/20 p-3 rounded-2xl w-fit group-hover:rotate-12 transition-transform">
                  {point.icon}
                </div>
                <div className="mt-4">
                  <h4 className="text-xl md:text-2xl font-black mb-1 tracking-tight">{point.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-3">{point.sub}</p>
                  <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2: Central Concave Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full order-1 lg:order-2"
          >
            <div className="relative h-full w-full rounded-b-[3rem] md:rounded-b-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-slate-50"
                 style={{ WebkitClipPath: "ellipse(100% 85% at 50% 100%)" }}
            >
              <Image 
                src="/ach4.jpeg" 
                alt="Chess Coaching"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Background dashed circle - responsive size */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] md:w-[120%] md:h-[80%] border border-slate-100 rounded-full border-dashed animate-spin-slow opacity-50" />
          </motion.div>

          {/* Column 3: Right Cards (Bottom on Mobile) */}
          <div className="w-full space-y-6 md:space-y-8 order-3">
            {points.filter(p => p.side === "right").map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${point.bgColor} p-7 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] text-white border-4 border-white shadow-xl shadow-black/5 hover:scale-[1.02] lg:hover:scale-105 transition-all duration-500 group flex flex-col justify-between h-auto min-h-[240px] md:min-h-[280px]`}
              >
                <div className="bg-white/20 p-3 rounded-2xl w-fit group-hover:rotate-12 transition-transform">
                  {point.icon}
                </div>
                <div className="mt-4">
                  <h4 className="text-xl md:text-2xl font-black mb-1 tracking-tight">{point.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-3">{point.sub}</p>
                  <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* 3. BOTTOM CTA PILL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 flex justify-center"
        >
          <button className="w-full sm:w-auto bg-slate-900 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs md:text-sm hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4 group">
            BOOK A DEMO CLASS
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FFB800] rounded-full flex items-center justify-center text-black group-hover:translate-x-1 transition-transform">
              <ChevronRight size={18} />
            </div>
          </button>
        </motion.div>

      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
}