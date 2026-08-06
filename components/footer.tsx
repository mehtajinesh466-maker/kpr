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

export function KPRLogo({ className = "h-8 md:h-10" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-sans ${className}`}>
      <img src="/logo.png" alt="KPR Chess Academy Logo" className="h-full w-auto object-contain" />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0B0202] text-slate-300 relative overflow-hidden border-t border-red-950/30 font-sans">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#7A0C0C]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FFB800]/2 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* ── MAIN FOOTER CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block">
              <KPRLogo className="h-12" />
            </Link>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Chennai's premier coaching academy for strategic development. Nurturing beginners, intermediates, and advanced competitors into local and international champions.
            </p>
            <div className="flex space-x-3 pt-2">
              {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                <Link 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#7A0C0C] hover:border-[#FFB800]/30 hover:text-[#FFB800] transition-all duration-300"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-6 md:pl-4">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A0C0C]" /> Navigation
            </h4>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Home Page" },
                { href: "/about", label: "About KPR" },
                { href: "/curriculum", label: "Programs" },
                { href: "/achievements", label: "Champions" },
                { href: "/blog", label: "Articles" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs md:text-sm text-slate-400 hover:text-[#FFB800] transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Levels */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A0C0C]" /> Classes
            </h4>
            <ul className="space-y-3.5">
              {[
                "Beginner Level",
                "Intermediate Level",
                "Advanced Theory",
                "1-on-1 Coaching",
                "Tactics Workshops"
              ].map((lvl) => (
                <li key={lvl} className="text-xs md:text-sm text-slate-400 hover:text-[#FFB800] transition-colors font-medium cursor-pointer">
                  {lvl}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Our Branches */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A0C0C]" /> Our Branches
            </h4>
            <ul className="space-y-3.5">
              {[
                "Kovilambakkam",
                "Medavakkam",
                "Perumbakkam",
                "Sholinganallur",
                "Siruseri",
                "Thoraipakkam"
              ].map((branch) => (
                <li key={branch}>
                  <Link href="/contact#branches" className="text-xs md:text-sm text-slate-400 hover:text-[#FFB800] transition-colors font-medium">
                    {branch}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact details */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A0C0C]" /> Address & Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FFB800] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-slate-400 font-medium">
                  <p className="mb-1"><strong className="text-white">Mylapore:</strong> Near Amma Hotel, Alamelu Mangapuram, Chennai</p>
                  <p><strong className="text-white">Pallikaranai:</strong> No-10, Balaji Dental Clinic, Rajesh Nagar, 4th Cross Street, Chennai</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#FFB800] shrink-0" />
                <Link href="tel:+919941987881" className="text-xs md:text-sm text-slate-400 hover:text-white font-medium">
                  +91 99419 87881
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#FFB800] shrink-0" />
                <Link href="mailto:kumartv1978@gmail.com" className="text-xs md:text-sm text-slate-400 hover:text-white font-medium">
                  kumartv1978@gmail.com
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── COPYRIGHT & BAR ── */}
      <div className="border-t border-white/5 py-8 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center md:text-left">
            © 2026 <span className="text-[#FFB800]">KPR CHESS ACADEMY</span>. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-slate-500">
            {["Privacy Policy", "Terms of Use", "Refund Policy"].map((policy) => (
              <Link key={policy} href="#" className="hover:text-white transition-colors">
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}