"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, CheckCircle2, ChevronRight, MessageCircle, 
  Users, Trophy, Zap, AlertOctagon, Timer, 
  ArrowRight, ShieldCheck, Play, Plus, Minus,
  Target, TrendingUp, Medal, Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import CoursesSection from '@/components/course';
import { Footer } from '@/components/footer';

// --- Components ---

const ButtonPill = ({ children, primary = true, className = "" }: any) => (
  <button className={`
    group flex items-center justify-center gap-3 px-8 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl
    ${primary ? "bg-[#FFB800] text-black shadow-amber-500/20 hover:bg-[#FFA500]" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}
    ${className}
  `}>
    {children}
    {primary && <div className="bg-black/10 p-1 rounded-full group-hover:translate-x-1 transition-transform"><ChevronRight size={18}/></div>}
  </button>
);

export default function LeadGenLanding() {
  const yellow = "#FFB800";
  const [timeLeft, setTimeLeft] = useState({ mins: 15, secs: 0 });

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.mins === 0 && prev.secs === 0) return { mins: 15, secs: 0 };
        const newSecs = prev.secs === 0 ? 59 : prev.secs - 1;
        const newMins = prev.secs === 0 ? prev.mins - 1 : prev.mins;
        return { mins: newMins, secs: newSecs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white font-sans text-slate-900 overflow-x-hidden">
      <Navbar/>
      
      {/* ── 1. HERO SECTION (Above the Fold) ── */}
      <section className="relative min-h-screen flex items-center pt-4 pb-20 bg-[#020617] overflow-hidden px-4 md:px-6">
  {/* Background Effects */}
  <div className="absolute inset-0 z-0">
    <div 
      className="absolute inset-0 opacity-10" 
      style={{ 
        backgroundImage: `radial-gradient(circle at 25% 30%, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px' 
      }} 
    />
    <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-purple-600/10 blur-[140px] rounded-full" />
    <div className="absolute bottom-0 left-0 w-[45%] h-[50%] bg-[#FFB800]/10 blur-[120px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto w-full relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
      {/* Left Side - Content */}
      <div className="space-y-8 lg:space-y-10 text-center lg:text-left">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mx-auto lg:mx-0">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={14} className="fill-[#FFB800] text-[#FFB800]" />
            ))}
          </div>
          <span className="text-sm font-semibold text-white">4.9/5 • Loved by 127+ Parents</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white tracking-tighter leading-[1.05] max-w-[620px] mx-auto lg:mx-0">
          Turn Your Child Into a{' '}
          <span className="bg-gradient-to-r from-[#FFB800] via-yellow-400 to-amber-300 bg-clip-text text-transparent">
            Confident Chess Champion
          </span>{' '}
          in Just 12 Weeks
        </h1>

        {/* Subheadline */}
        <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
          Live interactive classes with <span className="text-white font-semibold">FIDE-rated coaches</span>.<br />
          Small batches • Beginner to Tournament level.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-md mx-auto lg:mx-0">
          {[
            { icon: <CheckCircle2 size={22} className="text-[#FFB800]" />, text: "Ages 6+" },
            { icon: <CheckCircle2 size={22} className="text-[#FFB800]" />, text: "Live Interactive" },
            { icon: <CheckCircle2 size={22} className="text-[#FFB800]" />, text: "Max 5 Students" },
            { icon: <CheckCircle2 size={22} className="text-[#FFB800]" />, text: "Tournament Ready" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-white">
              {item.icon}
              <span className="font-semibold text-base md:text-lg">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
  
  {/* Trial Class Button */}
  <Link href="/contact">
    <ButtonPill
      className="text-lg px-10 py-4 font-bold shadow-xl shadow-red-900/20 bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 hover:shadow-2xl hover:shadow-[#FFB800]/30 hover:-translate-y-0.5 transition-all duration-300"
    >
      Book Free Trial Class Now
    </ButtonPill>
  </Link>

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/919941987881?text=Hi%20I%20want%20to%20know%20more%20about%20your%20chess%20classes"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 text-white font-bold text-sm uppercase tracking-widest transition-all hover:bg-white/5"
  >
    <MessageCircle
      size={22}
      className="text-green-400 group-hover:scale-110 transition-transform"
    />
    Chat on WhatsApp
  </a>

</div>

        {/* Social Proof */}
        <div className="flex items-center justify-center lg:justify-start gap-10 pt-6 border-t border-white/10">
          <div>
            <p className="text-3xl font-black text-white">2000+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Students Trained</p>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div>
            <p className="text-3xl font-black text-white">15+</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">FIDE Rated Coaches</p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="relative flex justify-center lg:justify-end pt-8 lg:pt-0">
        <div className="relative w-full max-w-[520px] lg:max-w-[560px]">
          {/* Main Image Container */}
          <div className="relative aspect-[3/3.65] rounded-[3.5rem] overflow-hidden border-[14px] border-white/10 shadow-2xl shadow-black/70">
            <Image 
              src="/ach4.jpeg" 
              alt="Kids learning chess with professional coach" 
              fill 
              className="object-cover"
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Live Badge */}
            <div className="absolute top-6 right-6 px-5 py-2 bg-black/70 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-2 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              LIVE CLASSES RUNNING
            </div>
          </div>

  
        </div>
      </div>
    </div>
  </div>
</section>

{/* ── 2. WHY PARENTS CHOOSE US ── */}
<section className="py-16 md:py-24 px-6 bg-slate-50">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12 md:mb-16 space-y-4">
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
        Why Parents Trust <span className="text-[#7A0C0C]">KPR Chess Academy</span>
      </h2>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">
        Everything your child needs to fall in love with chess and improve fast
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {[
        {
          number: "1",
          color: "bg-blue-500",
          title: "FIDE Rated Coaches",
          desc: "Learn from certified tournament players with years of teaching experience.",
          icon: <ShieldCheck size={26} />
        },
        {
          number: "2",
          color: "bg-slate-500",
          title: "Small Batch Training",
          desc: "Maximum 5 students per group for personalized attention.",
          icon: <Users size={26} />
        },
        {
          number: "3",
          color: "bg-rose-500",
          title: "Structured 12-Week Curriculum",
          desc: "Step-by-step roadmap from beginner to 1400+ rating.",
          icon: <Target size={26} />
        },
        {
          number: "4",
          color: "bg-amber-500",
          title: "Tournament Preparation",
          desc: "Regular mock tournaments and rating guidance.",
          icon: <Trophy size={26} />
        },
        {
          number: "5",
          color: "bg-blue-500",
          title: "Personalized Progress Reports",
          desc: "Weekly feedback and detailed performance tracking.",
          icon: <TrendingUp size={26} />
        },
        {
          number: "6",
          color: "bg-slate-500",
          title: "Beginner Friendly",
          desc: "No prior experience needed. Fun & engaging classes.",
          icon: <Sparkles size={26} />
        },
      ].map((card, i) => (
        <div
          key={i}
          className="group bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex gap-5 md:gap-6"
        >
          {/* Number Circle */}
          <div className={`${card.color} w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-2xl shadow-md`}>
            {card.number}
          </div>

          <div className="pt-1 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-amber-50 text-[#FFB800] flex items-center justify-center group-hover:bg-[#FFB800] group-hover:text-white transition-all">
                {card.icon}
              </div>
              <h4 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{card.title}</h4>
            </div>
            <p className="text-slate-600 text-[15px] md:text-base leading-relaxed">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  {/* ── 3. STUDENT TRANSFORMATION ── */}
<section className="py-20 md:py-24 px-6 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
        Visualizing <span className="text-[#FFB800]">Real Results</span>
      </h2>
      <p className="text-slate-600 mt-3 text-lg">Our students' journey from beginners to champions</p>
    </div>

    {/* Auto Scrolling Carousel - Fully Self-Contained */}
    <div className="relative">
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          gap: 24px;
          animation: marquee 35s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-marquee">
        {[
          "/ach5.jpeg",
          "/ach2.jpeg",
          "/ach3.jpeg",
          "/ach4.jpeg",
          "/ach5.jpeg",
          "/ach2.jpeg",
          "/ach3.jpeg",
          "/ach4.jpeg",
        ].map((src, i) => (
          <div 
            key={i} 
            className="relative h-[360px] md:h-[440px] w-[260px] md:w-[320px] flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={src}
              alt="Student chess transformation"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority={i < 4}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Optional subtle label */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-4 py-2.5 rounded-2xl text-center">
              Student Transformation
            </div>
          </div>
        ))}
      </div>

      {/* Fade Gradients */}
      </div>
  </div>
</section>

      {/* ── 5. FREE TRIAL BREAKDOWN ── */}
      <section className="py-24 px-6 bg-[#0A0F1C] relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${yellow} 2px, transparent 0)`, backgroundSize: '40px 40px' }} />
         <div className="max-w-5xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-16 leading-tight">What Happens In Your <span className="text-[#FFB800]">₹99 Trial?</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
               {/* Desktop line */}
               <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px border-t border-dashed border-white/20 -z-0" />
               
               {[
                 { step: "01", title: "Assessment", sub: "Analyze level" },
                 { step: "02", title: "Puzzles", sub: "Test tactics" },
                 { step: "03", title: "Mini Game", sub: "Practical play" },
                 { step: "04", title: "Report", sub: "Gaps identified" },
                 { step: "05", title: "Roadmap", sub: "Success plan" }
               ].map((item, i) => (
                 <div key={i} className="relative z-10 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFB800] text-black font-black flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">{item.step}</div>
                    <div>
                       <p className="text-white font-black text-sm">{item.title}</p>
                       <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">{item.sub}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-16">
               <Link href="https://pages.razorpay.com/chesseasy-trial">
               <ButtonPill className="mx-auto">Book My Trial For ₹99</ButtonPill>
               </Link>
            </div>
         </div>
      </section>

      {/* ── 7. COMMON MISTAKES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">Does Your Child Do These <br /><span className="text-red-500">6 Fatal Mistakes?</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               "Bringing Queen out too early", "Ignoring King safety", "Not controlling the center",
               "Poor pawn structure", "Slow/Weak development", "Playing 'Hope Chess'"
             ].map((mistake, i) => (
               <div key={i} className="flex items-center gap-5 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-red-200 transition-all">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                     <AlertOctagon size={24} />
                  </div>
                  <p className="text-slate-800 font-black text-base">{mistake}</p>
               </div>
             ))}
          </div>
          <p className="text-center mt-12 text-slate-500 font-bold italic">Professional coaching helps eliminate these mistakes quickly and permanently.</p>
        </div>
      </section>

     <CoursesSection/>

      {/* ── 10. STATS SECTION ── */}
      <section className="py-16 bg-white border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Students Trained", val: "1000+" },
              { label: "Rated Players", val: "30+" },
              { label: "Coaches", val: "15+" },
              { label: "Satisfaction", val: "98%" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                 <p className="text-4xl md:text-5xl font-black text-[#FFB800] tracking-tighter">{stat.val}</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

     {/* ── FINAL CONVERSION SECTION ── */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-5xl mx-auto bg-[#020617] rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl text-center">
    
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `radial-gradient(${yellow} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />

    <div className="relative z-10 space-y-6">
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
        Ready to Start Your Child&apos;s
        <br />
        <span className="text-[#FFB800]">Chess Journey?</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-white/60 font-bold text-[10px] uppercase tracking-widest">
        {[
          "Skill Assessment",
          "Personal Feedback",
          "Trial Class",
          "Curriculum Roadmap",
        ].map((item) => (
          <div
            key={item}
            className="flex flex-col items-center gap-1.5"
          >
            <CheckCircle2
              size={18}
              className="text-[#FFB800]"
            />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <ButtonPill className="w-full sm:w-auto">
          Book ₹99 Trial Class
        </ButtonPill>

        <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all w-full sm:w-auto justify-center">
          <MessageCircle
            size={18}
            className="text-green-400"
          />
          WhatsApp Us
        </button>
      </div>
    </div>
  </div>
</section>
      <Footer/>

    </div>
  );
}