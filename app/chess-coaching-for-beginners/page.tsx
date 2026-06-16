"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { ChevronRight, Star, BookOpen, Brain, Trophy, Target, Users, Heart } from "lucide-react";
import Link from "next/link";

export default function BeginnersPage() {
  const yellow = "#FFB800";

  const learnItems = [
    "Board setup & piece identification",
    "How every piece moves & captures",
    "Rules of Check, Checkmate & Stalemate",
    "Special moves: Castling, En Passant, Promotion",
    "First tactics: Fork, Pin & Basic Combinations",
    "Playing a complete game from start to finish",
  ];

  const benefits = [
    { icon: <Brain size={28} />, title: "Logical Thinking", desc: "Chess trains the brain to think ahead, evaluate options, and make calculated decisions — skills that transfer to academics and life." },
    { icon: <Target size={28} />, title: "Focus & Patience", desc: "Long games build concentration spans rare in today's digital age. Chess players learn to sit with difficulty and think it through." },
    { icon: <Trophy size={28} />, title: "Competitive Foundation", desc: "Early structured learning gives your child a solid base for school, state, and national level tournament participation." },
    { icon: <Star size={28} />, title: "Creative Problem-Solving", desc: "No two chess positions are the same. Students learn to think creatively and adapt — a skill classrooms rarely teach." },
    { icon: <Heart size={28} />, title: "Sportsmanship", desc: "Learning to win and lose gracefully builds emotional resilience and mutual respect that shapes character." },
    { icon: <BookOpen size={28} />, title: "Academic Performance", desc: "Studies link chess training to improvements in math, reading comprehension, and memory in school-age children." },
  ];

  const whoFor = [
    { icon: "🧒", title: "Age 5 & Above", desc: "Designed with young learners in mind — fun, engaging, and age-appropriate pacing." },
    { icon: "🎯", title: "Absolute Beginners", desc: "Never touched a chess piece? Perfect. We start from the very first move." },
    { icon: "👨‍👩‍👧", title: "Parent-Guided", desc: "Parents can co-learn and reinforce lessons at home for faster progress." },
    { icon: "🏫", title: "School Students", desc: "Structured for busy school schedules with flexible session timings." },
  ];

  const courseSteps = [
    { num: "01", title: "Concept Modules", desc: "Each session covers one core concept clearly — no overwhelm, just clean progressive learning." },
    { num: "02", title: "Fun Puzzles & Exercises", desc: "Interactive puzzles after each module lock in understanding through active practice — not passive watching." },
    { num: "03", title: "Guided Practice Games", desc: "Play real games under coach guidance so mistakes are corrected in real-time, not discovered weeks later." },
  ];

  const parentTips = [
    "Set a consistent practice schedule at home",
    "Play casual games together — no pressure",
    "Ask your child to explain what they learned",
    "Celebrate progress, not just wins",
    "Attend milestone assessments to track growth",
  ];

  return (
    <main className="bg-white font-sans overflow-x-hidden">
        <Navbar/>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/bg3.jpg')] bg-cover bg-center opacity-[0.42] grayscale" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_20%,#020617_90%)]" />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: "34px 34px" }} />
        </div>

        {/* FLOATING BADGES */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[5%] bg-[#1e293b]/50 backdrop-blur-xl p-5 rounded-[28px] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-2xl text-2xl">🎯</div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Course Level</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Beginners</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[28%] left-[8%] bg-[#1e293b]/50 backdrop-blur-xl p-5 rounded-[28px] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#5D3FD3]/20 border border-[#5D3FD3]/40 rounded-2xl text-2xl">🧩</div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Experience</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Zero Needed</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[30%] right-[5%] bg-[#1e293b]/50 backdrop-blur-xl p-5 rounded-[28px] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-2xl text-2xl">⭐</div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Age Group</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">5 Years & Above</p></div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-[#1e293b]/40 backdrop-blur-md rounded-full px-8 py-2 border border-white/5 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800] animate-pulse" />
            <span className="text-[11px] font-black tracking-[0.3em] uppercase text-[#FFB800]">Foundations Program — ChessEasy Academy</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-[clamp(2rem,9vw,4rem)] font-black tracking-tighter leading-none uppercase text-white mb-6">
            Start Your<br /><span className="text-[#FFB800]">Chess Journey</span><br />From Scratch
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-300 font-bold uppercase tracking-[0.35em] text-[11px] mb-12">
            No experience needed · Step-by-step learning · Play confidently in weeks
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFD060] text-black px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-amber-400/30 active:scale-95">
              Start Free Class
              <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight size={18} />
              </div>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/6 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
              See Curriculum ↓
            </button>
          </motion.div>
        </div>

        {/* WAVE */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="w-full h-[100px] md:h-[140px]">
            <path d="M0,80 C180,110 360,55 540,80 C720,105 900,55 1080,78 C1260,100 1440,70 1440,70 V110 H0 Z" fill="white" fillOpacity="0.1" />
            <path d="M0,100 C120,78 240,112 360,98 C480,84 600,116 720,98 C840,80 960,112 1080,98 C1200,84 1320,112 1440,98 V110 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 mb-5">
          <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">♟ Who This Is For</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
          Built For <span className="text-[#FFB800]">Complete Starters</span>
        </h2>
        <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed mb-14">
          Whether you're a child picking up a piece for the first time or a parent learning alongside your kid — this is the perfect place to begin.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whoFor.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-10 bg-white border border-slate-100 rounded-[28px] gap-5 hover:border-[#FFB800] hover:shadow-xl hover:shadow-amber-100/40 hover:-translate-y-2 transition-all duration-300">
              <span className="text-5xl">{item.icon}</span>
              <p className="font-black text-slate-900 text-base">{item.title}</p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU LEARN ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 mb-5">
              <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">📚 Curriculum</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-5">
              What You Will <span className="text-[#FFB800]">Learn</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
              Our beginner curriculum is carefully sequenced so every new concept builds on the last — creating confident players, not confused ones.
            </p>
            <ul className="flex flex-col gap-4">
              {learnItems.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 text-slate-600 font-semibold text-[15px]">
                  <span className="w-6 h-6 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/40 flex items-center justify-center text-[#FFB800] text-xs font-black flex-shrink-0">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#FFB800]/10 to-[#FFB800]/4 border border-[#FFB800]/25 rounded-[28px] p-10">
              <p className="text-3xl text-[#FFB800] font-serif opacity-50 mb-4">"</p>
              <p className="text-xl md:text-2xl font-bold text-slate-800 italic leading-relaxed">
                Every grandmaster was once a beginner who chose not to quit. Our job is to make that first chapter so exciting, your child will never want to stop.
              </p>
            </div>
            <div className="flex gap-10">
              {[["8+", "Structured Modules"], ["100%", "Beginner Friendly"], ["5★", "Student Rating"]].map(([n, l]) => (
                <div key={l}>
                  <p className="text-4xl font-black text-[#FFB800] tracking-tight">{n}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">🧠 Benefits</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
              Why Chess <span className="text-[#FFB800]">Changes</span> Kids
            </h2>
            <p className="text-white/40 font-medium text-lg max-w-xl mx-auto leading-relaxed">
              Beyond the board — the skills your child builds will last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#1e293b] border border-white/7 rounded-[28px] p-9 hover:border-[#FFB800]/50 hover:shadow-xl hover:shadow-amber-900/20 hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-[18px] bg-[#FFB800]/10 flex items-center justify-center text-[#FFB800] mb-6">{b.icon}</div>
                <h3 className="text-white font-black text-lg mb-3">{b.title}</h3>
                <p className="text-white/45 font-medium text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE STRUCTURE ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 mb-5">
          <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">🗂 Structure</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
          How the <span className="text-[#FFB800]">Program Works</span>
        </h2>
        <p className="text-slate-500 font-medium text-lg max-w-xl leading-relaxed mb-14">
          A proven step-by-step system designed for maximum retention and enjoyment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseSteps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group flex gap-6 p-8 bg-white border border-slate-100 rounded-[28px] hover:border-[#FFB800] hover:shadow-xl hover:shadow-amber-100/40 hover:-translate-y-1 transition-all duration-300">
              <span className="font-black text-[3.5rem] text-slate-100 group-hover:text-[#FFB800] leading-none flex-shrink-0 transition-colors duration-300">{s.num}</span>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PARENT SECTION ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 mb-5">
              <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">👨‍👩‍👧 Parent Guide</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-5">
              How Parents Can <span className="text-[#FFB800]">Support</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
              You don't need to know chess to help your child succeed. Here's what research and our coaches say works best.
            </p>
            <ul className="flex flex-col gap-4">
              {parentTips.map((tip, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-600 font-semibold text-[15px]">
                  <span className="w-6 h-6 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/40 flex items-center justify-center text-[#FFB800] text-xs font-black flex-shrink-0">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-slate-900 rounded-[32px] p-12">
              <div className="text-4xl mb-5">🏅</div>
              <h3 className="text-2xl font-black text-[#FFB800] mb-4">The Milestone Promise</h3>
              <p className="text-white/60 font-semibold text-lg leading-relaxed">
                By the end of this program, your child will be able to{" "}
                <strong className="text-white">play complete chess games confidently</strong>{" "}
                — understanding strategy, seeing threats, and making purposeful moves.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex gap-10">
                {[["4+", "Weeks to First Win"], ["∞", "Lifetime Skill"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-3xl font-black text-[#FFB800] tracking-tight">{n}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 px-6 bg-[#020617] overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,184,0,0.15),transparent)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/25 mb-8">
            <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">♟ Join Today</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-5 uppercase">
            Ready to Make<br />Your <span className="text-[#FFB800]">First Move?</span>
          </h2>
          <p className="text-white/40 font-medium text-lg leading-relaxed mb-12">
            Join hundreds of students who started from zero and now play competitive chess. Your journey begins with a single click.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFD060] text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-amber-400/30 active:scale-95">
              Join Beginners Program
              <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight size={18} />
              </div>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/6 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 px-10 py-6 rounded-full font-black text-xs uppercase tracking-widest transition-all">
              Book Free Demo Class
            </button>
          </div>
        </div>
      </section>

      <Footer/>

    </main>
  );
}