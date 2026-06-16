"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, BarChart2, Calculator, Award, ArrowLeftRight, HelpCircle } from "lucide-react";

const CALCS = [
  {
    href: "/calculators/elo-rating-change",
    title: "FIDE Elo Rating Change",
    description: "Calculate your Elo adjustments following individual matches or entire tournaments using custom K-factors.",
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-50 hover:bg-blue-100/70 border-blue-100",
    badge: "Most Popular"
  },
  {
    href: "/calculators/expected-score",
    title: "Expected Score Calculator",
    description: "Determine the statistical win, draw, and loss expectancy rates between two players based on Elo ratings.",
    icon: BarChart2,
    color: "text-emerald-500",
    bg: "bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100",
  },
  {
    href: "/calculators/rating-performance",
    title: "Rating Performance (TPR)",
    description: "Compute your Tournament Performance Rating (TPR) from average opponent Elo and scoring outcomes.",
    icon: Calculator,
    color: "text-purple-500",
    bg: "bg-purple-50 hover:bg-purple-100/70 border-purple-100",
  },
  {
    href: "/calculators/title-norm",
    title: "FIDE Title Norm Calculator",
    description: "Check qualification thresholds for Grandmaster (GM), International Master (IM), WGM, and WIM norms.",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-50 hover:bg-amber-100/70 border-amber-100",
  },
  {
    href: "/calculators/national-converter",
    title: "National ELO Converter",
    description: "Convert national federation ratings (USCF, CFC, ECF, DWZ) back and forth into estimated FIDE equivalents.",
    icon: ArrowLeftRight,
    color: "text-red-500",
    bg: "bg-red-50 hover:bg-red-100/70 border-red-100",
  }
];

export default function CalculatorsSuiteOverviewPage() {
  return (
    <div className="space-y-10">
      {/* Overview Intro */}
      <div className="bg-white border border-gray-200/80 shadow-md p-6 rounded-2xl space-y-4">
        <h2 className="text-xl md:text-2xl font-black text-gray-900">
          Professional Chess Mathematics Made Simple
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Welcome to the Chesseasy Academy rating suite. Whether you are an aspiring master looking to calculate Title Norm thresholds, a coach checking rating conversion values, or a player analyzing expected scores against a field of tournament opponents, our client-side tools run instant calculations in compliance with FIDE guidelines.
        </p>
      </div>

      {/* Grid of calculators */}
      <div className="grid md:grid-cols-2 gap-6">
        {CALCS.map((calc) => {
          const Icon = calc.icon;
          return (
            <Card key={calc.href} className={`border transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl flex flex-col justify-between ${calc.bg}`}>
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl bg-white shadow-sm border ${calc.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {calc.badge && (
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {calc.badge}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 mt-4">{calc.title}</CardTitle>
                <CardDescription className="text-gray-600 text-xs mt-1 leading-relaxed">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-2">
                <Link href={calc.href} className="w-fit block">
                  <Button variant="ghost" className="text-xs font-bold p-0 text-slate-800 hover:text-blue-600 hover:bg-transparent flex items-center gap-1 group">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQs Panel */}
      <Card className="border border-gray-200/80 shadow-md rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Rating Calculations FAQs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 divide-y divide-gray-100 text-sm text-gray-700">
          <div className="py-4 first:pt-0">
            <h4 className="font-bold text-gray-900 mb-1">What is a K-factor in Elo rating changes?</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              The K-factor represents the maximum rating points a player can gain or lose from a single game. FIDE uses K=40 for new rating entries and junior players under 2300 ELO, K=20 for standard active ratings under 2400 ELO, and K=10 for master levels once they pass 2400.
            </p>
          </div>
          <div className="py-4">
            <h4 className="font-bold text-gray-900 mb-1">How is Tournament Performance Rating (TPR) calculated?</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              TPR is computed by taking the average Elo rating of your tournament opponents and adding/subtracting a rating difference ($d_p$) looked up from the official FIDE tables based on your overall scoring percentage. A 50% score results in a TPR equal to your opponents' average rating.
            </p>
          </div>
          <div className="py-4 last:pb-0">
            <h4 className="font-bold text-gray-900 mb-1">Are these calculators FIDE compliant?</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              Yes, all rating performance, rating change, and expectancy score algorithms follow standard formulas and tables outlined in FIDE handbook regulations (Title Regulations and Rating Regulations Section 8).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
