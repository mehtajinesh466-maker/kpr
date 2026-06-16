"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const amber = "#FFB800";

  return (
    <footer className="bg-[#0A0F1C] text-gray-300 relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* 1. Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/chesseasy.png"
                alt="ChessEasy Academy"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Elevate your strategic thinking with world-class chess programs. 
              From absolute beginners to emerging Grandmasters, we guide every move of your journey!
            </p>
            
            {/* Social Links - Themed to Amber */}
            <div className="flex space-x-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-3 rounded-xl bg-white/5 hover:bg-[#FFB800] hover:text-black transition-all duration-300 group"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Navigation Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                Navigation
              </h4>
              <ul className="space-y-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/curriculum", label: "Curriculum" },
                  { href: "/about", label: "About Us" },
                  { href: "/achievements", label: "Achievements" },
                  { href: "/blog", label: "Blog" },
                  { href: "/calculators", label: "Calculators" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#FFB800] transition-colors flex items-center group"
                    >
                      <ChevronRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                Training
              </h4>
              <ul className="space-y-4">
                {[
                  "Beginner Level",
                  "Intermediate Level",
                  "Advanced Strategy",
                  "1-on-1 Coaching",
                  "Tournament Prep",
                ].map((item) => (
                  <li key={item} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                Get In Touch
              </h4>
              <div className="space-y-5">
                <div className="flex items-start space-x-3 group">
                  <MapPin size={18} className="text-[#FFB800] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-gray-400">
                    SH Mount P.O <br />
                    Kottayam, Kerala, India.
                  </p>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Phone size={18} className="text-[#FFB800] shrink-0" />
                  <Link href="tel:+917012980842" className="text-sm text-gray-400 hover:text-white">
                    +91 70129 80842
                  </Link>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Mail size={18} className="text-[#FFB800] shrink-0" />
                  <Link href="mailto:info@chesseasy.com" className="text-sm text-gray-400 hover:text-white">
                    info@chesseasy.com
                  </Link>
                </div>
                
                {/* Brand CTA Button */}
                <Link href="/contact" className="block pt-4">
                  <button className="w-full bg-[#FFB800] hover:bg-[#FFA500] text-black rounded-full py-4 px-6 font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 active:scale-95">
                    <MessageCircle size={16} />
                    Start Learning Today
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            © 2026 <span className="text-[#FFB800]">ChessEasy Academy</span>. All Rights Reserved.
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-black uppercase tracking-widest">
            {["Privacy Policy", "Terms of Use", "Refund Policy"].map((policy) => (
              <Link key={policy} href="#" className="text-gray-500 hover:text-white transition-colors">
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}