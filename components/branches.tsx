"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Sparkles } from "lucide-react";

export function BranchesSection() {
  const branches = [
    { name: "Kovilambakkam", desc: "Premium chess training facility with certified coaches." },
    { name: "Medavakkam", desc: "Nurturing young minds to strategic thinking excellence." },
    { name: "Perumbakkam", desc: "State-of-the-art classroom setup and regular tournaments." },
    { name: "Sholinganallur", desc: "Personalized coaching programs for all age groups." },
    { name: "Siruseri", desc: "Developing analytical thinking & master-level strategies." },
    { name: "Thoraipakkam", desc: "Grandmaster curriculum and interactive learning models." }
  ];

  return (
    <section id="branches" className="py-20 px-6 bg-slate-50 overflow-hidden font-sans border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 mb-4">
            <Sparkles size={14} className="text-[#7A0C0C]" />
            <span className="text-xs font-bold text-[#7A0C0C] uppercase tracking-wider">Our Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase mb-4">
            Our <span className="text-[#7A0C0C]">Branches</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Find a KPR Chess Academy center near you. Visit us or get in touch with our local coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, idx) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Decorative Corner Chess Pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none transition-all duration-300 group-hover:scale-110" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 flex items-center justify-center text-[#7A0C0C] mb-6 group-hover:bg-[#7A0C0C] group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#7A0C0C] transition-colors">
                  {branch.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                  {branch.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[#7A0C0C] font-bold text-xs uppercase tracking-wider">
                <span>Chess Academy Center</span>
                <Navigation size={14} className="text-slate-400 group-hover:text-[#7A0C0C] transition-colors group-hover:translate-x-1 duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
