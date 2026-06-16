"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Zap, 
  Map, 
  AlertOctagon, 
  Target, 
  Trophy, 
  CheckCircle2, 
  Users, 
  BookOpen,
  ArrowDown,
  Crown
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function IntermediatePage() {
  const yellow = "#FFB800";

  const curriculum = [
    { num: "01", title: "Tactical Motifs", desc: "Fork, Pin, Skewer, Discovery, and the deadly Zwischenzug." },
    { num: "02", title: "Opening Principles", desc: "Controlling the center, rapid development, and King safety." },
    { num: "03", title: "Middlegame Plans", desc: "Pawn structures, piece activity, and aggressive attack ideas." },
    { num: "04", title: "Endgame Basics", desc: "King & Pawn endings, Rook technique, and winning converted games." },
  ];

  const improvements = [
    { icon: <AlertOctagon size={28} />, title: "Eliminate Blunders", desc: "Learn to scan for threats before every move — the single biggest rating booster for intermediate players." },
    { icon: <Zap size={28} />, title: "Spot Tactics Faster", desc: "Pattern training trains your eye to find winning combinations in seconds, not minutes — crucial for blitz." },
    { icon: <Map size={28} />, title: "Read Positions", desc: "Understanding imbalances lets you form logical plans instead of just reacting to your opponent's moves." },
  ];

  const trainingPillars = [
    { num: "01", title: "Puzzle Sessions", desc: "Daily tactical puzzles organized by theme. Repetition builds pattern recognition that stays with you forever." },
    { num: "02", title: "Game Analysis", desc: "Your actual games reviewed by coaches — knowing where and why you went wrong is the fastest way to grow." },
    { num: "03", title: "Practical Play", desc: "Supervised games with real-time coaching feedback transforms practice into measurable tournament skill." },
  ];

  const whoFor = [
    { icon: "♟", title: "Knows Basic Rules", desc: "You understand how pieces move but lack a structured strategic roadmap." },
    { icon: "🎮", title: "Played Casual Games", desc: "You've played online but don't quite understand why you keep losing games." },
    { icon: "📊", title: "Wants Improvement", desc: "You're hungry for growth and ready for systematic, high-level learning." },
    { icon: "🏅", title: "Tournament Curious", desc: "You want to enter your first school or club tournament with real confidence." },
  ];

  const milestoneCredentials = ["Tournament Ready", "Tactical Expert", "Position Evaluation", "Opening Repertoire"];

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bg1.avif" 
            alt="Chess Background" 
            fill 
            className="object-cover opacity-50 grayscale" 
            priority 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: "35px 35px" }} />
        </div>

        {/* Floating Badges (Hidden on mobile) */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] left-[7%] bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#FFB800] rounded-2xl text-black shadow-lg shadow-amber-500/20"><Trophy size={20}/></div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Status</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Intermediate Level</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[30%] left-[10%] bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#5D3FD3] rounded-2xl text-white shadow-lg shadow-purple-500/20"><Zap size={20}/></div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Focus</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Tactical Mastery</p></div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto -mt-12 md:-mt-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 mb-8 md:mb-12">
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-[#FFB800]">Tactical Growth — ChessEasy Academy</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-[80px] font-black tracking-tighter leading-none uppercase text-white mb-8">
            <span className="italic font-normal">MOVE BEYOND</span><br />
            THE <span className="text-[#FFB800]">BASICS.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-12 max-w-2xl mx-auto leading-relaxed">
            Structured improvement · Strategic mindset · Tournament confidence
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-400/30 active:scale-95">
                ENROLL IN INTERMEDIATE
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
              View Curriculum <ArrowDown size={16} className="animate-bounce" />
            </button>
          </motion.div>
        </div>

        {/* Organic Wave */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[80px] md:h-[150px]">
            <path d="M0,80 C180,110 360,60 540,85 C720,110 900,55 1080,80 C1260,105 1440,75 1440,75 V120 H0 Z" fill="white" fillOpacity="0.12"/>
            <path d="M0,100 C120,80 240,115 360,100 C480,85 600,120 720,100 C840,80 960,115 1080,100 C1200,85 1320,115 1440,100 V120 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── WHO IS IT FOR SECTION ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6">
            <Target size={14} className="text-[#FFB800]" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Eligibility</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-16 leading-[1.1]">
            You Know the Rules.<br />
            <span className="inline-block bg-[#FFB800] text-black px-4 rounded-2xl transform -rotate-1 mt-2">Now Learn to Win.</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoFor.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-slate-950 p-10 rounded-[3rem] flex flex-col gap-6 group transition-all duration-300">
                <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                <div>
                    <p className="text-white font-black text-lg mb-2">{item.title}</p>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM SECTION ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                Tactical Skills You <br />
                <span className="text-[#FFB800]">Will Master</span>
                </h2>
                <p className="text-slate-500 font-medium text-lg max-w-xl">
                Move beyond instinct. We teach you a real chess language — pattern recognition, calculated plans, and professional evaluation.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.map((item, i) => (
                <motion.div key={i} className="flex items-start gap-5 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-[#FFB800] text-sm shrink-0 group-hover:rotate-6 transition-transform">{item.num}</div>
                  <div>
                    <p className="font-black text-slate-900 text-base mb-1">{item.title}</p>
                    <p className="text-slate-400 text-xs font-bold leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/10 blur-3xl" />
              <Quote size={40} className="text-[#FFB800] opacity-20 mb-6" />
              <p className="text-xl md:text-2xl font-black text-white italic leading-relaxed relative z-10">
                "A tactical player doesn't just react — they create threats. This program rewires how you see the board."
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[["50+", "Tactics"], ["12", "Modules"], ["3×", "Speed"]].map(([n, l]) => (
                <div key={l} className="text-center p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-3xl font-black text-[#FFB800] tracking-tighter">{n}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPROVEMENTS ── */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
              What <span className="text-[#FFB800]">Changes</span> For You
            </h2>
            <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
              Concrete measurable improvements that happen when you follow this structured program consistently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {improvements.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#FFB800] flex items-center justify-center text-black mb-8 shadow-xl shadow-amber-500/10">{item.icon}</div>
                <h3 className="text-white font-black text-2xl mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING METHOD PILLARS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
           <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">How We <span className="text-[#FFB800]">Train You</span></h2>
              <p className="text-slate-500 font-medium text-lg">A three-pillar methodology used by competitive coaches worldwide — adapted for online learning.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trainingPillars.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} className="group relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/30 overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 font-black text-6xl text-slate-50 opacity-10 group-hover:text-[#FFB800] group-hover:opacity-20 transition-all">{s.num}</div>
              <div className="relative z-10 space-y-4">
                <h3 className="font-black text-slate-900 text-2xl tracking-tight">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-8 w-12 h-1.5 bg-slate-100 rounded-full group-hover:w-24 group-hover:bg-[#FFB800] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROGRESS GOAL PILL ── */}
      <div className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="relative bg-slate-950 rounded-[4rem] p-12 md:p-20 text-center overflow-hidden border-4 border-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,184,0,0.1),transparent)]" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#FFB800] rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl"><Crown className="text-black" size={32} /></div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
              Your Achievement <span className="text-[#FFB800]">Goal</span>
            </h3>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed mb-12">
              By the end of this program, you'll be fully ready to enter school or club-level tournaments with confidence — knowing how to prepare, plan, and compete like a pro.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {milestoneCredentials.map((tag) => (
                <span key={tag} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em]
                  ${tag === "Tournament Ready" ? "bg-[#FFB800] text-black shadow-lg" : "bg-white/5 border border-white/10 text-slate-400"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FINAL CTA SECTION ── */}
      <section className="relative py-28 px-6 bg-slate-900 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Zap size={14} className="text-[#FFB800]" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Start Winning Now</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase">
            Stop Plateauing.<br /><span className="text-[#FFB800]">Start Growing.</span>
          </h2>
          <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            The gap between a casual player and a tournament threat is just structured practice. Let's close that gap together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
                <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-400/30 active:scale-95">
                JOIN INTERMEDIATE LEVEL
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Utility SVG for Quote mark
function Quote({ size, className }: { size: number, className: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12H13.017V9C13.017 7.34315 14.3601 6 16.017 6H19.017C20.6738 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C4.44772 8 4 8.44772 4 9V12H2V9C2 7.34315 3.34315 6 5 6H8C9.65685 6 11 7.34315 11 9V15C11 18.3137 8.31371 21 5 21H3Z" />
        </svg>
    )
}