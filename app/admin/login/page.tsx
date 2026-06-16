"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShieldAlert, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Set the session cookie
      document.cookie = `admin-password=${password}; path=/; max-age=86400; SameSite=Strict`;
      
      // Navigate to admin home
      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      {/* Background chess board design highlight */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-white rounded-2xl shadow-2xl relative z-10 p-2">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight">Chesseasy Administration</CardTitle>
          <CardDescription className="text-slate-400 text-xs mt-1">
            Access CMS Post Editor dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-pass" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Enter Admin Password
              </Label>
              <Input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="bg-slate-900 border-slate-800 text-white h-10 rounded-xl focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>

            {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-blue-500/10"
            >
              <span>{loading ? "Authenticating..." : "Access Admin Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="h-px bg-slate-800 my-6" />

          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
            <Home className="w-3.5 h-3.5" /> Return to Homepage
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
