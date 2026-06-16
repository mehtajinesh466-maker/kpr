"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Trophy, Award, Users, Target, Calendar, Star, Heart, BookOpen, Lightbulb, Eye, Brain, GraduationCap, Crown, Zap, Check, Sparkles, Phone } from "lucide-react"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import AboutBanner from "@/components/aboutBanner"
import { AboutUs } from "@/components/aboutsection"
import { MissionVision } from "@/components/mission"
import { FounderSection } from "@/components/founder"
import { CoachesSection } from "@/components/coaches"
import { WhyChessMatters } from "@/components/benefit"
import { TrainingMethodology } from "@/components/mathod"
import { AboutCTA } from "@/components/aboutcta"

// Enhanced animation components
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

const StaggerChildren = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}




export default function AboutPage() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-x-hidden">
      <Navbar />

      <AboutBanner/>
      <AboutUs/>
      <MissionVision/>
      <FounderSection/>
      <CoachesSection/>
      <WhyChessMatters/>
      <TrainingMethodology/>
      <AboutCTA/>

      <Footer />
    </div>
  )
}