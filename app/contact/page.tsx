// FULL UPDATED CONTACT PAGE WITH FORMEE + FAQ + ALL COMPONENTS
"use client";
import type React from "react";
import { useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageSquare,
  Send,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ContactBanner from "@/components/contactBanner";
import { FAQ } from "@/components/faq";
import { ContactSection } from "@/components/contact";
import { CompactCTA } from "@/components/contactcta";

/* PARTICLE BACKGROUND */







/* CONTACT PAGE */
export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState(null);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full">
      <Navbar />

     <ContactBanner/>

      <ContactSection/>

      <FAQ/>
      <CompactCTA/>

      <Footer />
    </div>
  );
}
