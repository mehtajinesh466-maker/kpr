import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, MessageSquare, ExternalLink, ShieldAlert } from "lucide-react";
import LogoutButton from "./logout-button";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const password = cookieStore.get("admin-password")?.value;
  const actualPassword = process.env.ADMIN_PASSWORD || "chesseasy-admin";

  // Check login cookies. If mismatch, redirect immediately
  if (password !== actualPassword) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black tracking-tight text-sm uppercase">Chesseasy CMS</span>
            <span className="text-[10px] text-slate-400 block font-semibold">Console Control Center</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <Link href="/blog" target="_blank" className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors">
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Exit Admin
          </Link>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between shrink-0 p-4">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3">Management</span>
              <nav className="space-y-1">
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white text-xs font-bold transition-all"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Posts Directory</span>
                </Link>
                <Link
                  href="/admin/comments"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Comments Queue</span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <LogoutButton />
          </div>
        </aside>

        {/* Workspace panel content */}
        <section className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </section>
      </div>
    </div>
  );
}
