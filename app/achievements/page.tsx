"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Medal, Star, Users, Target, Globe, 
  ChevronRight, ChevronLeft, TrendingUp, Award, 
  Calendar, MapPin, Quote, Sparkles, CheckCircle2,
  Zap, Camera, History, Crown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Achievements } from "@/components/ach";
import { Testimonials } from "@/components/testimonial";

// --- Sub-components for clean structure ---

const PillBadge = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 shadow-sm mb-6">
    {Icon && <Icon size={12} className="text-[#FFB800]" />}
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{children}</span>
  </div>
);

const SectionHeading = ({ main, highlight, sub }: { main: string, highlight: string, sub: string }) => (
  <div className="flex flex-col items-center text-center space-y-6 mb-16">
    <div className="flex flex-wrap items-center justify-center gap-4">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">{main}</h2>
      <div className="inline-block bg-[#FFB800] text-black px-8 py-3 rounded-[2rem] shadow-xl shadow-amber-200/20">
        <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">{highlight}</span>
      </div>
    </div>
    <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg">{sub}</p>
  </div>
);

// --- Main Page Component ---

export default function AchievementsPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navbar/>
      
      {/* 1. HERO SECTION (High Fidelity Technical Banner) */}
      <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image src="/bg7.jpg" alt="Trophy" fill className="object-cover opacity-20 grayscale" priority />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '35px 35px' }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center -mt-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center bg-[#1e293b]/40 backdrop-blur-md rounded-full px-6 py-2 border border-white/5 mb-10">
            <Trophy size={14} className="text-[#FFB800] mr-2" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Excellence Showcased</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-none uppercase text-white mb-8">
            <span className="italic font-normal">CELEBRATING</span> <br/>
            <span className="text-[#FFB800]">EXCELLENCE.</span>
          </motion.h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs max-w-3xl mx-auto leading-relaxed mb-10">
            Showcasing the achievements, milestones, <br className="hidden md:block"/> & success stories of our students worldwide.
          </p>
          <Link href="/contact">
            <button className="bg-[#FFB800] text-black px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all active:scale-95">
              Join The Academy
            </button>
          </Link>
        </div>
        {/* Organic Wave Transition */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[80px] md:h-[150px]">
            <path d="M0,80 C180,110 360,60 540,85 C720,110 900,55 1080,80 C1260,105 1440,75 1440,75 V120 H0 Z" fill="white" fillOpacity="0.12"/>
            <path d="M0,100 C120,80 240,115 360,100 C480,85 600,120 720,100 C840,80 960,115 1080,100 C1200,85 1320,115 1440,100 V120 H0 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* 2. ACHIEVEMENT HIGHLIGHTS (Large Stat Cards) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {[
              { val: "1000+", label: "Students Trained", icon: Users, color: "bg-blue-500" },
              { val: "250+", label: "Tournament Medals", icon: Trophy, color: "bg-amber-500" },
              { val: "100+", label: "State Participants", icon: MapPin, color: "bg-purple-500" },
              { val: "50+", label: "National Players", icon: Medal, color: "bg-rose-500" },
              { val: "25+", label: "FIDE Rated Students", icon: Star, color: "bg-emerald-500" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all">
                <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter leading-none mb-2">{stat.val}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Achievements/>

     {/* CHESS RATING PROGRESSION */}
<section className="py-28 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    <SectionHeading
      main="Rating"
      highlight="Progression"
      sub="A structured pathway that transforms beginners into confident tournament competitors."
    />

    <div className="relative mt-20">

      {/* Connection Line */}
      <div className="hidden lg:block absolute top-24 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-200 via-[#FFB800] to-slate-200" />

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

        {[
          {
            icon: "♙",
            title: "Beginner",
            range: "800 - 1000",
            desc: "Chess fundamentals, piece movement and basic checkmates.",
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: "♘",
            title: "Developing",
            range: "1000 - 1300",
            desc: "Tactics, forks, pins, skewers and board awareness.",
            color: "from-pink-500 to-rose-500",
          },
          {
            icon: "♗",
            title: "Strategic",
            range: "1300 - 1600",
            desc: "Positional understanding and opening preparation.",
            color: "from-purple-500 to-violet-500",
          },
          {
            icon: "♖",
            title: "Competitive",
            range: "1600 - 1900",
            desc: "Tournament preparation and advanced calculations.",
            color: "from-orange-500 to-amber-500",
          },
          {
            icon: "♕",
            title: "Elite",
            range: "1900+",
            desc: "Master-level thinking and competitive excellence.",
            color: "from-[#FFB800] to-yellow-500",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dot on timeline */}
            <div className="hidden lg:flex absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#FFB800] z-20" />

            <div className="group h-full bg-white border border-slate-200 rounded-[32px] p-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

              {/* Piece */}
              <div
                className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-5xl shadow-lg`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="text-center mt-6">
                <h3 className="text-2xl font-black text-slate-900">
                  {item.title}
                </h3>

                <div className="inline-flex items-center mt-3 px-4 py-2 rounded-full bg-slate-100">
                  <span className="font-bold text-slate-700">
                    {item.range}
                  </span>
                </div>

                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>

  </div>
</section>


      {/* 10. CERTIFICATES & GALLERY (Grid with Lightbox) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading main="Awards" highlight="Gallery" sub="Capturing the moments of triumph and recognition across various events." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {["ach1.jpeg", "ach2.jpeg", "ach3.jpeg", "ach4.jpeg"].map((img, i) => (
               <motion.div key={i} whileHover={{ scale: 0.98 }} onClick={() => setSelectedImg(`/${img}`)}
                className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group border-4 border-slate-50">
                  <Image src={`/${img}`} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-[#FFB800]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={30} className="text-white" />
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <Testimonials/>

     {/* COMPACT CTA */}
<section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative max-w-6xl mx-auto overflow-hidden rounded-[28px] md:rounded-[36px] bg-slate-950"
  >
    {/* Pattern */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(#7A0C0C 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />

    <div className="relative z-10 px-6 py-10 md:px-10 md:py-12">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left */}
        <div className="text-center lg:text-left max-w-2xl">

          <PillBadge icon={Sparkles}>
            Join KPR Chess Academy
          </PillBadge>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
            Start Your Journey To
            <span className="block text-[#FFB800]">
              Chess Excellence
            </span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-slate-400 max-w-xl">
            Learn from experienced coaches, compete with confidence,
            and build the strategic mindset needed for success.
          </p>

        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <Link href="/contact">
            <button className="w-full sm:w-auto bg-[#FFB800] text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.15em] hover:scale-105 transition-all">
              Book Free Demo
            </button>
          </Link>

          <Link href="/courses">
            <button className="w-full sm:w-auto border border-white/15 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all">
              Explore Programs
            </button>
          </Link>

        </div>

      </div>

    </div>
  </motion.div>
</section>
      <Footer/>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6" onClick={() => setSelectedImg(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-4xl w-full h-auto aspect-square md:aspect-video rounded-[3rem] overflow-hidden bg-white shadow-2xl">
               <Image src={selectedImg} alt="Preview" fill className="object-contain bg-black" />
               <button className="absolute top-8 right-8 text-white bg-white/10 hover:bg-[#FFB800] hover:text-black p-4 rounded-full backdrop-blur-md transition-all">X</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}