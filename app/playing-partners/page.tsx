"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Swords, 
  Zap, 
  Users, 
  Trophy, 
  Target, 
  ShieldCheck, 
  Activity,
  ArrowDown,
  MessageCircle,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PlayingPartnerPage() {
  const yellow = "#FFB800";

  const benefits = [
    { icon: <Swords size={28} />, title: "Elite Matchmaking", desc: "Get matched with top-rated FIDE players and International Masters based on your specific level." },
    { icon: <Activity size={28} />, title: "Live Feedback", desc: "Don't just play—learn. Partners provide brief post-game tactical insights on your critical blunders." },
    { icon: <Zap size={28} />, title: "Pattern Mastery", desc: "Exposing yourself to higher-level moves forces your brain to recognize complex patterns faster." },
  ];

  const features = [
    { num: "01", title: "Smart Scheduling", desc: "Choose time slots that fit your routine. Play from anywhere in the world." },
    { num: "02", title: "Game Archiving", desc: "Every match is recorded and archived for you to review with your main coach later." },
    { num: "03", title: "Variety of Styles", desc: "Play against aggressive attackers, solid positional players, and endgame specialists." },
    { num: "04", title: "Tournament Prep", desc: "Simulate specific tournament time controls (Rapid, Blitz, or Classical) to build stamina." },
  ];

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bg6.jpg" 
            alt="Chess Competition" 
            fill 
            className="object-cover opacity-20 grayscale" 
            priority 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: "35px 35px" }} />
        </div>

        {/* Floating Badges */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] left-[6%] bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#FFB800] rounded-2xl text-black shadow-lg"><Users size={22}/></div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Service</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Playing Partner</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[30%] right-[6%] bg-white/5 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-[#5D3FD3] rounded-2xl text-white shadow-lg"><Swords size={22}/></div>
            <div><p className="text-white/40 text-[8px] font-black uppercase tracking-widest mb-1">Exposure</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Top-Rated Opponents</p></div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto -mt-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_10px_#FFB800] animate-pulse" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-[#FFB800]">Elite Matchmaking — ChessEasy Facility</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-none uppercase text-white mb-8">
            <span className="italic font-normal">COMPETE TO</span><br />
            BE THE <span className="text-[#FFB800]">BEST.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-12 max-w-3xl mx-auto leading-relaxed">
            Real games · Real opponents · Real progress
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-400/30 active:scale-95">
                FIND A PARTNER NOW
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all">
              How it works <ArrowDown size={16} className="animate-bounce ml-1" />
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

      {/* ── SERVICE INFORMATION ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100">
               <ShieldCheck size={14} className="text-[#FFB800]" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Service Information</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Opportunities to <br />
              <span className="inline-block bg-[#FFB800] text-black px-4 rounded-2xl transform -rotate-1 mt-2 shadow-xl shadow-amber-200/20">Compete & Conquer</span>
            </h2>
            <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-2xl">
              The students will get the chance to play against <strong className="text-slate-900">top-rated players</strong>. One important thing to remember while playing chess is the opportunity to compete against good players. 
            </p>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Chesseasy provides the specialized facility of playing partners that can help you make a <span className="text-[#FFB800] font-black italic">huge difference</span> in your game of chess.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[["IM/GM", "Exposure"], ["Live", "Analysis"], ["24/7", "Availability"]].map(([n, l]) => (
                    <div key={l} className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">{n}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{l}</p>
                    </div>
                ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
             <div className="relative aspect-square rounded-[4rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl shadow-purple-500/10">
                <Image src="/ach5.jpeg" alt="Player Focus" fill className="object-cover" />
             </div>
             {/* Floating Achievement Card */}
             <motion.div whileInView={{ x: [0, -20, 0] }} className="absolute -bottom-6 -left-6 bg-slate-950 p-6 rounded-[2.5rem] shadow-2xl border-4 border-white flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB800] flex items-center justify-center text-black">
                   <Target size={24} />
                </div>
                <div>
                   <p className="text-white font-black text-lg leading-none">100%</p>
                   <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Growth Focus</p>
                </div>
             </motion.div>
          </div>

        </div>
      </section>

      {/* ── CORE BENEFITS SECTION ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">Why Use a <span className="text-[#FFB800]">Playing Partner?</span></h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">Static study is only half the battle. Testing your knowledge against a superior mind is the only way to solidify skill.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col items-center text-center group transition-all duration-300">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#FFB800] flex items-center justify-center text-black mb-8 shadow-xl shadow-amber-200/40 group-hover:rotate-6 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-slate-900 font-black text-2xl mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        {/* Technical dot pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${yellow} 2px, transparent 0)`, backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 text-center md:text-left">
             <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">Mastery Engine <br/><span className="text-[#FFB800]">Program Features</span></h2>
             </div>
             <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center"><BarChart3 className="text-[#FFB800]" size={32}/></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm group hover:border-[#FFB800]/50 transition-all duration-300 flex flex-col h-full">
                <div className="text-slate-500 font-black text-4xl mb-6 group-hover:text-[#FFB800] transition-colors">{item.num}</div>
                <h3 className="text-white font-black text-xl mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOME PILL ── */}
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div whileInView={{ scale: [0.98, 1] }} className="bg-[#FFB800] rounded-[4rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-amber-200">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-black font-black text-3xl md:text-4xl tracking-tighter uppercase leading-none">The Ultimate Edge:</h4>
            <p className="text-black/60 font-black text-xl md:text-2xl tracking-tighter uppercase italic">Bridging the gap between casual play and pro dominance</p>
          </div>
          <Link href="/contact" className="w-full md:w-auto">
            <button className="w-full flex items-center justify-center gap-4 bg-black text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                BOOK YOUR PARTNER
                <ChevronRight size={18} />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* ── FINAL CTA SECTION ── */}
      <section className="relative py-32 px-6 bg-[#020617] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,184,0,0.15),transparent)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              Iron Sharpens<br /><span className="text-[#FFB800]">Iron.</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Ready to see the difference a pro opponent makes? Schedule your first match session today and transform your tactical awareness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
                <button className="group w-full flex items-center justify-center gap-4 bg-[#FFB800] hover:bg-[#FFA500] text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-400/30 active:scale-95">
                  GET YOUR PLAYING PARTNER
                  <div className="bg-black/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={18} />
                  </div>
                </button>
            </Link>
            <button className="flex items-center justify-center gap-3 px-10 py-6 bg-white/5 border border-white/10 rounded-full text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                <MessageCircle size={18} className="text-[#FFB800]" />
                Contact Support
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}