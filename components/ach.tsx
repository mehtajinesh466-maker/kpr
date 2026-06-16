"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Medal, ChevronRight, ChevronLeft, Trophy } from "lucide-react";
import Image from "next/image";

export function Achievements() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      name: "Aditya S. Nair",
      title: "State Champion U-12",
      description: "Secured 1st place in the Kerala State Junior Chess Championship with an unbeaten streak.",
      image: "/ach1.jpeg",
      tag: "Gold Medalist",
      bgColor: "bg-[#2196F3]", // Blue
      waveColor: "#2196F3"
    },
    {
      name: "Riya Maria",
      title: "National Merit Holder",
      description: "Successfully reached the Top 10 in the National School Games Chess Tournament held in Delhi.",
      image: "/ach2.jpeg",
      tag: "FIDE Rated",
      bgColor: "bg-[#E91E63]", // Crimson
      waveColor: "#E91E63"
    },
    {
      name: "Kevin Joseph",
      title: "International Open - 3rd",
      description: "Represented India and secured 3rd position in the Dubai Junior International Open.",
      image: "/ach3.jpeg",
      tag: "Global Ranker",
      bgColor: "bg-[#4CAF50]", // Emerald
      waveColor: "#4CAF50"
    },
    {
      name: "Sara Elizabeth",
      title: "District Champion",
      description: "Dominant performance in the Kottayam District Chess Meet, winning all 7 rounds decisively.",
      image: "/ach4.jpeg",
      tag: "District #1",
      bgColor: "bg-[#9C27B0]", // Purple
      waveColor: "#9C27B0"
    },
    {
      name: "Mohammed Irfan",
      title: "Best Young Talent",
      description: "Awarded 'Most Promising Player' at the South India Inter-Academy Chess League.",
      image: "/ach5.jpeg",
      tag: "Rising Star",
      bgColor: "bg-[#C68E17]", // Deep Amber
      waveColor: "#C68E17"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // On mobile we scroll 100% width, on desktop we scroll a portion
      const scrollAmount = window.innerWidth < 768 ? clientWidth : clientWidth / 1.5;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
              <span className="w-2 h-2 bg-[#FFB800] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Our Wall of Fame</span>
            </div>

            {/* RESPONSIVE HEADING: 3xl Mobile, 5xl Desktop */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                Student
              </h2>
              <div className="inline-block bg-[#FFB800] text-black px-6 md:px-10 py-2.5 md:py-3.5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-amber-200/20">
                <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                  Achievements
                </span>
              </div>
            </div>
          </div>

          {/* SCROLL BUTTONS - Hidden on very small screens if needed, but styled as pills */}
          <div className="flex gap-3">
            <button 
              onClick={() => scroll("left")}
              className="p-3 md:p-4 rounded-full border border-slate-200 bg-white hover:bg-[#FFB800] hover:border-[#FFB800] hover:text-black transition-all active:scale-90 shadow-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-3 md:p-4 rounded-full border border-slate-200 bg-white hover:bg-[#FFB800] hover:border-[#FFB800] hover:text-black transition-all active:scale-90 shadow-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL SCROLLABLE GRID */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 md:gap-8 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              className="min-w-[90%] sm:min-w-[450px] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-22px)] snap-center md:snap-start"
            >
              <div className={`${item.bgColor} rounded-[3rem] md:rounded-[4rem] overflow-hidden border-4 border-white group transition-all duration-500 hover:shadow-2xl h-full flex flex-col shadow-lg`}>
                
                {/* Image & Wave Section */}
                <div className="relative h-56 md:h-72 w-full overflow-hidden shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* WAVE SEPARATION SVG */}
                  <div className="absolute bottom-[-2px] left-0 w-full leading-[0] z-20">
                    <svg 
                      viewBox="0 0 1200 120" 
                      preserveAspectRatio="none" 
                      className="relative block w-full h-[50px] md:h-[80px]"
                      style={{ fill: item.waveColor }}
                    >
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.85,103.24,131,110.43,210,103.24,257.14,98.92,284.19,74.19,321.39,56.44Z"></path>
                    </svg>
                  </div>

                  {/* Floating Tag */}
                  <div className="absolute top-5 left-5 md:top-8 md:left-8 z-30">
                    <span className="bg-white text-black text-[9px] md:text-[10px] font-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Medal size={12} className="text-[#FFB800]" /> {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-8 md:px-12 pb-10 md:pb-14 pt-2 flex flex-col items-center text-center flex-grow">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-1 leading-tight tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-white/80 font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] mb-4 md:mb-6">
                    {item.title}
                  </p>
                  
                  <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="w-12 h-1.5 bg-white/20 rounded-full group-hover:w-20 group-hover:bg-white transition-all duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA PILL */}
        <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-4 bg-slate-900 hover:bg-black text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-xs md:text-sm transition-all shadow-xl active:scale-95 group">
                BECOME OUR NEXT CHAMPION
                <ChevronRight size={18} className="text-[#FFB800] group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}