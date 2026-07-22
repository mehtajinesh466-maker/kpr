"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageCircle, Send, CheckCircle2, ChevronRight, Globe } from "lucide-react";
import { useState } from "react";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const yellow = "#FFB800";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* 1. BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* 2. MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0A0F1C] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row"
          >
            {/* THE YELLOW DOTTED OVERLAY */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.08]" 
              style={{ 
                backgroundImage: `radial-gradient(${yellow} 1.5px, transparent 1.5px)`, 
                backgroundSize: '24px 24px' 
              }} 
            />

            {/* LEFT SIDE: CONTACT DETAILS */}
            <div className="w-full lg:w-[40%] p-8 md:p-12 bg-white/5 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                      <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">Free Assessment</span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                     Let's Build a <br />
                     <span className="text-[#FFB800]">Grandmaster.</span>
                   </h2>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: <Phone size={18} />, label: "Call Us", val: "+91 99419 87881" },
                    { icon: <MessageCircle size={18} />, label: "WhatsApp", val: "Chat with an Expert" },
                    { icon: <Mail size={18} />, label: "Support", val: "kumartv1978@gmail.com" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                       <div className="w-10 h-10 rounded-2xl bg-[#FFB800] text-black flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                          {item.icon}
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                          <p className="text-sm font-black text-white">{item.val}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRUST BADGE */}
              <div className="mt-12 pt-8 border-t border-white/5 hidden lg:block">
                 <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0F1C] bg-slate-800" />)}
                    </div>
                    <p className="text-xs font-bold text-slate-400">Join <span className="text-white">2,000+</span> parents world-wide</p>
                 </div>
              </div>
            </div>

            {/* RIGHT SIDE: FORM */}
            <div className="w-full lg:w-[60%] p-8 md:p-12 relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Parent's Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:border-[#FFB800] outline-none transition-all font-bold placeholder:text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Child's Age</label>
                    <input type="number" placeholder="e.g. 8" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:border-[#FFB800] outline-none transition-all font-bold placeholder:text-slate-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold border-r border-white/10 pr-3">+91</span>
                    <input type="tel" placeholder="00000 00000" className="w-full bg-white/5 border border-white/10 rounded-full pl-20 pr-6 py-4 text-white focus:border-[#FFB800] outline-none transition-all font-bold placeholder:text-slate-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Preferred Time Slot</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:border-[#FFB800] outline-none transition-all font-bold appearance-none">
                    <option className="bg-slate-900">Weekday Evenings</option>
                    <option className="bg-slate-900">Weekend Mornings</option>
                    <option className="bg-slate-900">Flexible</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button className="group w-full bg-[#FFB800] hover:bg-[#FFA500] text-black py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3 active:scale-95">
                    Schedule Free Demo
                    <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                       <ChevronRight size={18} />
                    </div>
                  </button>
                  <p className="text-center text-[10px] text-slate-600 mt-6 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <CheckCircle2 size={12} className="text-green-500" /> No Credit Card Required
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}