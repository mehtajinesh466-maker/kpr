"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChevronRight, Calculator, RefreshCw, BarChart2, Award, ArrowLeftRight, Home } from "lucide-react";

const CALC_LINKS = [
  { href: "/calculators/elo-rating-change", label: "Elo Change", icon: RefreshCw },
  { href: "/calculators/expected-score", label: "Expected Score", icon: BarChart2 },
  { href: "/calculators/rating-performance", label: "Performance (TPR)", icon: Calculator },
  { href: "/calculators/title-norm", label: "Title Norms", icon: Award },
  { href: "/calculators/national-converter", label: "Rating Converter", icon: ArrowLeftRight },
];

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to determine active link styling
  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  // Extract name for breadcrumbs
  const getBreadcrumbName = () => {
    if (pathname === "/calculators") return "";
    const active = CALC_LINKS.find((link) => link.href === pathname);
    return active ? active.label : "";
  };

  const currentLabel = getBreadcrumbName();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Site Header */}
      <Navbar />

      {/* Title Subheader Banner */}
      <section className="relative min-h-[20vh] flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden py-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200')] bg-cover bg-center" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>Calculators Suite</span>
          </div>
          <h1 className="text-3xl font-black md:text-4xl text-white tracking-tight">
            Chess Rating Calculators
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl font-light">
            Compute rating adjustments, tournament performance stats, title norms, and conversions.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 bg-white px-4 py-2.5 rounded-xl border border-gray-200/50 shadow-sm w-fit">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/calculators" className="hover:text-blue-600 transition-colors">
            Calculators
          </Link>
          {currentLabel && (
            <>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="font-semibold text-gray-800">{currentLabel}</span>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-gray-200/80 shadow-md rounded-2xl p-4 sticky top-28">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
                Calculators Menu
              </div>
              <nav className="space-y-1.5">
                <Link
                  href="/calculators"
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    pathname === "/calculators"
                      ? "bg-slate-100 text-slate-900 border border-slate-200"
                      : "text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Calculator className="w-4 h-4 shrink-0" />
                  <span>Suite Overview</span>
                </Link>
                <div className="h-px bg-gray-100 my-2" />
                {CALC_LINKS.map((link) => {
                  const Icon = link.icon;
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25 border border-transparent"
                          : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-700"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        active ? "text-white" : "text-gray-400 group-hover:text-blue-500"
                      }`} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Calculator Content Workspace */}
          <section className="lg:col-span-9">
            {children}
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
