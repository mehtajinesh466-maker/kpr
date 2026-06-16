"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { NavbarSearch } from "./navbar-search";

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
    { href: "/chess-coaching-for-beginners", label: "Beginner", icon: "♙" },
    { href: "/intermediates", label: "Intermediate", icon: "♘" },
    { href: "/advanced", label: "Advanced", icon: "♖" },
    { href: "/playing-partners", label: "Playing Partners", icon: "♕" },
  ];

  const navItems = [
    { href: "/achievements", label: "Achievements" },
    { href: "/blog", label: "Blog" },
    { href: "/calculators", label: "Calculators" },
    { href: "/gallery", label: "Gallery" },
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
            height: isScrolled ? "4rem" : "5.5rem",
            borderRadius: isScrolled ? "999px" : "0px",
          }}
          className={`flex items-center justify-between px-3 md:px-8 backdrop-blur-xl border-b transition-all duration-300 max-w-[1440px] ${
            isScrolled
              ? "bg-white/90 border-slate-200/60 shadow-lg shadow-purple-500/5"
              : "bg-white border-transparent"
          }`}
        >

          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/chesseasy.png"
              alt="ChessEasy"
              width={160}
              height={40}
              priority
              className={`transition-all duration-300 ${
                isScrolled ? "h-6 md:h-8" : "h-8 md:h-10"
              } w-auto`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <div
            className={`hidden lg:flex items-center mx-2 ${
              isScrolled
                ? "bg-slate-100/80 rounded-full p-1 border border-slate-200/50"
                : ""
            }`}
          >
            {/* HOME */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                pathname === "/"
                  ? "bg-white text-purple-600 shadow-sm ring-1 ring-slate-200/50"
                  : "text-slate-600 hover:text-purple-500"
              }`}
            >
              Home
            </Link>

            {/* ABOUT US — second */}
            <Link
              href="/about"
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                pathname === "/about"
                  ? "bg-white text-purple-600 shadow-sm ring-1 ring-slate-200/50"
                  : "text-slate-600 hover:text-purple-500"
              }`}
            >
              About Us
            </Link>

            {/* CURRICULUM DROPDOWN — third, compact size + color on hover */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 transition-all ${
                  pathname.startsWith("/curriculum")
                    ? "bg-white text-purple-600 shadow-sm ring-1 ring-slate-200/50"
                    : "text-slate-600 hover:text-purple-500"
                }`}
              >
                Curriculum <ChevronDown size={14} />
              </button>

              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {/* Compact: w-52, tight padding, small icons */}
                <div className="w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5">
                  {curriculumItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all group/item ${
                        pathname === item.href
                          ? "bg-purple-50 text-purple-700"
                          : "text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all ${
                          pathname === item.href
                            ? "bg-purple-100"
                            : "bg-slate-100 group-hover/item:bg-amber-100"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="font-semibold text-sm">{item.label}</span>
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
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  pathname === item.href
                    ? "bg-white text-purple-600 shadow-sm ring-1 ring-slate-200/50"
                    : "text-slate-600 hover:text-purple-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 md:gap-4">
            <NavbarSearch />
            
            <Link
              href="/contact"
              className={`group flex items-center bg-[#FFB800] hover:bg-[#FFA500] text-black rounded-full font-black transition-all duration-300 active:scale-95 shadow-md shadow-amber-200/30 ${
                isScrolled
                  ? "px-3 py-1.5 md:px-5 md:py-2"
                  : "px-4 py-2 md:px-7 md:py-3"
              }`}
            >
              <span className="uppercase tracking-wider text-[9px] md:text-xs whitespace-nowrap">
                Book a Demo
              </span>
              <div className="hidden md:flex ml-2 bg-white/40 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={14} className="text-black" />
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-full lg:hidden"
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
            className="fixed inset-0 z-[70] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b">
              <Image
                src="/chesseasy.png"
                alt="Logo"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <NavbarSearch />
              </div>

              <Link href="/" onClick={() => setIsOpen(false)} className="block text-2xl font-black">
                Home
              </Link>

              <Link href="/about" onClick={() => setIsOpen(false)} className="block text-2xl font-black">
                About Us
              </Link>

              {/* CURRICULUM MOBILE ACCORDION */}
              <div>
                <button
                  onClick={() => setCurriculumOpen(!curriculumOpen)}
                  className="w-full flex justify-between text-2xl font-black"
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
                      className="overflow-hidden mt-4 pl-4 space-y-3"
                    >
                      {curriculumItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsOpen(false);
                            setCurriculumOpen(false);
                          }}
                          className="flex items-center gap-3 text-lg font-semibold text-slate-600 hover:text-amber-600 transition-colors"
                        >
                          <span className="text-xl">{item.icon}</span>
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
                  className="block text-2xl font-black"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="p-6 border-t bg-slate-50">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-[#FFB800] py-4 rounded-xl font-black"
              >
                BOOK A DEMO
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[5.5rem]" />
    </>
  );
}