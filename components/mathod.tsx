"use client";

import { motion } from "framer-motion";
import { 
  Layers, 
  Target, 
  Trophy, 
  LineChart, 
  Zap, 
  Lightbulb,
  ChevronRight,
  GitCommitHorizontal
} from "lucide-react";

export function TrainingMethodology() {
  const yellow = "#FFB800";

  const steps = [
    {
      title: "Foundation Building",
      desc: "Mastering the board, piece values, and basic movement logic to build a solid start.",
      icon: <Layers size={24} />,
      color: "bg-[#2196F3]"
    },
    {
      title: "Tactical Development",
      desc: "Learning patterns like forks, pins, and skewers to spot winning opportunities instantly.",
      icon: <Zap size={24} />,
      color: "bg-[#E91E63]"
    },
    {
      title: "Strategic Understanding",
      desc: "Deep diving into positional play, pawn structures, and complex middlegame planning.",
      icon: <Target size={24} />,
      color: "bg-[#4CAF50]"
    },
    {
      title: "Tournament Preparation",
      desc: "FIDE rules, clock management, and notation practice to get ready for real competition.",
      icon: <Trophy size={24} />,
      color: "bg-[#9C27B0]"
    },
    {
      title: "Performance Analysis",
      desc: "Reviewing games with engines and mentors to identify strengths and weaknesses.",
      icon: <LineChart size={24} />,
      color: "bg-[#FF9800]"
    },
    {
      title: "Continuous Improvement",
      desc: "Constant feedback loops and personalized roadmaps to reach Grandmaster levels.",
      icon: <Lightbulb size={24} />,
      color: "bg-[#607D8B]"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* CENTERED HEADING UI */}
        <div className="flex flex-col items-center text-center space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
            <GitCommitHorizontal size={14} className="text-[#FFB800]" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Our Blueprint</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Training
            </h2>
            <div className="inline-block bg-[#FFB800] text-black px-8 md:px-12 py-3 md:py-5 rounded-[2.5rem] shadow-xl shadow-amber-200/20">
              <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                Methodology.
              </span>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg">
            A structured 6-step journey designed to take any student from their 
            very first move to professional tournament excellence.
          </p>
        </div>

        {/* TIMELINE GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
          
          {/* BACKGROUND DASHED LINE (Desktop only) */}
          <div className="hidden lg:block absolute top-[15%] left-0 w-full h-px border-t-2 border-dashed border-slate-200 -z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 group"
            >
              {/* STEP INDICATOR PILL */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0">
                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white shadow-xl">
                    <span className="text-[10px] font-black text-[#FFB800]">STEP</span>
                    <span className="text-sm font-black italic">0{i + 1}</span>
                 </div>
              </div>

              {/* CARD CONTAINER */}
              <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl group-hover:shadow-amber-500/10 transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left h-full">
                
                {/* ICON BOX */}
                <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
                   {step.icon}
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-slate-500 font-medium leading-relaxed text-sm">
                  {step.desc}
                </p>

                {/* BOTTOM ACCENT PILL */}
                <div className="mt-8 w-12 h-1.5 bg-slate-100 rounded-full group-hover:w-20 group-hover:bg-[#FFB800] transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}