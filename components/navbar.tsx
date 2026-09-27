"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  Home,
  Info,
  Trophy,
  BookOpen,
  Image as ImageIcon,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function KPRLogo({ className = "h-8 sm:h-9 md:h-11" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 font-sans ${className}`}>
      <img
        src="/logo.png"
        alt="KPR Chess Academy Logo"
        className="h-full w-auto object-contain shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="flex flex-col text-left justify-center min-w-0">
        <span className="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-wider uppercase leading-tight truncate">
          KPR CHESS ACADEMY
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-[11px] text-[#E2B76D] font-semibold tracking-widest leading-none mt-0.5 opacity-90 truncate">
          Learn <span className="text-white/30 font-normal">|</span> Improve <span className="text-white/30 font-normal">|</span> Compete
        </span>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setCurriculumOpen(false);
  }, [pathname]);

  const curriculumItems = [
    { href: "/beginner", label: "Beginner Level", icon: "♙", desc: "Foundations & Rules" },
    { href: "/intermediates", label: "Intermediate Level", icon: "♘", desc: "Tactics & Strategy" },
    { href: "/advanced", label: "Advanced Level", icon: "♖", desc: "Tournament Prep" },
  ];

  const navItems = [
    { href: "/achievements", label: "Achievements", icon: Trophy },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/contact#branches", label: "Branches", icon: MapPin },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-2 sm:px-4 md:px-6 pointer-events-none">
        <motion.nav
          initial={false}
          animate={{
            width: isScrolled ? "96%" : "100%",
            maxWidth: "1440px",
            marginTop: isScrolled ? "0.5rem" : "0rem",
            height: isScrolled ? "4.25rem" : "5rem",
            borderRadius: isScrolled ? "999px" : "0px",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 backdrop-blur-xl transition-colors duration-300 w-full mx-auto ${
            isScrolled
              ? "bg-[#360507]/95 border border-red-800/40 shadow-2xl shadow-black/80"
              : "bg-[#2E0406]/90 border-b border-red-900/40"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0 min-w-0 pr-2">
            <KPRLogo
              className={`transition-all duration-300 ${
                isScrolled ? "h-7 sm:h-8 md:h-9" : "h-8 sm:h-10 md:h-11"
              }`}
            />
          </Link>

          {/* DESKTOP NAV (Visible on xl/large screens) */}
          <div
            className={`hidden xl:flex items-center space-x-1 lg:space-x-2 transition-all duration-300 ${
              isScrolled
                ? "bg-white/5 rounded-full px-2 py-1 border border-white/10"
                : ""
            }`}
          >
            {/* HOME */}
            <Link
              href="/"
              className={`px-3 py-1.5 text-sm font-semibold transition-all relative rounded-full ${
                pathname === "/"
                  ? "text-[#E2B76D] font-bold bg-white/5"
                  : "text-slate-200 hover:text-[#E2B76D]"
              }`}
            >
              Home
            </Link>

            {/* ABOUT US */}
            <Link
              href="/about"
              className={`px-3 py-1.5 text-sm font-semibold transition-all relative rounded-full ${
                pathname === "/about"
                  ? "text-[#E2B76D] font-bold bg-white/5"
                  : "text-slate-200 hover:text-[#E2B76D]"
              }`}
            >
              About
            </Link>

            {/* CURRICULUM DROPDOWN */}
            <div className="relative group">
              <button
                className={`px-3 py-1.5 text-sm font-semibold flex items-center gap-1 transition-all rounded-full ${
                  pathname.startsWith("/curriculum") ||
                  pathname === "/beginner" ||
                  pathname === "/intermediates" ||
                  pathname === "/advanced"
                    ? "text-[#E2B76D] font-bold bg-white/5"
                    : "text-slate-200 hover:text-[#E2B76D]"
                }`}
              >
                <span>Curriculum</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-60 bg-[#360507] rounded-2xl border border-red-800/50 shadow-2xl p-2 text-white backdrop-blur-xl">
                  {curriculumItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        pathname === item.href
                          ? "bg-[#E2B76D]/20 text-[#E2B76D] font-bold"
                          : "text-slate-200 hover:bg-white/10 hover:text-[#E2B76D]"
                      }`}
                    >
                      <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* REST NAV ITEMS */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm font-semibold transition-all relative rounded-full ${
                  pathname === item.href
                    ? "text-[#E2B76D] font-bold bg-white/5"
                    : "text-slate-200 hover:text-[#E2B76D]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
            <a
              href="https://app.meetchess.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 border border-white/20 hover:border-[#E2B76D]/60 text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap"
            >
              <LogIn size={13} className="text-[#E2B76D]" />
              <span className="uppercase tracking-wider">Online Login</span>
            </a>

            <button
              onClick={() => window.dispatchEvent(new Event("open-demo-modal"))}
              className="bg-gradient-to-r from-[#E2B76D] to-[#D4A352] hover:from-[#d9a851] hover:to-[#c4923f] text-slate-950 px-3.5 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full font-black text-xs sm:text-xs md:text-sm uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-900/20 hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Join Now</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="p-1.5 sm:p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-full xl:hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E2B76D]/50"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE / TABLET MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-sm xl:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm sm:max-w-md bg-[#280406] text-white flex flex-col shadow-2xl border-l border-red-800/40 xl:hidden overflow-hidden"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between px-5 h-16 sm:h-20 border-b border-red-900/40 bg-[#220204]">
                <KPRLogo className="h-8 sm:h-9" />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable Nav List */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                    pathname === "/"
                      ? "bg-[#E2B76D]/20 text-[#E2B76D]"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Home size={18} className={pathname === "/" ? "text-[#E2B76D]" : "text-slate-400"} />
                  <span>Home</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                    pathname === "/about"
                      ? "bg-[#E2B76D]/20 text-[#E2B76D]"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Info size={18} className={pathname === "/about" ? "text-[#E2B76D]" : "text-slate-400"} />
                  <span>About Us</span>
                </Link>

                {/* Curriculum Accordion */}
                <div className="rounded-xl overflow-hidden bg-black/20 border border-white/5">
                  <button
                    onClick={() => setCurriculumOpen(!curriculumOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 font-bold text-base text-slate-200 hover:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">♚</span>
                      <span>Curriculum Programs</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-[#E2B76D] transition-transform duration-200 ${
                        curriculumOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {curriculumOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-white/5 px-2 py-2 space-y-1 bg-black/30"
                      >
                        {curriculumItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              pathname === item.href
                                ? "bg-[#E2B76D]/20 text-[#E2B76D] font-bold"
                                : "text-slate-300 hover:bg-white/10 hover:text-[#E2B76D]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{item.icon}</span>
                              <div className="flex flex-col">
                                <span className="font-semibold">{item.label}</span>
                                <span className="text-[10px] text-slate-400">{item.desc}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                        isActive
                          ? "bg-[#E2B76D]/20 text-[#E2B76D]"
                          : "text-slate-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={18} className={isActive ? "text-[#E2B76D]" : "text-slate-400"} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Quick WhatsApp / Phone Contacts */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <a
                    href="https://wa.me/919941987881"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-semibold hover:bg-emerald-900/40 transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp: +91 99419 87881</span>
                  </a>
                </div>
              </div>

              {/* Bottom Fixed Action Buttons */}
              <div className="p-4 sm:p-5 border-t border-red-900/40 bg-[#1C0204] space-y-2.5">
                <a
                  href="https://app.meetchess.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  <LogIn size={15} className="text-[#E2B76D]" />
                  <span>Online Class Login</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new Event("open-demo-modal"));
                  }}
                  className="w-full text-center bg-gradient-to-r from-[#E2B76D] to-[#D4A352] text-slate-950 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs shadow-lg cursor-pointer active:scale-95 transition-transform"
                >
                  Join Now / Book Free Demo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}