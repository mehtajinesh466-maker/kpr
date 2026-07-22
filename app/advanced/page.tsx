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
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdvancedPage() {
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
    <main className="bg-white text-slate-900 font-sans overflow-x-hidden">
      <Navbar />

      {/* ── 1. HERO SECTION (LIGHT SPLIT HERO) ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-6 overflow-hidden">
        {/* Background Gradients & Chess grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/bg2.jpg')] bg-cover bg-center opacity-[0.08] grayscale" />
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
              <span className="text-[10px] font-black tracking-widest uppercase text-[#7A0C0C]">Advanced Program</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[70px] font-[900] tracking-tighter leading-[1.05] uppercase text-slate-900"
            >
              Enter The <br className="hidden md:block" />
              <span className="text-[#7A0C0C] bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">Elite Ranks</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 font-medium text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Master advanced middlegames, precise endgame calculations, and psychological tournament preparation under FIDE rated mentors in Chennai.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="group w-full flex items-center justify-center gap-3 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-950/20 active:scale-95">
                  Enroll In Advanced
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

          {/* Hero Right Visual */}
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
                <span className="bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Elite Tier</span>
              </div>

              {/* Center Image */}
              <div className="relative w-full h-[60%] my-4 rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-900">
                <Image 
                  src="/mas.jpg" 
                  alt="Advanced Chess training" 
                  fill 
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-black text-sm uppercase tracking-tight">Tournament Prep</p>
                  <p className="text-white/60 text-[9px] font-semibold mt-1">FIDE Rated Master level guides.</p>
                </div>
              </div>

              {/* Bottom stats inside Panel */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 z-10">
                {[["1400-2200", "Rating Target"], ["FIDE Engine", "Analysis"], ["1-on-1 Audits", "Reviews"]].map(([n, l]) => (
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

      {/* ── 2. ELIGIBILITY / WHO IS IT FOR (LIGHT PANEL) ── */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">♟ Elite Requirements</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase text-slate-900">
              Built For <span className="text-[#7A0C0C]">Active Competitors</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              Designed for tournament players and rating seekers ready for intense positional, technical, and mental training.
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

      {/* ── 3. CURRICULUM LIST & DETAIL (SPLIT SECTION) ── */}
      <section id="curriculum" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Checklist Info */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">📚 Syllabus Details</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none text-slate-950">
              Elite Repertoire & <span className="text-[#7A0C0C]">Strategy</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              We cover high-level positional plans, complex tactical sacrifices, engine evaluations, and specific theoretical opening prep.
            </p>
            <ul className="grid grid-cols-1 gap-3 pt-2">
              {curriculumList.map((item, i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {curriculumCards.map((item, i) => (
                <motion.div key={i} className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-[#FFB800] flex items-center justify-center font-black text-xs shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-black text-slate-900 text-sm mb-1">{item.title}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TRAINING SYSTEM (LIGHT MODERN ROADMAP) ── */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/25">
              <span className="text-[9px] font-black text-[#7A0C0C] uppercase tracking-widest">⚙️ Methodology</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter uppercase leading-none text-slate-950">
              The Elite <span className="text-[#7A0C0C]">Training System</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
              We leverage advanced engines, timed tournament simulations, 1-on-1 FIDE mentor analyses, and structured self-study tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingSystem.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-[#7A0C0C]/30 hover:shadow-xl transition-all duration-300"
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

      {/* ── 5. MILESTONE PROMISE CARD ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="w-full max-w-4xl bg-gradient-to-b from-[#7A0C0C] to-red-950 border border-[#7A0C0C]/40 rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden text-white text-center"
          >
            <div className="w-12 h-12 bg-[#FFB800] rounded-2xl flex items-center justify-center mx-auto mb-6"><Crown className="text-black" size={24} /></div>
            <h3 className="text-2xl md:text-4xl font-black text-[#FFB800] uppercase tracking-tight mb-4">The Milestone Promise</h3>
            <p className="text-slate-200 text-xs md:text-sm font-semibold leading-relaxed max-w-xl mx-auto mb-8">
              At KPR Chess Academy, we guarantee FIDE standard timed play preparations, opening books custom-built for your child, and calculated strategies to systematically boost FIDE ratings.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {["1800+ Rating", "FIDE Standards", "Positional Mastery", "Self-Study Repertoire"].map((tag) => (
                <span key={tag} className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-wider
                  ${tag === "1800+ Rating" ? "bg-[#FFB800] text-black shadow-md" : "bg-white/5 border border-white/10 text-slate-300"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA SECTION ── */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#7A0C0C]/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/15 border border-[#7A0C0C]/30">
            <span className="text-[9px] font-black text-[#FFB800] uppercase tracking-widest">♟ Get Started</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-[900] tracking-tighter uppercase leading-none text-white">
            Ready to Dominate <br />
            The <span className="text-[#7A0C0C] bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Tournaments?</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed max-w-xl mx-auto">
            Take the leap. Build a professional rating profile under expert mentors in Chennai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-red-950/20 active:scale-95">
                Join Advanced Level
                <ChevronRight size={18} className="text-[#FFB800] group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
                Book Free Trial Class
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}