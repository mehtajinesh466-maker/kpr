"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Crown, 
  BookOpen, 
  Swords, 
  Activity, 
  Target, 
  ShieldCheck, 
  Trophy,
  ArrowDown,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdvancedPage() {
  const yellow = "#FFB800";

  const whoFor = [
    { icon: "♟", title: "Experienced Players", desc: "Comfortable in complex middlegame positions and familiar with advanced tactical motifs." },
    { icon: "🏆", title: "Tournament Players", desc: "Already competing at state or club level and want to break into the national elite ranks." },
    { icon: "📈", title: "Rating Seekers", desc: "FIDE or national rating improvement is your primary goal. You want to reach the 1800+ bracket." },
    { icon: "🎯", title: "Goal-Driven Students", desc: "Self-motivated learners who are ready to commit to rigorous homework and self-study drills." },
  ];

  const curriculumList = [
    "Deep opening theory & personal repertoire building",
    "Advanced middlegame strategic planning",
    "Calculation training & visualization drills",
    "Endgame precision — theoretical & practical",
    "Positional chess — pawn structure mastery",
    "Complex tactic combinations & sacrifices",
    "Psychological preparation for high-stakes tournaments",
  ];

  const curriculumCards = [
    { icon: "♟", title: "Opening Theory", desc: "Build a reliable personal repertoire for both White & Black that suits your unique style." },
    { icon: "🗺", title: "Strategic Planning", desc: "Long-term positional understanding — learning to improve the worst piece on the board." },
    { icon: "🔢", title: "Calculation", desc: "Systematic calculation methods to evaluate complex positions without blundering." },
    { icon: "⚡", title: "Endgame Precision", desc: "Hold drawn positions and convert winning ones. The endgame separates the good from the great." },
  ];

  const trainingSystem = [
    { num: "01", title: "Online Supervised Games", desc: "Coach-supervised games with real-time feedback. No bad habits slip through unnoticed." },
    { num: "02", title: "Tournament Simulations", desc: "Real pressure — timed rounds, regulated conditions, and deep post-round analysis." },
    { num: "03", title: "Detailed Game Analysis", desc: "Every training game reviewed move by move. Understand not just what went wrong, but why." },
    { num: "04", title: "Structured Homework", desc: "Weekly assignments covering openings and tactics with rigorous tracking and accountability." },
    { num: "05", title: "Self-Study Tracking", desc: "Progress dashboards so students and parents can measure rating improvement objectively." },
    { num: "06", title: "1-on-1 Review Sessions", desc: "Personalized sessions to address specific weaknesses, opening gaps, and mental game." },
  ];

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bg2.jpg" 
            alt="Elite Chess" 
            fill 
            className="object-cover opacity-20 grayscale" 
            priority 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: "35px 35px" }} />
        </div>

        {/* Floating Badges (Desktop) */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] left-[6%] bg-white/5 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#FFB800] rounded-2xl text-black shadow-lg"><Crown size={22}/></div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Status</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Elite Tier</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[30%] right-[6%] bg-white/5 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#5D3FD3] rounded-2xl text-white shadow-lg"><Target size={22}/></div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Target</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">FIDE Rating 1800+</p></div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto -mt-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_10px_#FFB800] animate-pulse" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-[#FFB800]">Advanced Tournament Program — ChessEasy</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-[80px] font-black tracking-tighter leading-none uppercase text-white mb-8">
            <span className="italic font-normal">MASTER</span><br />
            HIGH-LEVEL <span className="text-[#FFB800]">CHESS.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-12 max-w-3xl mx-auto leading-relaxed">
            Deep theory · Strategic precision · Master endgames · Performance analysis
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-400/30 active:scale-95">
                JOIN ADVANCED TIER
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
              Curriculum <ArrowDown size={16} className="animate-bounce ml-1" />
            </button>
          </motion.div>
        </div>

        {/* Organic Wave */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[100px] md:h-[150px]">
            <path d="M0,80 C180,110 360,60 540,85 C720,110 900,55 1080,80 C1260,105 1440,75 1440,75 V120 H0 Z" fill="white" fillOpacity="0.12"/>
            <path d="M0,100 C120,80 240,115 360,100 C480,85 600,120 720,100 C840,80 960,115 1080,100 C1200,85 1320,115 1440,100 V120 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── WHO QUALIFIES SECTION ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100">
               <ShieldCheck size={14} className="text-[#FFB800]" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Eligibility Criteria</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              For Serious <br />
              <span className="inline-block bg-[#FFB800] text-black px-4 rounded-2xl transform -rotate-1 mt-2 shadow-xl shadow-amber-200/20">Competitive Players</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoFor.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="bg-slate-50 p-10 rounded-[3.5rem] flex flex-col items-center text-center gap-6 group border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-md flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                    <p className="text-slate-900 font-black text-xl mb-3 tracking-tight">{item.title}</p>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEEP CURRICULUM SECTION ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                Elite-Level <br />
                <span className="text-[#FFB800]">Training Areas</span>
                </h2>
                <p className="text-slate-500 font-medium text-lg max-w-xl">
                  Our advanced syllabus covers every dimension of high-performance chess — the same areas world-class coaches focus on.
                </p>
            </div>
            
            <div className="space-y-4">
              {curriculumList.map((item, i) => (
                <motion.div key={i} className="flex items-center gap-4 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-[#FFB800] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#FFB800]/10 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-all">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-slate-700 font-bold text-sm md:text-base">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {curriculumCards.map((card, i) => (
              <motion.div key={i} className="bg-slate-900 p-8 rounded-[3rem] text-white border-b-4 border-[#FFB800] hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-black text-lg mb-2 tracking-tight">{card.title}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING SYSTEM ── */}
      <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${yellow} 2px, transparent 0)`, backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Activity size={14} className="text-[#FFB800]" />
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Mastery Engine</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
              How Elite Players <span className="text-[#FFB800]">Train</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
              Our training infrastructure mirrors what top national academies use to develop master-level tournament players.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingSystem.map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-sm group hover:border-[#FFB800]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB800] flex items-center justify-center text-black font-black text-sm mb-6 shadow-xl shadow-amber-500/20">{item.num}</div>
                <h3 className="text-white font-black text-xl mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOME STRIP ── */}
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div whileInView={{ scale: [0.98, 1] }} className="bg-[#FFB800] rounded-[4rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-amber-200">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-black font-black text-3xl md:text-4xl tracking-tighter uppercase leading-none">Your Target Outcome:</h4>
            <p className="text-black/60 font-black text-xl md:text-2xl tracking-tighter uppercase italic">Dominating State & National Level Open Tournaments</p>
          </div>
          <Link href="/contact" className="w-full md:w-auto">
            <button className="w-full flex items-center justify-center gap-4 bg-black text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                ENROLL TODAY
                <ChevronRight size={18} />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* ── FINAL CTA SECTION ── */}
      <section className="relative py-32 px-6 bg-[#020617] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,184,0,0.1),transparent)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              Play At A<br /><span className="text-[#FFB800]">Higher Level.</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              The difference between a plateau and a rating breakthrough is the right coaching system. Choice is yours. Join the elite.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Link href="/contact" className="w-full sm:w-auto">
                <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-400/30 active:scale-95">
                  ENROLL IN ADVANCED TRAINING
                  <div className="bg-black/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={18} />
                  </div>
                </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}