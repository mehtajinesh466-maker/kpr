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
import AchievementBanner from "@/components/achBanner";
import { CompactCTA } from "@/components/cta";

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
      <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-10 py-2.5 md:py-3.5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-red-950/15">
        <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">{highlight}</span>
      </div>
    </div>
    <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-lg leading-relaxed">{sub}</p>
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
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden w-full">
        <Navbar/>
      
      <AchievementBanner />

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
            color: "from-slate-700 to-slate-900",
          },
          {
            icon: "♘",
            title: "Developing",
            range: "1000 - 1300",
            desc: "Tactics, forks, pins, skewers and board awareness.",
            color: "from-red-900 to-red-950",
          },
          {
            icon: "♗",
            title: "Strategic",
            range: "1300 - 1600",
            desc: "Positional understanding and opening preparation.",
            color: "from-[#7A0C0C] to-red-900",
          },
          {
            icon: "♖",
            title: "Competitive",
            range: "1600 - 1900",
            desc: "Tournament preparation and advanced calculations.",
            color: "from-[#7A0C0C] to-[#5E0909]",
          },
          {
            icon: "♕",
            title: "Elite",
            range: "1900+",
            desc: "Master-level thinking and competitive excellence.",
            color: "from-[#FFB800] to-amber-500",
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
             {[
               "/19.jpeg", // Customize first image path here
               "/21.jpeg", // Customize second image path here
               "/22.jpeg", // Customize third image path here
               "/23.jpeg"  // Customize fourth image path here
             ].map((imgSrc, i) => (
                <motion.div key={i} whileHover={{ scale: 0.98 }} onClick={() => setSelectedImg(imgSrc)}
                 className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group border-4 border-slate-50">
                   <Image src={imgSrc} alt={`Award Gallery Image ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform" />
                   <div className="absolute inset-0 bg-[#7A0C0C]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Camera size={30} className="text-[#FFB800]" />
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CompactCTA />
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