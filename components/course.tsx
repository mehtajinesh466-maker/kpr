"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trophy, BookOpen, X, Star, Zap, ChevronRight } from 'lucide-react';

const courses = [
  {
    title: "Chess Foundations",
    level: "Level 1",
    rating: "0-300 Rating",
    subtitle: "Building the core logic and board vision - (24 Classes)",
    image: "/1.jpg",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#2563EB]", btn: "bg-[#2563EB]", btnShadow: "shadow-[0_6px_0_#1E40AF]", accent: "bg-[#2563EB]/10", border: "border-[#2563EB]", halo: "from-[#2563EB]/20"
    },
    points: ["Piece Movement Fundamentals", "Coordinates & Notations", "Checkmate Patterns", "Mini Chess Games"],
    months: [
      { name: "Month 1", topics: ["Understanding the Chessboard", "Piece Movement Fundamentals", "Capturing & Defending Pieces", "Chess Coordinates & Notation", "Piece Values", "Mini Chess Games", "Board Vision Activities", "Basic Chess Rules"] },
      { name: "Month 2", topics: ["Check, Checkmate & Stalemate", "Basic Checkmate Patterns", "King Safety Fundamentals", "Introduction to Tactical Thinking", "Attack vs Defense", "Finding Threats", "Simple Chess Puzzles", "Weekly Practice Tournament"] },
      { name: "Month 3", topics: ["Castling", "En Passant", "Pawn Promotion", "Passed Pawns", "Saving Material", "Draw Rules", "Beginner Endgames", "Puzzle Challenge Week"] }
    ]
  },
  {
    title: "Developing Player",
    level: "Level 2",
    rating: "300-600 Rating",
    subtitle: "Mastering Opening Principles & Basic Tactics - (48 Classes)",
    image: "/2.jpg",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#D97706]", btn: "bg-[#F59E0B]", btnShadow: "shadow-[0_6px_0_#B45309]", accent: "bg-[#F59E0B]/10", border: "border-[#F59E0B]", halo: "from-[#F59E0B]/20"
    },
    points: ["Opening Strategy", "Forks, Pins & Skewers", "King & Pawn Endgames", "Game Analysis Basics"],
    months: [
      { name: "Month 1", topics: ["Three Stages of Chess", "Opening Principles", "Center Control", "Piece Development", "Common Beginner Mistakes", "Fast Checkmate Traps", "Game Analysis Basics", "Weekly Tournament Preparation"] },
      { name: "Month 2", topics: ["Forks & Pins", "Skewers & Double Attacks", "Discovered Attacks", "Removing the Defender", "Attraction & Deflection", "Tactical Puzzle Solving"] },
      { name: "Month 3", topics: ["King & Pawn Endgames", "Opposition & Square Rule", "Basic Rook Endgames", "Checkmating with Major Pieces", "Active King Concept", "Practical Endgame Exercises"] },
      { name: "Month 4-6", topics: ["Tactical Mastery Series", "Defensive Techniques", "Mating Nets", "Pattern Recognition", "Practical Thinking Process", "Tournament Play & Review"] }
    ]
  },
  {
    title: "Improving Competitor",
    level: "Level 3",
    rating: "600-1000 Rating",
    subtitle: "Pattern Recognition & Positional Foundations - (48 Classes)",
    image: "/3.jpg",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#16A34A]", btn: "bg-[#10B981]", btnShadow: "shadow-[0_6px_0_#047857]", accent: "bg-[#10B981]/10", border: "border-[#10B981]", halo: "from-[#10B981]/20"
    },
    points: ["Visualization Training", "Positional Foundations", "Converting Advantages", "Candidate Move Selection"],
    months: [
      { name: "Month 1-2", topics: ["Checkmate Pattern Library", "Common Tactical Patterns", "Visualization Training", "Calculation Basics", "Candidate Move Selection", "Blindfold Exercises"] },
      { name: "Month 3-4", topics: ["Positional Foundations", "Strong vs Weak Squares", "Open Files & Outposts", "Good & Bad Bishops", "Piece Activity", "Imbalance Assessment"] },
      { name: "Month 5-6", topics: ["Endgame Technique", "Transition to Endgame", "Practical Defense", "Converting Advantages", "Tournament Game Analysis", "Decision Making Exercises"] }
    ]
  },
  {
    title: "Intermediate Player",
    level: "Level 4",
    rating: "1000-1400 Rating",
    subtitle: "Strategy, Planning & Endgame Systems - (48 Classes)",
    image: "/4.jpg",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#7C3AED]", btn: "bg-[#8B5CF6]", btnShadow: "shadow-[0_6px_0_#6D28D9]", accent: "bg-[#8B5CF6]/10", border: "border-[#7C3AED]", halo: "from-[#7C3AED]/20"
    },
    points: ["Lucena & Philidor Positions", "Pawn Structure Mastery", "Sacrificial Ideas", "Strategic Decision Making"],
    months: [
      { name: "Month 1", topics: ["Universal Opening Concepts", "Understanding Pawn Structures", "Typical Middlegame Plans", "Strategic Thinking"] },
      { name: "Month 2", topics: ["Essential Endgame Systems", "Lucena Position", "Philidor Position", "Active Rook Concepts"] },
      { name: "Month 3", topics: ["Building Attacks", "Creating Tactical Opportunities", "Sacrificial Ideas", "Initiative & Tempo"] },
      { name: "Month 4-6", topics: ["Positional Play Workshop", "Weakness Creation", "Long-Term Planning", "Practical Tournament Positions", "Calculation Training"] }
    ]
  },
  {
    title: "Advanced Intermediate",
    level: "Level 5",
    rating: "1400-1800 Rating",
    subtitle: "Refining Dynamic Play & Repertoire - (48 Classes)",
    image: "/5.jpg",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#EC4899]", btn: "bg-[#F472B6]", btnShadow: "shadow-[0_6px_0_#BE185D]", accent: "bg-[#F472B6]/10", border: "border-[#F472B6]", halo: "from-[#F472B6]/20"
    },
    points: ["Opening Repertoire Dev", "Dynamic vs Static Evaluation", "Grandmaster Game Studies", "Tournament Simulation"],
    months: [
      { name: "Month 1-2", topics: ["Opening Repertoire Development", "Understanding Opening Structures", "Opening Traps & Gambits", "Dynamic vs Static Positions", "Pawn Breaks", "Initiative Management"] },
      { name: "Month 3-4", topics: ["Advanced Tactical Training", "Combination Building", "Defensive Resources", "Strategic Planning", "Evaluating Positions", "Exchange Decisions"] },
      { name: "Month 5-6", topics: ["Grandmaster Game Studies", "Modern Chess Concepts", "Tournament Simulation", "Calculation Tests", "Performance Review", "Improvement Planning"] }
    ]
  },
  {
    title: "Tournament Player",
    level: "Level 6",
    rating: "1800-2200 Rating",
    subtitle: "High-level Technique & Master Theory - (48 Classes)",
    image: "6.png",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#6366F1]", btn: "bg-[#6366F1]", btnShadow: "shadow-[0_6px_0_#4338CA]", accent: "bg-[#6366F1]/10", border: "border-[#6366F1]", halo: "from-[#6366F1]/20"
    },
    points: ["Advanced Endgame Theory", "Visualization Mastery", "Positional Sacrifices", "Practical Decision Making"],
    months: [
      { name: "Month 1-2", topics: ["Advanced Endgame Theory", "Minor Piece Endgames", "Technical Conversions", "Rook Endgame Mastery"] },
      { name: "Month 3-4", topics: ["Advanced Tactical Themes", "Complex Calculations", "Visualization Mastery", "Pattern Expansion"] },
      { name: "Month 5-6", topics: ["Strategic Mastery", "Positional Sacrifices", "Deep Planning", "Practical Decision Making"] }
    ]
  },
  {
    title: "Expert Program",
    level: "Level 7",
    rating: "2200+ Rating",
    subtitle: "Deep Calculation & Professional Prep - (48 Classes)",
    image: "/7.png",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#0891B2]", btn: "bg-[#22D3EE]", btnShadow: "shadow-[0_6px_0_#0E7490]", accent: "bg-[#22D3EE]/10", border: "border-[#0891B2]", halo: "from-[#22D3EE]/20"
    },
    points: ["Multi-Variation Analysis", "Professional Opening Prep", "Novelty Creation", "Tournament Psychology"],
    months: [
      { name: "Month 1-2", topics: ["Deep Calculation Methods", "Candidate Move Systems", "Multi-Variation Analysis", "Strategic Evaluation", "Complex Imbalances", "Dynamic Compensation"] },
      { name: "Month 3-4", topics: ["Advanced Pawn Structures", "Strategic Transformations", "Space & Restriction", "Advanced Combination Play", "Attack Construction", "Defensive Calculation"] },
      { name: "Month 5-6", topics: ["Professional Opening Preparation", "Repertoire Building", "Novelty Creation", "Engine-Assisted Analysis", "Tournament Psychology", "Self-Analysis Systems"] }
    ]
  },
  {
    title: "Elite Master",
    level: "Level 8",
    rating: "Master Program",
    subtitle: "The ultimate track to Professional Mastery - (72 Classes)",
    image: "/8.png",
    theme: {
      bg: "bg-[#FFFFFF]", text: "text-[#B45309]", btn: "bg-[#FBBF24]", btnShadow: "shadow-[0_6px_0_#B45309]", accent: "bg-[#FBBF24]/10", border: "border-[#B45309]", halo: "from-[#FBBF24]/20"
    },
    points: ["Master-Level Calculation", "Modern Opening Research", "Psychological Prep", "FIDE Improvement Program"],
    months: [
      { name: "Month 1-3", topics: ["Master-Level Calculation", "Strategic Excellence", "Modern Opening Research", "Deep Middlegame Understanding"] },
      { name: "Month 4-6", topics: ["Advanced Endgame Mastery", "Psychological Preparation", "Opponent-Based Preparation", "High-Level Tournament Training"] },
      { name: "Month 7-9", topics: ["Professional Chess Development", "Building Personal Style", "Advanced Game Annotation", "Performance Analytics", "FIDE Rating Improvement Program"] }
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
    document.body.style.overflow = selectedCourse ? 'hidden' : 'unset';
  }, [selectedCourse]);

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 text-slate-500 px-5 py-2 rounded-full shadow-sm">
            <Star size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-[10px] font-black uppercase tracking-widest">The ChessEasy Roadmap</span>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-none">Curriculum Built for</h2>
            <div className="inline-block bg-[#FFB800] text-black px-6 md:px-10 py-2.5 md:py-4 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-amber-200/20">
                <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">Success</span>
            </div>
          </div>
          <p className="max-w-2xl text-slate-500 font-medium text-sm md:text-lg">
            From your first move to tournament victory, our structured levels ensure you have the right training at every step.
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`flex flex-col bg-white rounded-[3rem] border-2 ${course.theme.border} transition-all relative group h-full overflow-hidden hover:shadow-2xl hover:-translate-y-2 duration-500`}
            >
              <div className={`${course.theme.btn} p-6 flex items-center justify-between`}>
                <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {course.level}
                </div>
                <div className="text-white text-[10px] font-black italic">{course.rating}</div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="h-32 flex items-center justify-center mb-6 relative">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-700">
                    <Image src={course.image} alt={course.title} fill className="object-contain" />
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 h-14 flex items-center leading-tight">
                  {course.title}
                </h3>
                
                <ul className="space-y-3 mb-10 flex-grow">
                  {course.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <div className={`mt-1 w-4 h-4 rounded-full ${course.theme.btn} flex items-center justify-center shrink-0`}>
                        <Check size={10} className="text-white" strokeWidth={4} />
                      </div>
                      <span className="text-slate-600 text-[13px] font-bold leading-tight">{point}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => { setSelectedCourse(course); setActiveMonth(0); }}
                  className={`w-full py-4 bg-[#FFB800] hover:bg-[#FFA500] text-black rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-amber-200/40 active:scale-95 transition-all flex items-center justify-center gap-2`}
                >
                  <BookOpen size={16} /> Explore Syllabus
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
                        <h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-none">{selectedCourse.title} Curriculum</h2>
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
                                        activeMonth === mIdx ? "bg-[#FFB800] text-black shadow-lg shadow-amber-200/50" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
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
                                    className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 group hover:border-[#FFB800] transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center p-2.5 shrink-0 group-hover:bg-amber-50 transition-colors">
                                        <Zap size={20} className="text-slate-300 group-hover:text-[#FFB800] transition-colors" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-sm md:text-base leading-snug">{topic}</h5>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block py-3 bg-white border-t border-slate-100 text-center shrink-0">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">ChessEasy Academy Curriculum © 2025</p>
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