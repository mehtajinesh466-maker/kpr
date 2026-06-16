"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Globe, ChevronRight } from "lucide-react";

export function ContactSection() {
  const yellow = "#FFB800";

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. CENTERED HEADING UI - Responsive Sizes */}
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FFB800]" />
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Connect with us</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {/* Heading: 3xl on Mobile, 5xl on Desktop */}
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Get in
            </h2>
            <div className="inline-block bg-[#FFB800] text-black px-6 md:px-12 py-2.5 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-amber-200/20">
              <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
                Touch
              </span>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-lg leading-relaxed">
            Have questions about our curriculum or want to book a free demo? 
            Our team is here to help you start your chess journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-20 items-start mb-16 md:mb-20">
          
          {/* 2. LEFT SIDE: CONTACT DETAILS */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: <MapPin size={24} />,
                  title: "Our Academy",
                  detail: "SH Mount P.O, Kottayam, Kerala, India.",
                  sub: "Headquarters"
                },
                {
                  icon: <Phone size={24} />,
                  title: "Call Us",
                  detail: "+91 70129 80842",
                  sub: "Mon-Sat, 9am - 8pm"
                },
                {
                  icon: <Mail size={24} />,
                  title: "Email Support",
                  detail: "info@chesseasy.com",
                  sub: "Online 24/7"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-[2rem] md:rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-500"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[2rem] bg-[#FFB800] text-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] md:text-[10px] font-black text-[#FFB800] uppercase tracking-widest mb-0.5 md:mb-1">{item.sub}</p>
                    <h4 className="text-sm md:text-xl font-black text-slate-900 leading-tight truncate md:whitespace-normal">{item.detail}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Response Badge */}
            <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/10 blur-3xl" />
               <div className="relative z-10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-green-400" />
                  </div>
                  <p className="text-xs md:text-sm font-bold text-slate-300 italic">"Average response time is less than 2 hours during working hours."</p>
               </div>
            </div>
          </div>

          {/* 3. RIGHT SIDE: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 shadow-2xl border border-slate-100"
          >
            <form className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    className="w-full px-6 md:px-8 py-4 md:py-5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#FFB800] focus:bg-white transition-all outline-none font-bold text-slate-900 text-sm md:text-base"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 md:px-8 py-4 md:py-5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#FFB800] focus:bg-white transition-all outline-none font-bold text-slate-900 text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Subject</label>
                <div className="relative">
                    <select className="w-full px-6 md:px-8 py-4 md:py-5 rounded-full bg-slate-50 border-2 border-transparent focus:border-[#FFB800] focus:bg-white transition-all outline-none font-bold text-slate-900 appearance-none text-sm md:text-base">
                        <option>Book a Free Demo</option>
                        <option>Course Inquiry</option>
                        <option>Partnership</option>
                        <option>Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="rotate-90" size={18} />
                    </div>
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Your Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your child's chess experience..."
                  className="w-full px-6 md:px-8 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-50 border-2 border-transparent focus:border-[#FFB800] focus:bg-white transition-all outline-none font-bold text-slate-900 resize-none text-sm md:text-base"
                ></textarea>
              </div>

              <button className="w-full bg-[#FFB800] hover:bg-[#FFA500] text-black py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-200 active:scale-95 flex items-center justify-center gap-3">
                Send Message 
                <div className="bg-black/10 p-1 rounded-full shrink-0">
                  <Send size={16} />
                </div>
              </button>
            </form>
          </motion.div>
        </div>

        {/* 4. MAP INTEGRATION - WIDE PILL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full h-[300px] md:h-[450px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-[6px] md:border-[12px] border-slate-50 shadow-2xl relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.123456789!2d76.521!3d9.591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzUnMjcuNiJOIDc2wrAzMScxNS42IkU!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
            className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          {/* Map Overlay Badge - Hidden on small mobile to avoid clutter */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-auto md:right-auto md:top-8 md:left-8 bg-white/95 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-[1.5rem] md:rounded-[2rem] border border-white/50 shadow-xl flex items-center gap-3 md:gap-4">
             <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFB800] rounded-xl md:rounded-2xl flex items-center justify-center text-black shrink-0">
                <MapPin size={18} className="md:w-5 md:h-5" />
             </div>
             <div>
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">VISIT US</p>
                <p className="text-[11px] md:text-sm font-black text-slate-900 leading-tight">SH Mount P.O, Kottayam</p>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}