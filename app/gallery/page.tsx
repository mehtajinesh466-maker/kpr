"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Camera, Award, Users, Trophy, Star, Sparkles, ChevronRight, Phone, Medal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GalleryBanner from "@/components/galleryBanner";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const images = [
    {
      id: 1,
      category: "achievements",
      title: "State Championship Glory",
      description: "Celebrating the top-tier performance at the Chennai Junior League.",
      badge: "Gold Medalist",
      src: "/ach1.jpeg"
    },
    {
      id: 2,
      category: "students",
      title: "National Pride",
      description: "Our young talent representing the academy at the National School Games.",
      badge: "National Level",
      src: "/ach2.jpeg"
    },
    {
      id: 3,
      category: "achievements",
      title: "International Exposure",
      description: "Competing against global minds at the Junior International Open.",
      badge: "Global Ranker",
      src: "/ach3.jpeg"
    },
    {
      id: 4,
      category: "academy",
      title: "Focused Strategy Sessions",
      description: "Intense practice rounds at the KPR Academy Mylapore branch.",
      badge: "Masterclass",
      src: "/ach4.jpeg"
    },
    {
      id: 5,
      category: "students",
      title: "Future Grandmasters",
      description: "Recognizing promising talent during our annual talent hunt ceremony.",
      badge: "Rising Star",
      src: "/ach5.jpeg"
    },
  ];

  const filters = [
    { id: "all", label: "All Moments", icon: Camera },
    { id: "achievements", label: "Champions", icon: Trophy },
    { id: "students", label: "Students", icon: Users },
    { id: "academy", label: "Academy Life", icon: Star },
  ];

  const filteredImages = activeFilter === "all" ? images : images.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <GalleryBanner />

      {/* ── GALLERY SECTION ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* CENTERED HEADING UI */}
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7A0C0C]/10 border border-[#7A0C0C]/20 shadow-sm">
              <Camera size={14} className="text-[#7A0C0C]" />
              <span className="text-[10px] font-black text-[#7A0C0C] uppercase tracking-widest">Our Visual Journey</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                Captured
              </h2>
              <div className="inline-block bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/25 px-6 md:px-10 py-2.5 md:py-4 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-red-950/15">
                <span className="text-3xl lg:text-5xl font-black tracking-tighter leading-none">
                  Moments
                </span>
              </div>
            </div>
            <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-lg">
              Explore the highlights of our tournaments, student achievements, and the daily life at KPR Chess Academy.
            </p>
          </div>

          {/* Filter Buttons - Pill Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-black transition-all duration-300 text-[10px] uppercase tracking-widest border-2 ${
                  activeFilter === filter.id
                    ? "bg-[#7A0C0C] text-[#FFB800] border-[#FFB800]/20 shadow-xl"
                    : "bg-white text-slate-500 border-slate-100 hover:border-[#7A0C0C] hover:text-[#7A0C0C]"
                }`}
              >
                <filter.icon size={14} />
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid - Responsive Columns */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Card className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                      <Image 
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay - High Contrast White Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 md:p-10 flex flex-col justify-end">
                        <div className="bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 text-[9px] font-black px-4 py-1.5 rounded-full inline-block mb-4 w-fit shadow-lg">
                          {image.badge}
                        </div>
                        <h3 className="text-white text-xl md:text-2xl font-black mb-2 tracking-tight leading-tight">{image.title}</h3>
                        <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed line-clamp-2">{image.description}</p>
                      </div>

                      {/* Top floating category badge */}
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                        {image.category}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { number: "250+", label: "Tournament Medals", icon: Trophy },
              { number: "50+", label: "National Players", icon: Medal },
              { number: "1000+", label: "Students in Chennai", icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-[#7A0C0C] border border-[#FFB800]/20 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-red-950/20">
                  <stat.icon size={32} className="text-[#FFB800]" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{stat.number}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-lg w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent p-10 flex flex-col justify-end" />
              <div className="absolute bottom-10 left-10 right-10 z-10">
                <div className="bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 text-xs font-black px-6 py-2 rounded-full mb-4 shadow-lg w-fit">
                  {selectedImage.badge}
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-black mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">{selectedImage.description}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/50 hover:bg-[#7A0C0C] text-white hover:text-[#FFB800] p-4 rounded-full transition-all backdrop-blur-md z-20"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FINAL CTA PILL ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-[#0B0202] rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-red-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[#FFB800]/5 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles size={16} className="text-[#FFB800]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Start Your Success Story</span>
            </div>

            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-none">
              MASTER THE ART OF <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#FFB800] to-amber-200 bg-clip-text text-transparent italic">STRATEGY.</span>
            </h2>

            <p className="max-w-2xl text-slate-400 font-medium text-sm md:text-lg leading-relaxed">
              Join KPR Chess Academy and begin your journey from foundational moves to tournament excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center pt-4 w-full justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button className="w-full bg-[#7A0C0C] hover:bg-[#5E0909] text-[#FFB800] border border-[#FFB800]/20 px-12 py-7 rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-xl shadow-red-950/20 transition-all active:scale-95 group">
                  BOOK FREE CONSULTATION
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}