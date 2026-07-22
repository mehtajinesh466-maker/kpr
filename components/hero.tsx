"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-900 px-6 py-20">
      
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/chess.jpeg" // Replace with your high-res chess background
          alt="Chess Background"
          fill
          priority
          className="object-cover"
        />
        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        
        {/* Subtle radial glow to maintain the "focal point" feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] rounded-full bg-amber-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* 2. LEFT SIDE IMAGE PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block w-72 h-[480px] relative shrink-0"
        >
          <div className="w-full h-full rounded-[4rem] overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50 bg-gradient-to-tr from-[#7A0C0C] to-red-950 flex flex-col items-center justify-center text-white text-center">
            {/* Replace the src path below with your own image asset */}
            <Image
              src="/4.jpeg" 
              alt="KPR Chess Academy Left Illustration"
              fill
              className="object-cover opacity-100 hover:scale-105 transition-transform duration-500 rounded-[4rem]"
            />
          </div>
        </motion.div>

        {/* 3. CENTER CONTENT */}
        <div className="flex-1 flex flex-col items-center text-center space-y-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1]">
              Empower Your Mind With <br />
              <span className="text-[#7A0C0C] block mt-2">KPR Chess Academy</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed opacity-90 drop-shadow-md"
          >
            Structured chess coaching in Mylapore & Pallikaranai, Chennai. Develop critical logic, tournament confidence, and positional mastery under FIDE-rated coaches.
          </motion.p>

          {/* THE AMBER/YELLOW CTA */}
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(122, 12, 12, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group w-full bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 px-12 py-5 rounded-full font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3"
            >
              Book Free Demo
              <div className="bg-white/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={20} className="text-[#FFB800]" />
              </div>
            </motion.button>
          </Link>
        </div>

        {/* 4. RIGHT SIDE IMAGE PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block w-72 h-[480px] relative shrink-0"
        >
          <div className="w-full h-full rounded-[4rem] overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50 bg-gradient-to-tr from-slate-900 to-slate-950 flex flex-col items-center justify-center text-white text-center">
            {/* Replace the src path below with your own image asset */}
            <Image
              src="/2.jpeg" 
              alt="KPR Chess Academy Right Illustration"
              fill
              className="object-cover opacity-100 hover:scale-105 transition-transform duration-500 rounded-[4rem]"
            />
          </div>
        </motion.div>
      </div>

     

      {/* Bottom Fade gradient for smooth scroll transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}