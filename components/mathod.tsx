"use client";

import { motion } from "framer-motion";
import { 
  Layers, 
  Target, 
  Trophy, 
  LineChart, 
  Zap, 
  Lightbulb,
  GitCommitHorizontal,
  ChevronRight
} from "lucide-react";

export function TrainingMethodology() {
  const steps = [
    {
      title: "Personal Assessment",
      desc: "Custom skill evaluation to map out your starting level, logic profiles, and personal learning goals.",
      icon: <Layers className="w-6 h-6 text-[#7A0C0C]" />,
      badgeBg: "bg-red-50 text-[#7A0C0C]",
      borderHover: "hover:border-[#7A0C0C]/30"
    },
    {
      title: "Tactical Foundations",
      desc: "Developing core board visualization, opening repertoires, and basic combinational patterns.",
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      badgeBg: "bg-amber-50 text-amber-700",
      borderHover: "hover:border-amber-500/30"
    },
    {
      title: "Strategic Calculation",
      desc: "Calculating deep multi-move variations, positional pawn planning, and middle game evaluation.",
      icon: <Target className="w-6 h-6 text-blue-600" />,
      badgeBg: "bg-blue-50 text-blue-700",
      borderHover: "hover:border-blue-500/30"
    },
    {
      title: "Active Tournament Play",
      desc: "Class tournaments, FIDE clocks, professional chess notation practice, and competitive strategy.",
      icon: <Trophy className="w-6 h-6 text-emerald-650 text-emerald-600" />,
      badgeBg: "bg-emerald-50 text-emerald-700",
      borderHover: "hover:border-emerald-500/30"
    },
    {
      title: "Detailed Game Audits",
      desc: "Analysing past games using advanced engine evaluations and FIDE rated mentor insights.",
      icon: <LineChart className="w-6 h-6 text-indigo-655 text-indigo-600" />,
      badgeBg: "bg-indigo-50 text-indigo-700",
      borderHover: "hover:border-indigo-500/30"
    },
    {
      title: "Continuous Mentorship",
      desc: "Iterative goal tracking, advanced tactics workshops, and ongoing FIDE rating pathways.",
      icon: <Lightbulb className="w-6 h-6 text-purple-650 text-purple-600" />,
      badgeBg: "bg-purple-50 text-purple-700",
      borderHover: "hover:border-purple-500/30"
    }
  ];

  return (
    <section className="relative py-28 bg-[#fdfdfd] overflow-hidden font-sans text-slate-800">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-50/50 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-50/40 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CENTERED HEADING UI */}
        <div className="flex flex-col items-center text-center space-y-6 mb-28">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
          >
            <GitCommitHorizontal size={14} className="text-[#7A0C0C]" />
            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.25em]">Our Blueprint</span>
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Structured <span className="text-[#7A0C0C]">Roadmap</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-slate-500 font-medium text-base md:text-lg leading-relaxed mt-2"
            >
              A modern, data-driven 6-stage training methodology designed to systematically transform aspiring minds into tournament-ready competitors.
            </motion.p>
          </div>
        </div>

        {/* TIMELINE GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group h-full"
            >
              {/* CARD CONTAINER */}
              <div className={`bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 ${step.borderHover} shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(122,12,12,0.06)] transition-all duration-500 flex flex-col items-start text-left h-full justify-between relative overflow-hidden hover:-translate-y-1.5`}>
                
                {/* Step Number in Background */}
                <div className="absolute top-4 right-6 text-8xl font-black text-slate-50 select-none group-hover:text-slate-100/70 transition-colors duration-500">
                  0{i + 1}
                </div>

                <div>
                  {/* ICON & STEP HEADER */}
                  <div className="flex items-center justify-between w-full mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                       {step.icon}
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${step.badgeBg} font-semibold text-xs`}>
                      <span className="text-[9px] font-black tracking-widest opacity-80">STAGE</span>
                      <span className="font-black italic">0{i + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-[#7A0C0C] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>

                {/* BOTTOM ACCENT PILL */}
                <div className="mt-8 flex items-center gap-2">
                  <div className="w-10 h-1 bg-slate-100 rounded-full group-hover:w-16 group-hover:bg-[#7A0C0C] transition-all duration-500" />
                  <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#7A0C0C]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}