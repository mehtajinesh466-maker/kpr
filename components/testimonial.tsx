"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Swathy Krishna Jayasree",
      role: "Parent",
      image: "https://i.pravatar.cc/150?u=swathy",
      rating: 5,
      content: "KPR Chess Academy is one of the best institutions which provides the best coaching for chess. They have professional trainers with first hand experience. I am really satisfied with the quality service.",
    },
    {
      name: "Irfan Mohammed",
      role: "Chess Enthusiast",
      image: "https://i.pravatar.cc/150?u=irfan",
      rating: 5,
      content: "Wonderful opportunity to learn new openings & different lines in it, end game, middle game strategies with young & well known tutors. Best chess academy in Chennai at present.",
    },
    {
      name: "Ashmi V S",
      role: "Student Parent",
      image: "https://i.pravatar.cc/150?u=ashmi",
      rating: 5,
      content: "KPR Chess Academy classes are really good. They provide great classes for kids. Keep going and provide the same quality education always.",
    },
    {
      name: "Rahul Nair",
      role: "Competitive Player",
      image: "https://i.pravatar.cc/150?u=rahul",
      rating: 5,
      content: "The depth of analysis provided in the intermediate sessions is incredible. My FIDE rating improved significantly within 6 months of joining.",
    },
    {
      name: "Meera Joseph",
      role: "Parent",
      image: "https://i.pravatar.cc/150?u=meera",
      rating: 5,
      content: "Excellent platform. The coaches are very patient with children and make the learning process fun and engaging. My son never misses a class!",
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by one card width on desktop, full width on mobile
      const scrollAmount = window.innerWidth < 768 ? clientWidth : clientWidth / 3;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100">
              <Heart className="w-3 h-3 text-[#7A0C0C] fill-[#7A0C0C]" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Our Wall of Fame</span>
            </div>
            
            {/* RESPONSIVE HEADING: 3xl Mobile, 5xl Desktop */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight md:leading-[1.1]">
              Voices of our <span className="text-[#7A0C0C]">Chess</span> <br className="hidden md:block" />
              Community
            </h2>
          </div>

          {/* Navigation Buttons - Hidden on very small screens, visible on md+ */}
          <div className="flex gap-3">
            <button 
              onClick={() => scroll("left")}
              className="p-3 md:p-4 rounded-full border border-slate-200 bg-white hover:bg-[#7A0C0C] hover:border-[#7A0C0C] hover:text-[#FFB800] transition-all active:scale-90 shadow-sm group"
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-3 md:p-4 rounded-full border border-slate-200 bg-white hover:bg-[#7A0C0C] hover:border-[#7A0C0C] hover:text-[#FFB800] transition-all active:scale-90 shadow-sm group"
              aria-label="Next"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Testimonial Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 md:gap-8 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              className="min-w-[85%] sm:min-w-[400px] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-22px)] snap-center md:snap-start"
            >
              <div className="h-full bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] hover:bg-white hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-500 flex flex-col justify-between group shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#FFB800] text-[#FFB800]" />
                      ))}
                    </div>
                    <Quote className="text-slate-200 group-hover:text-[#7A0C0C] transition-colors" size={32} />
                  </div>

                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-8 italic">
                    "{review.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
                    <Image src={review.image} alt={review.name} width={56} height={56} className="object-cover" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm md:text-base font-black text-slate-900 truncate">{review.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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