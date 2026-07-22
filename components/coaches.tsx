"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CoachesSection() {
  const yellow = "#FFB800";

const coaches = [
    {
      name: "Alexander Kumar",
      role: "FIDE Master & Head Coach",
      image: "/anil.jpeg",
      accolades: [
        "FIDE Master (FM) Title Holder",
        "Over 10 years of professional coaching",
        "Coached 5+ state level champions",
        "Active chess tournament competitor"
      ],
      color: "bg-[#7A0C0C]"
    },
    {
      name: "Sarah Watson",
      role: "International Trainer",
      image: "/anil.jpeg",
      accolades: [
        "Certified FIDE Senior Trainer",
        "Arbitrated in 20+ national meets",
        "Specialist in opening & middle game theory",
        "Trained junior squads for 8+ years"
      ],
      color: "bg-[#7A0C0C]"
    },
    {
      name: "Vikram R",
      role: "Senior Candidate Master",
      image: "/anil.jpeg",
      accolades: [
        "Candidate Master (CM) Title Holder",
        "State level champion runner-up",
        "Endgame repertoire specialist",
        "Trained 200+ students from scratch"
      ],
      color: "bg-[#7A0C0C]"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* CENTERED HEADING UI - Responsive Sizes */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Trophy size={14} className="text-[#7A0C0C]" />
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Expert Faculty</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {/* Heading: 3xl on Mobile, 5xl on Desktop */}
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Meet our
            </h2>
            <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-12 py-2.5 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-red-950/15">
              <span className="text-3xl lg:text-5xl font-black tracking-tighter leading-none">
                Champions.
              </span>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-lg leading-relaxed">
            Learn from the best. Our coaches are FIDE rated players and 
            experienced mentors with over a decade of competitive training experience.
          </p>
        </div>

        {/* COACHES GRID - Responsive: 1 col mobile, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
          {coaches.map((coach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group bg-slate-50 rounded-[3rem] md:rounded-[4rem] p-4 pb-10 md:pb-12 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-red-950/5 transition-all duration-500 flex flex-col"
            >
              {/* Coach Image - Vertical Pill */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden mb-6 md:mb-8 border-4 border-white shadow-lg shrink-0">
                <Image 
                  src={coach.image} 
                  alt={coach.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Floating Role Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                   <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[9px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md uppercase tracking-widest border border-white/20">
                     {coach.role}
                   </span>
                </div>
              </div>

              {/* Coach Info */}
              <div className="px-4 md:px-6 space-y-6 flex-grow">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 italic">
                    {coach.name}
                  </h3>
                  <div className="w-10 h-1 bg-[#7A0C0C] mx-auto rounded-full group-hover:w-20 transition-all duration-500" />
                </div>

                {/* Accolades List */}
                <div className="space-y-3 pt-2">
                  {coach.accolades.map((text, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className={`mt-1 w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${coach.color} text-[#FFB800] shadow-sm group-hover/item:scale-110 transition-transform`}>
                         <Award size={12} />
                      </div>
                      <span className="text-[11px] md:text-xs font-bold text-slate-600 leading-tight group-hover/item:text-slate-900 transition-colors">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA PILL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 flex justify-center"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs md:text-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4 group">
                BOOK A TRIAL WITH OUR COACHES
                <div className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-full flex items-center justify-center text-black group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={18} className="text-[#FFB800]" />
                </div>
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}