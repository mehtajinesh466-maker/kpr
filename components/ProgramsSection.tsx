"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Globe } from "lucide-react";

export function ProgramsSection() {
  const programs = [
    {
      title: "Beginner",
      description: "Learn the basics, build confidence and play with purpose.",
      badge: "Age 5+",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-slate-900"
        >
          <path d="M12 2a3 3 0 0 0-3 3c0 1.25.77 2.32 1.86 2.76A4.99 4.99 0 0 0 7 12.5V15h10v-2.5a4.99 4.99 0 0 0-3.86-4.74A3 3 0 0 0 12 2zm-5 15v2h10v-2H7zm-1 3v2h12v-2H6z" />
        </svg>
      ),
      link: "/beginner",
    },
    {
      title: "Intermediate",
      description: "Improve your strategy, calculation and endgame skills.",
      badge: "Age 8+",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-emerald-800"
        >
          <path d="M19 22H5v-2h14v2zm-2-4H7v-2h10v2zm-1-8.5c0-1.5-1-2.5-2.5-3.5C12 5 10 3 8 2c.5 2.5 0 5-2 6.5C4.5 9.5 4 11 4 13c0 2 1.5 3.5 3 4h8c1.5 0 3-1 3-3v-4.5z" />
        </svg>
      ),
      link: "/intermediates",
    },
    {
      title: "Advanced",
      description: "Sharpen your tactics, openings and tournament preparation.",
      badge: "Age 12+",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-indigo-900"
        >
          <path d="M5 22h14v-2H5v2zm2-4h10v-2H7v2zm1-4h8V9H8v5zm-2-7h2v2H6V7zm4 0h4v2h-4V7zm6 0h2v2h-2V7zM5 3h14v3H5V3z" />
        </svg>
      ),
      link: "/advanced",
    },
    {
      title: "Tournament Prep",
      description:
        "Get ready for competitive play with expert guidance and practice games.",
      badge: "All Levels",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/80",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-amber-600"
        >
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3H5v2h14v-2z" />
        </svg>
      ),
      link: "/achievements",
    },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-20 px-4 md:px-8 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ================= TOP SECTION: HEADING + 4 PROGRAM CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT HEADER */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
            <span className="text-[#C29648] text-xs font-extrabold uppercase tracking-widest">
              OUR PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Chess Classes for Every Level
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md">
              From your first move to tournament preparation, we have the right
              program for you.
            </p>
            <div className="pt-2">
              <Link href="/beginner">
                <button className="bg-[#1A0508] hover:bg-[#2D0A0F] text-white font-bold text-sm px-6 py-3.5 rounded-full flex items-center gap-2.5 transition-all shadow-md shadow-amber-950/20 hover:scale-105 active:scale-95 cursor-pointer">
                  <span>Explore All Classes</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT 4 CARDS */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {programs.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg md:text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-block font-bold text-xs px-3 py-1 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM CTA BANNER ================= */}
        <div className="w-full bg-gradient-to-r from-[#1A0609] via-[#140507] to-[#20070C] text-white rounded-2xl p-5 sm:p-6 md:p-7 border border-red-950/50 shadow-xl shadow-amber-950/20 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* LEFT INFO + THUMBNAIL */}
          <div className="flex items-center gap-5">
            {/* THUMBNAIL */}
            <div className="w-28 h-16 rounded-xl overflow-hidden relative shrink-0 border border-white/20 hidden sm:block shadow-md">
              <Image
                src="/hero_chess_bg.jpg"
                alt="Join KPR Chess Academy"
                fill
                className="object-cover"
              />
            </div>
            {/* TEXT */}
            <div className="text-center sm:text-left">
              <h3 className="font-black text-lg md:text-xl text-white tracking-tight">
                Join KPR Chess Academy Today
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
                Train &nbsp;&bull;&nbsp; Compete &nbsp;&bull;&nbsp; Grow
              </p>
            </div>
          </div>

          {/* CENTER CTA BUTTON */}
          <div>
            <button
              onClick={() => window.dispatchEvent(new Event("open-demo-modal"))}
              className="bg-gradient-to-r from-[#E2B76D] to-[#D4A352] hover:from-[#d9a851] hover:to-[#c4923f] text-slate-950 font-bold text-xs md:text-sm px-7 py-3 rounded-full flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* RIGHT LOCATION & WEBSITE */}
          <div className="flex flex-col items-center lg:items-end text-xs text-slate-300 space-y-1.5 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#E2B76D] shrink-0" />
              <span>Pallikaranai &nbsp;|&nbsp; Sholinganallur &nbsp;|&nbsp; Perumbakkam</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#E2B76D] shrink-0" />
              <a
                href="https://www.kprchessacademy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                www.kprchessacademy.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
