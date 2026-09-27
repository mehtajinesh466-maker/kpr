"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  GraduationCap,
  Award,
  TrendingUp,
  Trophy,
  Monitor,
  Star,
} from "lucide-react";

export function Hero() {
  const features = [
    {
      icon: Award,
      title: "Expert Coaching",
      subtitle: "Rated & Certified Coach",
    },
    {
      icon: TrendingUp,
      title: "All Age Groups",
      subtitle: "Under 10 to Adults",
    },
    {
      icon: Trophy,
      title: "Tournaments",
      subtitle: "Regular Practice & Events",
    },
    {
      icon: Monitor,
      title: "Online & Offline",
      subtitle: "Flexible Learning Options",
    },
    {
      icon: Star,
      title: "Proven Results",
      subtitle: "Better Performance, Stronger Mind",
    },
  ];

  return (
    <section className="relative w-full bg-[#2E0507] text-white overflow-hidden">
      {/* ================= HERO MAIN CONTAINER ================= */}
      <div className="relative min-h-[560px] md:min-h-[640px] lg:min-h-[700px] w-full flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-20">
        
        {/* 1. BACKGROUND IMAGE & OVERLAYS */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_chess_bg.jpg"
            alt="Chess Academy Background"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
          {/* Deep pure maroon gradient on the left half to keep text readable while keeping king & pieces visible on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#360507] via-[#360507]/90 to-transparent md:w-[65%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#200204] via-transparent to-[#360507]/50" />
          {/* Ambient rich maroon glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(122,12,12,0.35)_0%,_transparent_75%)] pointer-events-none" />
        </div>

        {/* 2. HERO CONTENT GRID */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline */}
            <div className="inline-block">
              <span className="text-[#E2B76D] text-xs md:text-sm font-bold tracking-[0.25em] uppercase flex items-center gap-2">
                BUILD A STRONGER MIND
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Master Chess, <br />
              Build Your{" "}
              <span className="text-[#E2B76D]">
                Future
              </span>
            </h1>

            {/* Paragraph Text */}
            <p className="text-slate-200 text-base md:text-lg max-w-xl leading-relaxed font-normal opacity-95">
              KPR Chess Academy offers expert coaching for all age groups, from
              beginners to advanced players. Learn the game, improve your
              thinking, and achieve your goals — on and off the board.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://omrchess.chessplay.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#E2B76D] to-[#D4A352] hover:from-[#d9a851] hover:to-[#c4923f] text-slate-950 font-bold px-7 py-3.5 rounded-full flex items-center gap-3 shadow-xl shadow-red-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm md:text-base"
              >
                <div className="bg-slate-950/10 p-1 rounded-full group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight size={18} className="text-slate-950" />
                </div>
                <span>KPR ONLINE CLASS</span>
              </a>

              <a
                href="https://app.meetchess.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/30 hover:border-[#E2B76D]/60 bg-white/5 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm md:text-base"
              >
                <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center bg-white/10 group-hover:bg-[#E2B76D]/20 group-hover:border-[#E2B76D]/60 transition-colors">
                  <GraduationCap size={15} className="text-[#E2B76D]" />
                </div>
                <span>Classroom 1</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT VISUAL SPACER */}
          <div className="lg:col-span-5 pointer-events-none" />

        </div>
      </div>

      {/* ================= BOTTOM 5-FEATURE HIGHLIGHTS RIBBON ================= */}
      <div className="w-full bg-[#240305] border-t border-b border-red-900/35 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 ${
                  index !== 0 ? "pt-4 lg:pt-0 lg:pl-6" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full border border-red-800/30 bg-red-950/40 flex items-center justify-center shrink-0 text-[#E2B76D]">
                  <IconComponent size={20} />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-bold text-sm tracking-wide leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs mt-0.5 font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}