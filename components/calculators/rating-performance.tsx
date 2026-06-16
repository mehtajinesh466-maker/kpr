"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Plus, Trash2, Share2, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface PerformanceGame {
  id: string;
  opponentElo: number;
  result: number; // 1 = win, 0.5 = draw, 0 = loss
}

// FIDE Table 8.1a - p to dp lookup table
const fideTable: { [key: number]: number } = {
  0.50: 0,   0.51: 7,   0.52: 15,  0.53: 22,  0.54: 29,  0.55: 36,  0.56: 43,  0.57: 50,  0.58: 57,  0.59: 65,
  0.60: 72,  0.61: 80,  0.62: 87,  0.63: 95,  0.64: 102, 0.65: 110, 0.66: 117, 0.67: 125, 0.68: 133, 0.69: 141,
  0.70: 149, 0.71: 158, 0.72: 166, 0.73: 175, 0.74: 184, 0.75: 193, 0.76: 202, 0.77: 211, 0.78: 220, 0.79: 230,
  0.80: 240, 0.81: 251, 0.82: 262, 0.83: 273, 0.84: 284, 0.85: 296, 0.86: 309, 0.87: 322, 0.88: 336, 0.89: 351,
  0.90: 366, 0.91: 383, 0.92: 401, 0.93: 422, 0.94: 444, 0.95: 470, 0.96: 501, 0.97: 538, 0.98: 589, 0.99: 677,
  1.00: 800
};

// Helper to look up rating difference based on percentage score (p)
export function getRatingDifference(p: number): number {
  const roundedP = Math.max(0, Math.min(1, parseFloat(p.toFixed(2))));
  if (roundedP === 0.5) return 0;
  if (roundedP > 0.5) {
    return fideTable[roundedP] ?? 0;
  } else {
    // For p < 0.5, lookup (1-p) and return negative
    const inverseP = parseFloat((1 - roundedP).toFixed(2));
    const val = fideTable[inverseP] ?? 0;
    return -val;
  }
}

function RatingPerformanceCalculatorComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Summary Mode fields
  const [avgOppRating, setAvgOppRating] = useState<number>(2000);
  const [totalGames, setTotalGames] = useState<number>(9);
  const [pointsScored, setPointsScored] = useState<number>(6);

  // Advanced Mode fields
  const [games, setGames] = useState<PerformanceGame[]>([
    { id: "1", opponentElo: 2100, result: 1 },
    { id: "2", opponentElo: 1950, result: 0.5 },
    { id: "3", opponentElo: 2000, result: 0.5 },
    { id: "4", opponentElo: 2050, result: 1 }
  ]);

  // Sync state from query parameters on mount
  useEffect(() => {
    const mode = searchParams.get("mode");
    const avg = searchParams.get("avg");
    const n = searchParams.get("n");
    const w = searchParams.get("w");
    const encodedGames = searchParams.get("games");

    if (mode === "advanced") {
      setIsAdvancedMode(true);
      if (encodedGames) {
        try {
          const decoded = JSON.parse(decodeURIComponent(encodedGames)) as { opponentElo: number; result: number }[];
          setGames(
            decoded.map((g, idx) => ({
              id: idx.toString(),
              opponentElo: Math.max(100, Math.min(3000, g.opponentElo)),
              result: [0, 0.5, 1].includes(g.result) ? g.result : 0.5
            }))
          );
        } catch (e) {
          console.error("Failed to decode games parameter", e);
        }
      }
    } else {
      setIsAdvancedMode(false);
      if (avg) {
        const parsed = parseInt(avg);
        if (parsed >= 100 && parsed <= 3000) setAvgOppRating(parsed);
      }
      if (n) {
        const parsed = parseInt(n);
        if (parsed >= 1 && parsed <= 100) setTotalGames(parsed);
      }
      if (w) {
        const parsed = parseFloat(w);
        if (parsed >= 0 && parsed <= 100) setPointsScored(parsed);
      }
    }
  }, [searchParams]);

  // Update query parameters when state changes
  const updateQueryParams = (
    adv: boolean,
    newAvg: number,
    newN: number,
    newW: number,
    newGames: PerformanceGame[]
  ) => {
    const params = new URLSearchParams();
    params.set("mode", adv ? "advanced" : "summary");

    if (adv) {
      const compactGames = newGames.map((g) => ({
        opponentElo: g.opponentElo,
        result: g.result
      }));
      params.set("games", encodeURIComponent(JSON.stringify(compactGames)));
    } else {
      params.set("avg", newAvg.toString());
      params.set("n", newN.toString());
      params.set("w", newW.toString());
    }

    router.replace(`/calculators/rating-performance?${params.toString()}`, { scroll: false });
  };

  const handleModeChange = (adv: boolean) => {
    setIsAdvancedMode(adv);
    updateQueryParams(adv, avgOppRating, totalGames, pointsScored, games);
  };

  const handleAvgRatingChange = (val: string) => {
    const num = parseInt(val) || 0;
    setAvgOppRating(num);
    updateQueryParams(false, num, totalGames, pointsScored, games);
  };

  const handleTotalGamesChange = (val: string) => {
    const num = parseInt(val) || 0;
    setTotalGames(num);
    // Ensure points scored doesn't exceed total games
    const pts = Math.min(pointsScored, num);
    setPointsScored(pts);
    updateQueryParams(false, avgOppRating, num, pts, games);
  };

  const handlePointsScoredChange = (val: string) => {
    const num = parseFloat(val) || 0;
    setPointsScored(num);
    updateQueryParams(false, avgOppRating, totalGames, num, games);
  };

  // Advanced Mode list modification
  const handleGameEloChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    const updated = games.map((g) => (g.id === id ? { ...g, opponentElo: num } : g));
    setGames(updated);
    updateQueryParams(true, avgOppRating, totalGames, pointsScored, updated);
  };

  const handleGameResultChange = (id: string, val: number) => {
    const updated = games.map((g) => (g.id === id ? { ...g, result: val } : g));
    setGames(updated);
    updateQueryParams(true, avgOppRating, totalGames, pointsScored, updated);
  };

  const addGameRow = () => {
    const nextId = (games.length + 1).toString();
    const lastElo = games[games.length - 1]?.opponentElo ?? 2000;
    const updated = [...games, { id: nextId, opponentElo: lastElo, result: 0.5 }];
    setGames(updated);
    updateQueryParams(true, avgOppRating, totalGames, pointsScored, updated);
  };

  const deleteGameRow = (id: string) => {
    if (games.length <= 1) {
      toast.error("You must have at least one game.");
      return;
    }
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    updateQueryParams(true, avgOppRating, totalGames, pointsScored, updated);
  };

  const resetCalculator = () => {
    setAvgOppRating(2000);
    setTotalGames(9);
    setPointsScored(6);
    setGames([
      { id: "1", opponentElo: 2100, result: 1 },
      { id: "2", opponentElo: 1950, result: 0.5 },
      { id: "3", opponentElo: 2000, result: 0.5 },
      { id: "4", opponentElo: 2050, result: 1 }
    ]);
    setIsAdvancedMode(false);
    router.replace(`/calculators/rating-performance`, { scroll: false });
    toast.success("Calculator state reset.");
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Calculator URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Perform Calculations
  let displayAvgRating = avgOppRating;
  let displayTotalGames = totalGames;
  let displayPointsScored = pointsScored;
  let isValid = true;

  if (isAdvancedMode) {
    const validGames = games.filter((g) => g.opponentElo >= 100 && g.opponentElo <= 3000);
    if (validGames.length > 0) {
      const sumElo = validGames.reduce((sum, g) => sum + g.opponentElo, 0);
      displayAvgRating = Math.round(sumElo / validGames.length);
      displayTotalGames = validGames.length;
      displayPointsScored = validGames.reduce((sum, g) => sum + g.result, 0);
    } else {
      isValid = false;
    }
  } else {
    isValid =
      avgOppRating >= 100 &&
      avgOppRating <= 3000 &&
      totalGames >= 1 &&
      totalGames <= 100 &&
      pointsScored >= 0 &&
      pointsScored <= totalGames;
  }

  const percentageScore = displayTotalGames > 0 ? displayPointsScored / displayTotalGames : 0;
  const ratingDiff = getRatingDifference(percentageScore);
  const performanceRating = displayAvgRating + ratingDiff;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Rating Performance Calculator (TPR)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Calculate your Tournament Performance Rating based on FIDE Handbook regulations.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={resetCalculator} className="rounded-full">
            <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
          </Button>
          <Button variant="outline" size="sm" onClick={shareLink} className="rounded-full bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            {copied ? <Check className="w-4 h-4 mr-1.5 text-green-600" /> : <Share2 className="w-4 h-4 mr-1.5" />}
            Share Inputs
          </Button>
        </div>
      </div>

      {/* Editor & Results Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Setup Parameters Card */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-gray-200/80 shadow-md rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">Tournament Parameters</CardTitle>
                <div className="flex bg-white/10 rounded-lg p-0.5 border border-white/10">
                  <button
                    onClick={() => handleModeChange(false)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      !isAdvancedMode ? "bg-white text-slate-900 shadow-sm" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Summary Stats
                  </button>
                  <button
                    onClick={() => handleModeChange(true)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      isAdvancedMode ? "bg-white text-slate-900 shadow-sm" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Individual Games
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Summary Mode Form */}
              {!isAdvancedMode && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="avg-opp-rating" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Avg Opponent Rating
                    </Label>
                    <Input
                      id="avg-opp-rating"
                      type="number"
                      min="100"
                      max="3000"
                      value={avgOppRating || ""}
                      onChange={(e) => handleAvgRatingChange(e.target.value)}
                      className="rounded-xl border-gray-200"
                    />
                    {(avgOppRating < 100 || avgOppRating > 3000) && avgOppRating !== 0 && (
                      <p className="text-[10px] text-red-500 font-medium">Rating must be 100-3000.</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total-games" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Total Games Play
                    </Label>
                    <Input
                      id="total-games"
                      type="number"
                      min="1"
                      value={totalGames || ""}
                      onChange={(e) => handleTotalGamesChange(e.target.value)}
                      className="rounded-xl border-gray-200"
                    />
                    {totalGames < 1 && totalGames !== 0 && (
                      <p className="text-[10px] text-red-500 font-medium">Games must be &gt;= 1.</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="points-scored" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Score Achieved
                    </Label>
                    <Input
                      id="points-scored"
                      type="number"
                      step="0.5"
                      min="0"
                      max={totalGames}
                      value={pointsScored === 0 ? "0" : pointsScored || ""}
                      onChange={(e) => handlePointsScoredChange(e.target.value)}
                      className="rounded-xl border-gray-200"
                    />
                    {pointsScored > totalGames && (
                      <p className="text-[10px] text-red-500 font-medium">Cannot exceed game total.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Advanced Game-By-Game List Mode */}
              {isAdvancedMode && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-gray-900">Game Logs</h4>
                    <Button type="button" variant="outline" size="sm" onClick={addGameRow} className="text-blue-600 hover:text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-lg">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Round
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {games.map((game, index) => (
                      <div key={game.id} className="flex gap-3 items-end bg-gray-50 border border-gray-200/50 p-3 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs shrink-0 text-slate-600 mb-1">
                          #{index + 1}
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor={`game-performance-opp-${game.id}`} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Opponent Rating
                            </Label>
                            <Input
                              id={`game-performance-opp-${game.id}`}
                              type="number"
                              min="100"
                              max="3000"
                              value={game.opponentElo || ""}
                              onChange={(e) => handleGameEloChange(game.id, e.target.value)}
                              className="rounded-lg h-9 border-gray-200 bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Result
                            </Label>
                            <div className="grid grid-cols-3 gap-1 bg-white border border-gray-200 rounded-lg p-0.5 h-9">
                              <button
                                type="button"
                                onClick={() => handleGameResultChange(game.id, 1)}
                                className={`text-[10px] font-bold rounded-md transition-all ${
                                  game.result === 1 ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"
                                }`}
                              >
                                Win
                              </button>
                              <button
                                type="button"
                                onClick={() => handleGameResultChange(game.id, 0.5)}
                                className={`text-[10px] font-bold rounded-md transition-all ${
                                  game.result === 0.5 ? "bg-amber-100 text-amber-700" : "text-gray-500 hover:bg-gray-100"
                                }`}
                              >
                                Draw
                              </button>
                              <button
                                type="button"
                                onClick={() => handleGameResultChange(game.id, 0)}
                                className={`text-[10px] font-bold rounded-md transition-all ${
                                  game.result === 0 ? "bg-red-100 text-red-700" : "text-gray-500 hover:bg-gray-100"
                                }`}
                              >
                                Loss
                              </button>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteGameRow(game.id)}
                          className="h-9 w-9 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                          disabled={games.length <= 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-gray-200 shadow-md rounded-2xl bg-[#0F172A] text-white">
            <CardHeader className="bg-slate-900 border-b border-slate-800 p-5">
              <CardTitle className="text-lg font-bold text-slate-100">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Output metric blocks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/60 border border-slate-700/40 p-4 rounded-xl text-center">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Rating Difference (dp)
                  </div>
                  <div className={`text-2xl md:text-3xl font-black ${
                    ratingDiff > 0 ? "text-green-400" : ratingDiff < 0 ? "text-red-400" : "text-gray-400"
                  }`}>
                    {ratingDiff >= 0 ? "+" : ""}{ratingDiff}
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/40 p-4 rounded-xl text-center">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Performance ELO (TPR)
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-blue-400">
                    {isNaN(performanceRating) || !isValid ? "-" : performanceRating}
                  </div>
                </div>
              </div>

              {/* Expectations details */}
              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                <h4 className="font-bold text-slate-300">Tournament Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Average Opponent ELO:</span>
                    <span className="font-semibold text-slate-200">{displayAvgRating}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Score percentage:</span>
                    <span className="font-semibold text-slate-200">
                      {(percentageScore * 100).toFixed(1)}% ({displayPointsScored} / {displayTotalGames})
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Methodology Section */}
      <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
          <CardTitle className="text-lg font-bold text-gray-900">TPR FIDE Rule Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
  {"The FIDE Tournament Performance Rating ($Ru$) is computed based on the FIDE Rating Regulations (Section 8.1). It combines the average rating of opponents ($R_a$) with a rating difference ($d_p$) looked up from the official FIDE table based on your score percentage ($p = \\text{Score} / \\text{Games}$):"}
</p>
          <div className="my-4 p-4 bg-slate-50 border border-gray-100 rounded-xl text-center font-mono text-gray-900">
            $$Ru = R_a + d_p$$
          </div>
          <p>
            If a player scores 50% ($p = 0.50$), $d_p = 0$, meaning the performance rating is exactly equal to the average opponent rating. Perfect scores (100%) or zero scores (0%) are capped to a maximum difference of $+800$ or $-800$ ELO respectively, according to standard lookup estimations.
          </p>
          {isValid && (
            <div className="space-y-2 bg-blue-50/50 border border-blue-100 p-4 rounded-xl font-mono text-xs text-slate-800 mt-4">
              <div>1. Average Rating ($R_a$): {displayAvgRating} ELO</div>
              <div>2. Score Percentage: {displayPointsScored} / {displayTotalGames} = {percentageScore.toFixed(4)} ({(percentageScore * 100).toFixed(1)}%)</div>
              <div>3. FIDE Table Difference ($d_p$): {ratingDiff >= 0 ? "+" : ""}{ratingDiff} ELO</div>
              <div className="font-bold text-blue-900">4. Performance Rating: {displayAvgRating} + ({ratingDiff}) = {performanceRating} ELO</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function RatingPerformanceCalculator() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading calculator configurations...</p>
      </div>
    }>
      <RatingPerformanceCalculatorComponent />
    </Suspense>
  );
}
