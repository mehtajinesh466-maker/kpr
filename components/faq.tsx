"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ChevronRight } from "lucide-react";
import Image from "next/image";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the ideal age for a child to start chess?",
      answer: "We recommend starting as early as 5 or 6 years old. At this age, children develop the cognitive ability to understand piece movements and basic logic, which builds a strong foundation for strategic thinking."
    },
    {
      question: "Do you provide 1-on-1 coaching or group sessions?",
      answer: "We offer both! You can choose personalized 1-on-1 sessions for intensive learning or interactive group classes where students can practice and compete with peers of the same skill level."
    },
    {
      question: "Do we need a physical chessboard for online classes?",
      answer: "While not strictly required (as we use professional interactive digital boards), we highly recommend having a physical board at home to practice the techniques learned during the sessions."
    },
    {
      question: "How do I know which level is right for my child?",
      answer: "We provide a free assessment session where our International Coaches evaluate your child's current understanding and recommend the most suitable level—Beginner, Intermediate, or Advanced."
    },
    {
      question: "Are the coaches International players?",
      answer: "Yes, our team consists of professional chess coaches who are International and Commonwealth players with first-hand experience in global tournaments."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING UI - RESPONSIVE SIZES */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#7A0C0C]" />
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Support Center</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {/* Heading: 3xl on Mobile, 5xl on Desktop */}
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Common
            </h2>
            <div className="inline-block bg-[#7A0C0C] text-[#FFB800] px-6 md:px-12 py-2.5 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-red-950/15">
              <span className="text-3xl lg:text-5xl font-black tracking-tighter leading-none">
                Questions
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
          
          {/* LEFT SIDE: ACCORDION QUESTIONS */}
          <div className="w-full lg:w-3/5 space-y-4 order-2 lg:order-1">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={false}
                className={`rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-300 ${
                  openIndex === idx 
                    ? "border-[#FFB800] bg-amber-50/30 shadow-xl shadow-amber-500/5" 
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-8 text-left"
                >
                  <span className={`text-base md:text-xl font-black tracking-tight leading-tight pr-4 ${
                    openIndex === idx ? "text-slate-900" : "text-slate-700"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                    openIndex === idx ? "bg-[#FFB800] text-black rotate-180" : "bg-slate-100 text-slate-400"
                  }`}>
                    {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 md:px-8 pb-6 md:pb-8 pt-0 text-slate-500 font-medium leading-relaxed text-sm md:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE: CURVED IMAGE SECTION - Sticky on Desktop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-2/5 lg:sticky lg:top-32 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] rounded-tl-[60px] rounded-br-[60px] md:rounded-tl-[100px] md:rounded-br-[100px] overflow-hidden border-[8px] md:border-[12px] border-slate-50 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=1000"
                alt="Support Team"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Status Pill - Responsive Padding */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-white/95 backdrop-blur-md p-5 md:p-7 rounded-[2rem] border border-white/50 shadow-xl">
                 <p className="text-[10px] md:text-xs font-black text-[#FFB800] uppercase tracking-widest mb-1.5 md:mb-2">Still have questions?</p>
                 <h4 className="text-slate-900 font-black text-base md:text-xl mb-4 md:mb-5 leading-tight">We&apos;re here to help <br className="hidden md:block" /> you 24/7</h4>
                 <button className="w-full bg-slate-900 text-white py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-black transition-all group active:scale-95 shadow-lg">
                    CONTACT SUPPORT 
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>

            {/* Background decorative blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-amber-100 rounded-full blur-3xl -z-10 opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}