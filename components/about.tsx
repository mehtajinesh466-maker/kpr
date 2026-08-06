"use client";

import { motion } from "framer-motion";
import { Trophy, Globe, Users, Target, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function AboutUs() {
  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Specialized Coaching",
      desc: "Structured syllabus customized for Beginners, Intermediates, and Advanced tournament players."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "FIDE Rated Mentors",
      desc: "Personalized guidance from FIDE-rated professional coaches and active chess tournament veterans."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Modern Infrastructure",
      desc: "State-of-the-art learning facilities in Mylapore and Pallikaranai, Chennai, with digital toolsets."
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Tournament Play",
      desc: "Weekly practice games and internal tournaments to hone competitive skills and boost rating points."
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
            {/* Main Image Frame with 1.jpg */}
            <div className="relative z-10 w-full aspect-[4/5] rounded-tl-[60px] rounded-br-[60px] md:rounded-tl-[120px] md:rounded-br-[120px] overflow-hidden border-[8px] md:border-[12px] border-slate-50 shadow-2xl bg-gradient-to-tr from-[#7A0C0C] to-red-950 flex flex-col justify-end">
              <Image
                src="/11.jpeg"
                alt="Pathway to Chess Mastery"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="relative z-20 text-white/95 p-6">
                <h3 className="text-2xl font-black tracking-tight text-[#FFB800]">KPR CHESS</h3>
                <p className="text-xs font-semibold text-white/70">Mylapore & Pallikaranai, Chennai</p>
              </div>
            </div>

         
            
            {/* Soft decorative background glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 md:w-72 md:h-72 bg-red-100/50 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* RIGHT SIDE: Balanced Content */}
          <div className="w-full lg:w-[55%] flex flex-col space-y-8 md:space-y-10">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 md:w-12 h-[2px] bg-[#7A0C0C]" />
                <span className="text-[10px] md:text-xs font-black text-[#7A0C0C] uppercase tracking-[0.3em]">About KPR Chess</span>
              </div>

              <h2 className="text-2xl lg:text-5xl font-black text-slate-900 leading-[1.15] md:leading-[1.1] tracking-tighter">
                Your Pathway to Chess <span className="inline-block bg-[#7A0C0C] text-[#FFB800] px-3 md:px-4 py-1 rounded-xl md:rounded-2xl transform -rotate-1 shadow-sm">Mastery</span> and Strategic <span className="inline-block bg-[#7A0C0C] text-[#FFB800] px-3 md:px-4 py-1 rounded-xl md:rounded-2xl transform rotate-1 shadow-sm">Success</span>
              </h2>

              <div className="space-y-4 max-w-2xl">
                <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg">
                  At <strong className="text-slate-900">KPR Chess Academy</strong>, we provide professional, structured chess training designed to expand cognitive limits, build tactical foresight, and cultivate a competitive edge.
                </p>
                <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                  Whether you're a young beginner learning basic coordinates or a competitive tournament player looking to improve FIDE rating ELO points, our custom roadmaps are built to guide you to victory.
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
                    <span className="text-sm md:text-base text-slate-900 font-black">kumartv1978@gmail.com</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}