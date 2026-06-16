"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ChevronRight } from "lucide-react";

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
        
        {/* 2. LEFT SIDE IMAGE - Rounded & Tilted */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block w-72 h-[480px] relative shrink-0"
        >
          <div className="w-full h-full rounded-[4rem] overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50">
            <Image
              src="/ach1.jpeg"
              alt="Kid playing chess"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700 rounded-[4rem]"
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
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
              More growth, <span className="text-[#FFB800]">less work</span> <br />
              Get your time back
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed opacity-90 drop-shadow-md"
          >
            Time is money, and our chess academy solutions help you save both. 
            Automate your learning, master strategic thinking, and watch 
            as your skills reach new heights.
          </motion.p>

          {/* THE AMBER/YELLOW CTA */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 184, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group bg-[#FFB800] text-black px-12 py-5 rounded-full font-black text-xl shadow-xl transition-all flex items-center gap-3"
          >
            Join Our Academy
            <div className="bg-black/10 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
            </div>
          </motion.button>
        </div>

        {/* 4. RIGHT SIDE IMAGE - Rounded & Tilted */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block w-72 h-[480px] relative shrink-0"
        >
          <div className="w-full h-full rounded-[4rem] overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50">
            <Image
              src="/ach2.jpeg"
              alt="Adult teaching chess"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700 rounded-[4rem]"
            />
          </div>
        </motion.div>
      </div>

     

      {/* Bottom Fade gradient for smooth scroll transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}