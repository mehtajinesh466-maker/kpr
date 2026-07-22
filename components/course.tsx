"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trophy, BookOpen, X, Star, Zap, ChevronRight } from 'lucide-react';

const courses = [
  {
    title: "BEGINNER PROGRAM",
    level: "PROGRAM 01",
    rating: "0-600 Rating",
    subtitle: "Learn the fundamentals of board coordinates, piece movements, and standard starting positions.",
    focus: "Spatial",
    mastery: 85,
    image: "/memory.png",
    theme: {
      gradient: "from-[#7A0C0C] to-red-800",
      btn: "bg-[#7A0C0C] hover:bg-[#5E0909] text-white",
      progress: "bg-[#7A0C0C]",
      check: "text-[#7A0C0C]",
      border: "border-[#7A0C0C]/20"
    },
    iconType: "board",
    points: ["Piece Movement & Values", "Board Coordinates", "Checkmate Basics", "Mini Chess Scenarios"],
    months: [
      { name: "Month 1", topics: ["Understanding the Chessboard", "Piece Movement Fundamentals", "Capturing & Defending Pieces", "Chess Coordinates & Notation", "Piece Values", "Mini Chess Games", "Board Vision Activities", "Basic Chess Rules"] },
      { name: "Month 2", topics: ["Check, Checkmate & Stalemate", "Basic Checkmate Patterns", "King Safety Fundamentals", "Introduction to Tactical Thinking", "Attack vs Defense", "Finding Threats", "Simple Chess Puzzles", "Weekly Practice Tournament"] },
      { name: "Month 3", topics: ["Castling", "En Passant", "Pawn Promotion", "Passed Pawns", "Saving Material", "Draw Rules", "Beginner Endgames", "Puzzle Challenge Week"] }
    ]
  },
  {
    title: "INTERMEDIATE PROGRAM",
    level: "PROGRAM 02",
    rating: "600-1400 Rating",
    subtitle: "Master typical opening plans, tactical combinations, and fundamental king & pawn endgames.",
    focus: "Logic",
    mastery: 75,
    image: "/problem.png",
    theme: {
      gradient: "from-[#A81A1A] to-amber-600",
      btn: "bg-[#A81A1A] hover:bg-[#8C1414] text-white",
      progress: "bg-[#A81A1A]",
      check: "text-[#A81A1A]",
      border: "border-[#A81A1A]/20"
    },
    iconType: "pieces",
    points: ["Tactical Motifs (Forks/Pins)", "Opening Repertoire Plans", "King & Pawn Endgames", "Tournament Strategy"],
    months: [
      { name: "Month 1", topics: ["Three Stages of Chess", "Opening Principles", "Center Control", "Piece Development", "Common Beginner Mistakes", "Fast Checkmate Traps", "Game Analysis Basics", "Weekly Tournament Preparation"] },
      { name: "Month 2", topics: ["Forks & Pins", "Skewers & Double Attacks", "Discovered Attacks", "Removing the Defender", "Attraction & Deflection", "Tactical Puzzle Solving"] },
      { name: "Month 3", topics: ["King & Pawn Endgames", "Opposition & Square Rule", "Basic Rook Endgames", "Checkmating with Major Pieces", "Active King Concept", "Practical Endgame Exercises"] },
      { name: "Month 4-6", topics: ["Tactical Mastery Series", "Defensive Techniques", "Mating Nets", "Pattern Recognition", "Practical Thinking Process", "Tournament Play & Review"] }
    ]
  },
  {
    title: "ADVANCED PROGRAM",
    level: "PROGRAM 03",
    rating: "1400+ Rating",
    subtitle: "Develop deep variation calculations, position evaluations, and tournament mental toughness.",
    focus: "Tactics",
    mastery: 70,
    image: "/creative.png",
    theme: {
      gradient: "from-[#D97706] to-[#FFB800]",
      btn: "bg-[#D97706] hover:bg-[#B45309] text-white",
      progress: "bg-[#D97706]",
      check: "text-[#D97706]",
      border: "border-[#D97706]/20"
    },
    iconType: "trophy",
    points: ["Multi-Variation Calculation", "Pawn Structure Imbalances", "Positional Sacrifices", "Calculation Under Pressure"],
    months: [
      { name: "Month 1-2", topics: ["Checkmate Pattern Library", "Common Tactical Patterns", "Visualization Training", "Calculation Basics", "Candidate Move Selection", "Blindfold Exercises"] },
      { name: "Month 3-4", topics: ["Positional Foundations", "Strong vs Weak Squares", "Open Files & Outposts", "Good & Bad Bishops", "Piece Activity", "Imbalance Assessment"] },
      { name: "Month 5-6", topics: ["Endgame Technique", "Transition to Endgame", "Practical Defense", "Converting Advantages", "Tournament Game Analysis", "Decision Making Exercises"] }
    ]
  }
];

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [activeMonth, setActiveMonth] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [activeMonth, selectedCourse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCourse(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedCourse ? 'hidden' : 'unset';
  }, [selectedCourse]);

  return (
    <section className="bg-slate-50/50 py-16 md:py-24 px-4 font-sans">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-500 px-5 py-2 rounded-full shadow-sm">
            <Star size={14} className="text-[#7A0C0C] fill-[#7A0C0C]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#7A0C0C]">The KPR Chess Roadmap</span>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-none">Curriculum Built for</h2>
            <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-10 py-2.5 md:py-4 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-red-950/15">
                <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">Success</span>
            </div>
          </div>
          <p className="max-w-2xl text-slate-500 font-medium text-sm md:text-lg">
            From your first move to tournament victory, our structured levels ensure you have the right training at every step.
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col bg-white rounded-[2rem] border border-slate-100 transition-all relative group h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 duration-300"
            >
              {/* TOP HEADER BOX WITH GRADIENT & DOT GRID */}
              <div className={`relative h-[200px] bg-gradient-to-br ${course.theme.gradient} p-6 flex flex-col justify-between overflow-hidden shrink-0`}>
                {/* Technical Dot Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.12] pointer-events-none" 
                     style={{ 
                       backgroundImage: `radial-gradient(white 1px, transparent 1px)`, 
                       backgroundSize: '16px 16px' 
                     }} 
                />
                
                {/* PROGRAM PILL */}
                <div className="z-10 bg-black/20 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest w-fit">
                  {course.level}
                </div>

                {/* GRAPHIC / IMAGE IN HEADER */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-28 h-28 flex items-center justify-center">
                  <Image 
                    src={course.image} 
                    alt={course.title} 
                    width={112}
                    height={112}
                    className="object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                <div className="z-10 text-white/70 text-[10px] font-black uppercase tracking-widest">{course.rating}</div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-[900] text-slate-900 tracking-tight mb-3">
                  {course.title}
                </h3>
                
                <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                  {course.subtitle}
                </p>

                {/* OUTCOMES SUBTITLE */}
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  Learning Outcomes
                </div>
                
                <ul className="space-y-3.5 mb-8 flex-grow">
                  {course.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 border-current ${course.theme.check} flex items-center justify-center shrink-0`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="text-slate-800 text-xs font-bold leading-tight">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* COGNITIVE FOCUS & MASTERY CURVE CONTAINER */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center mb-6">
                  <div>
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Cognitive Focus</div>
                    <div className="text-xs font-black text-slate-800 mt-0.5">{course.focus}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Mastery Curve</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${course.theme.progress} rounded-full`} style={{ width: `${course.mastery}%` }} />
                      </div>
                      <span className="text-[10px] font-black text-slate-800">{course.mastery}%</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { setSelectedCourse(course); setActiveMonth(0); }}
                  className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${course.theme.btn}`}
                >
                  View Full Page <ChevronRight size={14} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- SYLLABUS MODAL --- */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-slate-950/90 backdrop-blur-xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white w-full h-full md:h-[90vh] max-w-6xl overflow-hidden flex flex-col md:rounded-[4rem] shadow-2xl relative border-4 border-white"
              >
                {/* MODAL HEADER */}
                <div className="relative h-[120px] md:h-[150px] bg-slate-900 overflow-hidden shrink-0 flex items-center px-8 md:px-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-[#FFB800]/20" />
                    
                    <div className="relative z-10 text-white w-full">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy size={14} className="text-[#FFB800]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB800]">{selectedCourse.level} Mastery</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black tracking-tighter leading-none">{selectedCourse.title} Curriculum</h2>
                        <p className="text-xs md:text-sm font-medium text-slate-400 mt-2 max-w-xl line-clamp-1">{selectedCourse.subtitle}</p>
                    </div>

                    <button onClick={() => setSelectedCourse(null)} className="absolute top-6 right-6 md:top-10 md:right-12 text-white/50 hover:text-[#FFB800] transition-colors p-2 bg-white/5 rounded-full backdrop-blur-md">
                        <X size={24} strokeWidth={3} />
                    </button>
                </div>

                {/* MODAL BODY */}
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden bg-slate-50">
                    {/* MONTH TABS */}
                    <div className="w-full md:w-72 bg-white border-r border-slate-100 p-6 md:p-8 shrink-0 overflow-x-auto no-scrollbar md:overflow-y-auto">
                        <div className="flex md:flex-col gap-3">
                            {selectedCourse.months.map((month, mIdx) => (
                                <button key={mIdx} onClick={() => setActiveMonth(mIdx)}
                                    className={`whitespace-nowrap px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-center md:text-left ${
                                        activeMonth === mIdx ? "bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 shadow-lg shadow-red-950/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                    }`}
                                >
                                    {month.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TOPICS LIST */}
                    <div ref={scrollContainerRef} className="flex-grow overflow-y-auto p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12">
                            {selectedCourse.months[activeMonth].topics.map((topic, tIdx) => (
                                <motion.div key={tIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: tIdx * 0.03 }}
                                    className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 group hover:border-[#7A0C0C] transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center p-2.5 shrink-0 group-hover:bg-red-50 transition-colors">
                                        <Zap size={20} className="text-slate-300 group-hover:text-[#7A0C0C] transition-colors" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-sm md:text-base leading-snug">{topic}</h5>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block py-3 bg-white border-t border-slate-100 text-center shrink-0">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">KPR Chess Academy Curriculum © 2026</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}