"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function KPRLogo({ className = "h-9 md:h-11" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 font-sans ${className}`}>
      <img
        src="/logo.png"
        alt="KPR Chess Academy Logo"
        className="h-full w-auto object-contain shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="flex flex-col text-left justify-center">
        <span className="font-extrabold text-white text-sm md:text-base tracking-wider uppercase leading-tight">
          KPR CHESS ACADEMY
        </span>
        <span className="text-[10px] md:text-[11px] text-[#E2B76D] font-semibold tracking-widest leading-none mt-0.5 opacity-90">
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const curriculumItems = [
    { href: "/beginner", label: "Beginner", icon: "♙" },
    { href: "/intermediates", label: "Intermediate", icon: "♘" },
    { href: "/advanced", label: "Advanced", icon: "♖" },
  ];

  const navItems = [
    { href: "/achievements", label: "Achievements" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact#branches", label: "Branches" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full">
        <motion.nav
          initial={false}
          animate={{
            width: isScrolled ? "92%" : "100%",
            marginTop: isScrolled ? "0.75rem" : "0rem",
            height: isScrolled ? "4.75rem" : "5.5rem",
            borderRadius: isScrolled ? "999px" : "0px",
          }}
          className={`flex items-center justify-between px-4 md:px-8 backdrop-blur-xl transition-all duration-300 max-w-[1440px] mx-auto ${
            isScrolled
              ? "bg-[#180508]/92 border border-red-900/30 shadow-2xl shadow-black/90"
              : "bg-[#140507]/85 border-b border-red-950/40"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <KPRLogo
              className={`transition-all duration-300 ${
                isScrolled ? "h-8 md:h-9" : "h-10 md:h-12"
              }`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <div
            className={`hidden lg:flex items-center space-x-1 xl:space-x-2 transition-all duration-300 ${
              isScrolled
                ? "bg-white/5 rounded-full px-2 py-1 border border-white/10"
                : ""
            }`}
          >
            {/* HOME */}
            <Link
              href="/"
              className={`px-3 py-1.5 text-sm font-semibold transition-all relative ${
                pathname === "/"
                  ? "text-[#E2B76D] font-bold border-b-2 border-[#E2B76D]"
                  : "text-slate-200 hover:text-[#E2B76D]"
              }`}
            >
              Home
            </Link>

            {/* ABOUT US */}
            <Link
              href="/about"
              className={`px-3 py-1.5 text-sm font-semibold transition-all relative ${
                pathname === "/about"
                  ? "text-[#E2B76D] font-bold border-b-2 border-[#E2B76D]"
                  : "text-slate-200 hover:text-[#E2B76D]"
              }`}
            >
              About
            </Link>

            {/* CURRICULUM DROPDOWN */}
            <div className="relative group">
              <button
                className={`px-3 py-1.5 text-sm font-semibold flex items-center gap-1 transition-all ${
                  pathname.startsWith("/curriculum") ||
                  pathname === "/beginner" ||
                  pathname === "/intermediates" ||
                  pathname === "/advanced"
                    ? "text-[#E2B76D] font-bold border-b-2 border-[#E2B76D]"
                    : "text-slate-200 hover:text-[#E2B76D]"
                }`}
              >
                Curriculum <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-52 bg-[#1A0609] rounded-2xl border border-red-950/60 shadow-2xl p-2 text-white">
                  {curriculumItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        pathname === item.href
                          ? "bg-[#E2B76D]/20 text-[#E2B76D] font-bold"
                          : "text-slate-200 hover:bg-white/10 hover:text-[#E2B76D]"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
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
                className={`px-3 py-1.5 text-sm font-semibold transition-all relative ${
                  pathname === item.href
                    ? "text-[#E2B76D] font-bold border-b-2 border-[#E2B76D]"
                    : "text-slate-200 hover:text-[#E2B76D]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://app.meetchess.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 border border-white/20 hover:border-[#E2B76D]/60 text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200"
            >
              <LogIn size={14} className="text-[#E2B76D]" />
              <span className="uppercase tracking-wider">Online Login</span>
            </a>

            <button
              onClick={() => window.dispatchEvent(new Event("open-demo-modal"))}
              className="bg-gradient-to-r from-[#E2B76D] to-[#D4A352] hover:from-[#d9a851] hover:to-[#c4923f] text-slate-950 px-5 py-2 md:px-6 md:py-2.5 rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-900/20 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Join Now</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-200 hover:bg-white/10 rounded-full lg:hidden"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[70] bg-[#140507] text-white flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <KPRLogo className="h-10" />
              <button onClick={() => setIsOpen(false)} className="p-2 text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block text-xl font-bold ${
                  pathname === "/" ? "text-[#E2B76D]" : "text-slate-200"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`block text-xl font-bold ${
                  pathname === "/about" ? "text-[#E2B76D]" : "text-slate-200"
                }`}
              >
                About Us
              </Link>

              <div>
                <button
                  onClick={() => setCurriculumOpen(!curriculumOpen)}
                  className="w-full flex justify-between text-xl font-bold text-slate-200"
                >
                  Curriculum
                  <ChevronDown
                    className={`transition-transform ${curriculumOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {curriculumOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pl-4 space-y-3"
                    >
                      {curriculumItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsOpen(false);
                            setCurriculumOpen(false);
                          }}
                          className="flex items-center gap-3 text-base font-medium text-slate-300 hover:text-[#E2B76D]"
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-xl font-bold ${
                    pathname === item.href ? "text-[#E2B76D]" : "text-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="p-6 border-t border-red-950/40 bg-[#100305] space-y-3">
              <a
                href="https://app.meetchess.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
              >
                <LogIn size={18} className="text-[#E2B76D]" />
                <span>ONLINE CLASS LOGIN</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new Event("open-demo-modal"));
                }}
                className="w-full text-center bg-gradient-to-r from-[#E2B76D] to-[#D4A352] text-slate-950 py-4 rounded-xl font-black uppercase tracking-wider text-sm shadow-lg"
              >
                JOIN NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}