"use client";

import { motion } from "framer-motion";
import { Trophy, Globe, Users, Target, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function AboutUs() {
  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Expert Coaches",
      desc: "Learn from International and Commonwealth players with elite competitive experience."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Worldwide Reach",
      desc: "Based in Kottayam, we provide premium coaching to students across the globe."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Quality Training",
      desc: "Personalized roadmaps designed for players at every stage of their journey."
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Proven Results",
      desc: "Structured curriculum that has produced state and national level champions."
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Refined Image Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[45%] flex-shrink-0"
          >
            {/* Main Image - Curved styling adjusted for responsiveness */}
            <div className="relative z-10 w-full aspect-[4/5] rounded-tl-[60px] rounded-br-[60px] md:rounded-tl-[120px] md:rounded-br-[120px] overflow-hidden border-[8px] md:border-[12px] border-slate-50 shadow-2xl">
              <Image 
                src="/ach4.jpeg" 
                alt="ChessEasy Coaching"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Achievement Badge - Scales for mobile */}
            <motion.div 
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 12 }}
              className="absolute -bottom-4 -left-4 z-20 w-20 h-20 md:w-24 md:h-24 bg-[#FFB800] rounded-2xl md:rounded-3xl flex flex-col items-center justify-center shadow-2xl text-white"
            >
               <Trophy className="w-7 h-7 md:w-10 md:h-10 text-slate-900" />
               <span className="text-[9px] md:text-[10px] font-black mt-1 uppercase text-slate-900">Top Rated</span>
            </motion.div>
            
            {/* Soft decorative background glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-100/50 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* RIGHT SIDE: Balanced Content */}
          <div className="w-full lg:w-[55%] flex flex-col space-y-8 md:space-y-10">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 md:w-12 h-[2px] bg-[#FFB800]" />
                <span className="text-[10px] md:text-xs font-black text-[#FFB800] uppercase tracking-[0.3em]">About ChessEasy</span>
              </div>

              {/* HEADING: 3xl on Mobile, 5xl on Desktop */}
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.15] md:leading-[1.1] tracking-tighter">
                When You <span className="inline-block bg-[#FFB800] text-black px-3 md:px-4 py-1 rounded-xl md:rounded-2xl transform -rotate-1 shadow-sm">Need</span> The Best <br className="hidden sm:block" />
                Online <span className="inline-block bg-[#FFB800] text-black px-3 md:px-4 py-1 rounded-xl md:rounded-2xl transform rotate-1 shadow-sm">Chess Academy</span>
              </h2>

              <div className="space-y-4 max-w-2xl">
                <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
                  <strong className="text-slate-900">Chesseasy</strong>, located at Kottayam, Kerala, provides premier online chess coaching classes <span className="text-purple-600 font-bold underline decoration-purple-200 underline-offset-4">Worldwide</span>.
                </p>
                <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                  Our team consists of professional coaches and elite players, including International and Commonwealth competitors, dedicated to nurturing the next generation of grandmasters with quality, levels-based training.
                </p>
              </div>
            </div>

            {/* Balanced Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 md:gap-y-8">
              {features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-white transition-colors duration-300 shadow-sm">
                      {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.title}</h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black transition-all active:scale-95 shadow-xl">
                    EXPLORE COURSES
                    <CheckCircle2 className="w-5 h-5 text-[#FFB800]" />
                </button>
                <div className="flex flex-col pl-1 sm:pl-0">
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Questions?</span>
                    <span className="text-sm md:text-base text-slate-900 font-black">support@chesseasy.com</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}