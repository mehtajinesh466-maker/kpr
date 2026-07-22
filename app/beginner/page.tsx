"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { ChevronRight, Star, BookOpen, Brain, Trophy, Target, Users, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BeginnersPage() {
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
    { num: "02", title: "Fun Puzzles", desc: "Interactive puzzles after each module lock in understanding through active practice — not passive watching." },
    { num: "03", title: "Guided Games", desc: "Play real games under coach guidance so mistakes are corrected in real-time, not discovered weeks later." },
  ];

  const parentTips = [
    "Set a consistent practice schedule at home",
    "Play casual games together — no pressure",
    "Ask your child to explain what they learned",
    "Celebrate progress, not just wins",
    "Attend milestone assessments to track growth",
  ];

  return (
    <main className="bg-white text-slate-900 font-sans overflow-x-hidden">
      <Navbar />

      {/* ── 1. HERO SECTION (LIGHT SPLIT HERO) ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-6 overflow-hidden">
        {/* Background Gradients & Chess grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/bg3.jpg')] bg-cover bg-center opacity-[0.08] grayscale" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7A0C0C]/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFB800]/2 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.08]" 
               style={{ backgroundImage: `radial-gradient(black 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#7A0C0C]/5 border border-[#7A0C0C]/10 rounded-full px-5 py-2"
            >
              <Sparkles size={12} className="text-[#7A0C0C]" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#7A0C0C]">Beginner Program</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[70px] font-[900] tracking-tighter leading-[1.05] uppercase text-slate-900"
            >
              Start Your <br className="hidden md:block" />
              <span className="text-[#7A0C0C] bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">Chess Journey</span> <br />
              From Scratch
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 font-medium text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Our beginner coaching at Mylapore and Pallikaranai is designed specifically for young learners taking their first steps on the board. Zero experience needed.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="group w-full flex items-center justify-center gap-3 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-950/20 active:scale-95">
                  Start Free Class
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#curriculum" className="w-full sm:w-auto">
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all">
                  See Curriculum ↓
                </button>
              </a>
            </motion.div>
          </div>

          {/* Hero Right Visual (Glassmorphic Chess Dashboard Panel) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3rem] bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
            >
              {/* Internal decorative gradients */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7A0C0C]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFB800]/5 rounded-full blur-2xl pointer-events-none" />

              {/* Header inside Panel */}
              <div className="flex justify-between items-center z-10">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#7A0C0C]">KPR Academy</span>
                <span className="bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Live Coaching</span>
              </div>

              {/* Center Image */}
              <div className="relative w-full h-[60%] my-4 rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-900">
                <Image 
                  src="/beg.jpeg" 
                  alt="Chess training illustration" 
                  fill 
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-black text-sm uppercase tracking-tight">Structured Foundations</p>
                  <p className="text-white/60 text-[9px] font-semibold mt-1">Nurturing chess minds step-by-step.</p>
                </div>
              </div>

              {/* Bottom stats inside Panel */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 z-10">
                {[["Age 5+", "Target Group"], ["Zero", "Prior Base"], ["4 Weeks", "First Win"]].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <p className="text-slate-900 font-black text-xs">{n}</p>
                    <p className="text-slate-500 text-[7px] font-bold uppercase tracking-wider mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. WHO IS IT FOR (LIGHT PANEL) ── */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">♟ Target Audience</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase text-slate-900">
              Built For <span className="text-[#7A0C0C]">Complete Starters</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Our beginner coaching at Mylapore and Pallikaranai is designed specifically for young learners taking their first steps on the board.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoFor.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#7A0C0C]/30 hover:shadow-2xl hover:shadow-red-950/5 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-4xl block group-hover:scale-110 transition-transform duration-300 w-fit">{item.icon}</span>
                  <h3 className="font-black text-slate-950 text-base uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-8 w-8 h-1 bg-slate-100 group-hover:bg-[#7A0C0C] group-hover:w-16 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHAT YOU LEARN (SPLIT SECTION) ── */}
      <section id="curriculum" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Checklist Info */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">📚 Syllabus Details</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none text-slate-950">
              What You Will <span className="text-[#7A0C0C]">Learn</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Nurtured by FIDE rated mentors, KPR's foundational syllabus introduces kids to structural board coordinates, movements, and initial strategies.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {learnItems.map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-slate-600 font-semibold text-xs leading-relaxed"
                >
                  <CheckCircle2 size={16} className="text-[#7A0C0C] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: Modern Dashboard Quote Block */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-gradient-to-br from-red-50/40 to-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7A0C0C]/5 rounded-full blur-2xl" />
              <p className="text-4xl text-[#7A0C0C] font-serif leading-none mb-4">“</p>
              <p className="text-base md:text-lg font-bold text-slate-800 italic leading-relaxed relative z-10">
                Every grandmaster was once a beginner who chose not to quit. Our job is to make that first chapter so exciting, your child will never want to stop.
              </p>
            </div>
            <div className="flex gap-8 md:gap-12 pl-4">
              {[["8+", "Structured Modules"], ["100%", "Beginner Friendly"], ["5★", "Student Rating"]].map(([n, l]) => (
                <div key={l} className="space-y-1">
                  <p className="text-3xl md:text-4xl font-black text-[#7A0C0C] tracking-tight">{n}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BENEFITS SECTION (LIGHT MODERN GRID) ── */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">🧠 Lifelong Impact</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none text-slate-900">
              Why Chess <span className="text-[#7A0C0C]">Changes</span> Kids
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Chess develops cognitive capabilities, planning skills, and focus that serve children throughout their academic lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-[#7A0C0C]/40 hover:shadow-2xl hover:shadow-red-950/5 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 flex items-center justify-center text-[#7A0C0C] mb-6">
                  {b.icon}
                </div>
                <h3 className="text-slate-950 font-black text-base uppercase tracking-tight mb-3">{b.title}</h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS (ROADMAP) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">🗂 Roadmaps</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none text-slate-950">
              How the <span className="text-[#7A0C0C]">Program Works</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Our structured modules ensure children actively learn through play, guided assessments, and direct coach interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courseSteps.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="group relative bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-[#7A0C0C]/30 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="font-black text-[3.5rem] text-[#7A0C0C] leading-none block">{s.num}</span>
                  <h3 className="font-black text-slate-950 text-base uppercase tracking-tight">{s.title}</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-8 w-12 h-1.5 bg-slate-200 group-hover:bg-[#7A0C0C] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PARENT SUPPORT & PROMISE ── */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Parents details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">👨‍👩‍👧 Family Co-Learning</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none text-slate-950">
              How Parents Can <span className="text-[#7A0C0C]">Support</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              You do not need to play chess to support your child. FIDE Master TV Kumar recommends simple habits to boost their progress.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {parentTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 font-semibold text-xs leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#7A0C0C] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Milestone Promise Card (Crimson Highlight) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="bg-gradient-to-b from-[#7A0C0C] to-red-950 border border-[#7A0C0C]/40 rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden text-white"
            >
              <div className="text-4xl mb-4">🏅</div>
              <h3 className="text-xl font-black text-[#FFB800] uppercase tracking-tight mb-4">The Milestone Promise</h3>
              <p className="text-slate-200 text-xs font-semibold leading-relaxed">
                At KPR Chess Academy, we guarantee your child will learn to play complete games, record notation, handle tournament clocks, and spot direct tactics.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex gap-8">
                {[["4+", "Weeks to first win"], ["∞", "Lifetime Skill"]].map(([n, l]) => (
                  <div key={l} className="space-y-1">
                    <p className="text-2xl font-black text-[#FFB800] tracking-tight">{n}</p>
                    <p className="text-[7px] font-black uppercase tracking-widest text-slate-300 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA SECTION (IMMERSIVE DARK CALLOUT FOR CONTRAST) ── */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden text-center">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#7A0C0C]/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/15 border border-[#7A0C0C]/30">
            <span className="text-[9px] font-black text-[#FFB800] uppercase tracking-widest">♟ Join Today</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter uppercase leading-none text-white">
            Ready to Make <br />
            Your <span className="text-[#7A0C0C] bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">First Move?</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-xl mx-auto">
            Begin your child's strategic learning today. Visit KPR Chess Academy at Mylapore or Pallikaranai, or book a free trial online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-red-950/20 active:scale-95">
                Join Beginners Program
                <ChevronRight size={18} className="text-[#FFB800] group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
                Book Free Demo Class
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}