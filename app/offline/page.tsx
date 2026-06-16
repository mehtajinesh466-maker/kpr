"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Users, 
  Trophy, 
  Swords,
  ShieldCheck,
  Send,
  Calendar,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MavelikkaraOfflinePage() {
  const yellow = "#FFB800";

  return (
    <main className="bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ── 1. PAGE BANNER (High-Fidelity Technical Style) ── */}
      <section className="relative w-full h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/chess.jpg" // Ensure this is in your public folder
            alt="Chess Background"
            fill
            className="object-cover opacity-20 grayscale scale-110"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_90%)]" />
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '35px 35px' }} />
        </div>

        {/* Floating Badges */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[28%] left-[7%] bg-white/5 backdrop-blur-xl p-5 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <MapPin className="text-[#FFB800] w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Center</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Mavelikkara HQ</p>
            </div>
          </motion.div>

          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[28%] left-[12%] bg-white/5 backdrop-blur-xl p-5 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-600/20 border border-purple-500/40 rounded-2xl">
              <Users className="text-purple-400 w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Learning</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">In-Person Classes</p>
            </div>
          </motion.div>

          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[32%] right-[8%] bg-white/5 backdrop-blur-xl p-5 rounded-[30px] border border-white/10 shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
              <ShieldCheck style={{ color: yellow }} className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Facility</p>
              <p className="text-white font-bold text-xs uppercase tracking-tight">Offline Academy</p>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center -mt-10 md:-mt-24">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-[#1e293b]/40 backdrop-blur-md rounded-full px-8 py-2 border border-white/5 mb-8 md:mb-12">
            <div className="flex items-center gap-3 text-[11px] font-black tracking-[0.3em] uppercase">
              <Link href="/" className="text-white hover:text-slate-300 transition-colors">Home</Link>
              <ChevronRight size={12} className="text-[#FFB800]" />
              <span className="text-[#FFB800]">Mavelikkara Center</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-black tracking-tighter leading-none uppercase flex items-center justify-center">
              <span className="text-white italic font-medium">THE</span>
              <span className="text-[#FFB800] not-italic ml-3">OFFLINE.</span>
            </h1>
            <p className="text-slate-300 font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs max-w-4xl mx-auto leading-relaxed">
              Physical Interaction <span className="text-white">·</span> Hands-on Coaching <br className="hidden md:block" />
              & The Traditional Discipline of Over-the-Board Play.
            </p>
          </motion.div>
        </div>

        {/* Organic Small Rippled Waves */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[100px] md:h-[160px]">
            <path d="M0,80 C180,110 360,60 540,85 C720,110 900,55 1080,80 C1260,105 1440,75 1440,75 V120 H0 Z" fill="#ffffff" fillOpacity="0.12" />
            <path d="M0,100 C120,80 240,115 360,100 C480,85 600,120 720,100 C840,80 960,115 1080,100 C1200,85 1320,115 1440,100 V120 H0 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── 2. CENTER OVERVIEW SECTION (Stacked Images) ── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-auto h-[450px] md:h-[600px]">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-[85%] h-[75%] rounded-[3rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl z-10">
              <Image src="/ach4.jpeg" alt="Academy Hall" fill className="object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50, x: 30 }} whileInView={{ opacity: 1, y: 0, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-[60%] h-[50%] rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl z-20">
              <Image src="/ach5.jpeg" alt="In-person class" fill className="object-cover" />
            </motion.div>

            <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-4 z-30 bg-[#FFB800] text-black px-6 py-8 rounded-[2.5rem] shadow-xl border-4 border-white flex flex-col items-center justify-center text-center">
               <Trophy size={24} className="mb-2" />
               <span className="text-3xl font-black leading-none">1st</span>
               <span className="text-[9px] font-bold uppercase tracking-widest leading-tight mt-1">Local <br/> Choice</span>
            </motion.div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100">
                <span className="w-2.5 h-2.5 bg-[#FFB800] rounded-full" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Our Mavelikkara Hub</span>
              </div>

              {/* Responsive Heading */}
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-[1.15]">
                Premier Physical <br />
                <span className="inline-block bg-[#FFB800] text-black px-5 py-1.5 rounded-[2rem] shadow-lg transform -rotate-1 mt-2">Chess Academy</span>
              </h2>

              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                Experience the atmosphere of a professional chess tournament. Our Mavelikkara center provides the perfect environment for students to focus, learn, and play against fellow enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
               {[
                 { title: "Physical Boards", desc: "Professional chess sets and ergonomic study areas." },
                 { title: "Local Tournaments", desc: "Regular internal weekend events for physical practice." },
                 { title: "Personal Attention", desc: "Direct oversight and posture correction from experts." },
                 { title: "Peer Competition", desc: "Build friendships and rivalries in a healthy environment." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0"><CheckCircle2 className="text-[#FFB800]" size={20} /></div>
                    <div>
                        <h4 className="font-black text-slate-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LOCATION & CONTACT CARDS SECTION ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Address Pill */}
             <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#FFB800] text-black flex items-center justify-center shadow-lg shadow-amber-200">
                    <MapPin size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Visit Us</h3>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed">
                        XV/294, Near SDA School,<br/>
                        Kottarkavu Mavelikkara, 690101
                    </p>
                </div>
             </div>

             {/* Contact Pill */}
             <div className="bg-[#0A0F1C] p-10 rounded-[3.5rem] shadow-xl text-white flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 text-[#FFB800] flex items-center justify-center">
                    <Phone size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">Call For Admission</h3>
                    <Link href="tel:9656004635" className="text-3xl font-black text-[#FFB800] block mb-2 hover:scale-105 transition-transform">+91 96560 04635</Link>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Office Hours: 9 AM - 8 PM</p>
                </div>
             </div>

             {/* Sessions Pill */}
             <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center">
                    <Clock size={28} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Class Timings</h3>
                    <p className="text-slate-500 font-bold text-sm">Weekdays: 4 PM - 7 PM</p>
                    <p className="text-slate-500 font-bold text-sm">Weekends: 10 AM - 1 PM</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── 4. MAP INTEGRATION (Specific Mavelikkara Location) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
                    <Zap size={14} className="text-[#FFB800]" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Find our center</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                  OUR <span className="text-[#FFB800] not-italic">LOCATION.</span>
                </h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-[400px] md:h-[500px] rounded-[4rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl relative"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.452328120613!2d76.5446059!3d9.2483861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06161405b0f495%3A0x67396655c659e13a!2sKottarkavu%2C%20Mavelikara!5e0!3m2!1sen!2sin!4v1717965000000!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white/50 shadow-xl hidden md:flex items-center gap-4">
                 <div className="w-10 h-10 bg-[#FFB800] rounded-2xl flex items-center justify-center text-black">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Mavelikkara Center</p>
                    <p className="text-sm font-black text-slate-900 leading-tight">Near SDA School, Kottarkavu</p>
                 </div>
              </div>
            </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
<section className="py-12 px-4 bg-white">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="max-w-4xl mx-auto bg-slate-950 rounded-[2rem] px-6 py-10 md:px-12 md:py-14 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFB800]/10 blur-3xl" />

    <div className="relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
        <Sparkles size={14} className="text-[#FFB800]" />
        <span className="text-[10px] font-bold text-white uppercase tracking-[0.25em]">
          Admissions Open
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
        Start Your Next
        <span className="block text-[#FFB800]">Victory.</span>
      </h2>

      <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm md:text-base">
        Visit our Mavelikkara Center for a free assessment and begin your chess journey.
      </p>

      <Link href="tel:9656004635">
        <button className="mt-6 inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFA500] text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-wider transition-all">
          Call Now
          <ChevronRight size={16} />
        </button>
      </Link>
    </div>
  </motion.div>
</section>

      <Footer />
    </main>
  );
}