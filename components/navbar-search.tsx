"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error("Autocomplete fetch error: ", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[150px] sm:max-w-[180px] lg:max-w-[220px]">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search articles..."
          className="w-full pl-9 pr-8 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-full text-slate-800 dark:text-slate-200 text-xs transition-all"
        />
        <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        {loading && (
          <Loader2 className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-400 animate-spin" />
        )}
      </form>

      {/* Autocomplete dropdown overlay */}
      {showDropdown && (query.trim().length > 0) && (
        <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-2 z-50 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
            Predictions
          </div>
          {results.length > 0 ? (
            <div className="mt-1 divide-y divide-slate-50 dark:divide-slate-800 max-h-64 overflow-y-auto">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  onClick={() => {
                    setShowDropdown(false);
                    setQuery("");
                  }}
                  className="flex flex-col gap-0.5 px-3 py-2 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 rounded-lg transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">
                    {item.excerpt || "ChessEasy Tutorial"}
                  </span>
                </Link>
              ))}
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 rounded-lg transition-colors text-left"
              >
                <span>View all matching articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !loading ? (
            <div className="px-3 py-4 text-center text-xs text-slate-400">
              No articles found
            </div>
          ) : (
            <div className="px-3 py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
              Searching...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
