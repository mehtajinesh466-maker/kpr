"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check, Share2, Info, RotateCcw } from "lucide-react";
import { toast } from "sonner";

function ExpectedScoreCalculatorComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [rating1, setRating1] = useState<number>(2000);
  const [rating2, setRating2] = useState<number>(1800);
  const [numGames, setNumGames] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Parse state from URL search params on mount
  useEffect(() => {
    const r1 = searchParams.get("r1");
    const r2 = searchParams.get("r2");
    const games = searchParams.get("games");

    if (r1) {
      const parsed = parseInt(r1);
      if (parsed >= 100 && parsed <= 3000) setRating1(parsed);
    }
    if (r2) {
      const parsed = parseInt(r2);
      if (parsed >= 100 && parsed <= 3000) setRating2(parsed);
    }
    if (games) {
      const parsed = parseInt(games);
      if (parsed >= 1 && parsed <= 100) setNumGames(parsed);
    }
  }, [searchParams]);

  // Sync state back to URL query parameters
  const updateQueryParams = (r1: number, r2: number, g: number) => {
    const params = new URLSearchParams();
    params.set("r1", r1.toString());
    params.set("r2", r2.toString());
    params.set("games", g.toString());
    router.replace(`/calculators/expected-score?${params.toString()}`, { scroll: false });
  };

  const handleRating1Change = (val: string) => {
    const num = parseInt(val) || 0;
    setRating1(num);
    updateQueryParams(num, rating2, numGames);
  };

  const handleRating1Slider = (vals: number[]) => {
    const num = vals[0] || 100;
    setRating1(num);
    updateQueryParams(num, rating2, numGames);
  };

  const handleRating2Change = (val: string) => {
    const num = parseInt(val) || 0;
    setRating2(num);
    updateQueryParams(rating1, num, numGames);
  };

  const handleRating2Slider = (vals: number[]) => {
    const num = vals[0] || 100;
    setRating2(num);
    updateQueryParams(rating1, num, numGames);
  };

  const handleGamesChange = (val: string) => {
    const num = parseInt(val) || 1;
    setNumGames(num);
    updateQueryParams(rating1, rating2, num);
  };

  const resetCalculator = () => {
    setRating1(2000);
    setRating2(1800);
    setNumGames(1);
    router.replace(`/calculators/expected-score`, { scroll: false });
    toast.success("Calculator state reset.");
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Calculator URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const isRating1Valid = rating1 >= 100 && rating1 <= 3000;
  const isRating2Valid = rating2 >= 100 && rating2 <= 3000;
  const isGamesValid = numGames >= 1 && numGames <= 100;

  const diff = rating2 - rating1;
  const expectedScore1 = 1 / (1 + Math.pow(10, diff / 400));
  const expectedScore2 = 1 - expectedScore1;

  const expectedPoints1 = expectedScore1 * numGames;
  const expectedPoints2 = expectedScore2 * numGames;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Expected Score Calculator
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Determine the expected score percentage and points between two players.
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
        {/* Input Parameters Card */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-gray-200/80 shadow-md rounded-2xl bg-white">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-5">
              <CardTitle className="text-lg font-bold">Player Ratings Setup</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Player 1 Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="rating-1" className="text-sm font-semibold text-gray-700">
                    Player 1 Rating
                  </Label>
                  <Input
                    id="rating-1"
                    type="number"
                    min="100"
                    max="3000"
                    value={rating1 || ""}
                    onChange={(e) => handleRating1Change(e.target.value)}
                    className="w-24 text-right rounded-lg h-8 border-gray-200"
                  />
                </div>
                <Slider
                  min={100}
                  max={3000}
                  step={10}
                  value={[rating1]}
                  onValueChange={handleRating1Slider}
                  className="py-1 cursor-pointer"
                />
                {!isRating1Valid && rating1 !== 0 && (
                  <p className="text-xs text-red-500 font-medium">Please enter a rating between 100 and 3000.</p>
                )}
              </div>

              {/* Player 2 Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="rating-2" className="text-sm font-semibold text-gray-700">
                    Player 2 Rating
                  </Label>
                  <Input
                    id="rating-2"
                    type="number"
                    min="100"
                    max="3000"
                    value={rating2 || ""}
                    onChange={(e) => handleRating2Change(e.target.value)}
                    className="w-24 text-right rounded-lg h-8 border-gray-200"
                  />
                </div>
                <Slider
                  min={100}
                  max={3000}
                  step={10}
                  value={[rating2]}
                  onValueChange={handleRating2Slider}
                  className="py-1 cursor-pointer"
                />
                {!isRating2Valid && rating2 !== 0 && (
                  <p className="text-xs text-red-500 font-medium">Please enter a rating between 100 and 3000.</p>
                )}
              </div>

              {/* Number of Games Input */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <Label htmlFor="num-games" className="text-sm font-semibold text-gray-700">
                  Number of Games Played
                </Label>
                <Input
                  id="num-games"
                  type="number"
                  min="1"
                  max="100"
                  value={numGames || ""}
                  onChange={(e) => handleGamesChange(e.target.value)}
                  className={`rounded-xl border-gray-200 ${
                    !isGamesValid && numGames !== 0 ? "border-red-500" : ""
                  }`}
                />
                {!isGamesValid && numGames !== 0 && (
                  <p className="text-xs text-red-500 font-medium">Please enter games count between 1 and 100.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-gray-200 shadow-md rounded-2xl bg-[#0F172A] text-white">
            <CardHeader className="bg-slate-900 border-b border-slate-800 p-5">
              <CardTitle className="text-lg font-bold text-slate-100">Probability Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Head-to-Head Expected Scores */}
              <div className="space-y-5">
                {/* Player 1 Expected */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span>Player 1 ({rating1} ELO)</span>
                    <span>{(expectedScore1 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-200 mb-1">
                    <span>Expected Points:</span>
                    <span className="text-lg text-emerald-400 font-bold">{expectedPoints1.toFixed(2)} / {numGames}</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${expectedScore1 * 100}%` }}
                    />
                  </div>
                </div>

                {/* Player 2 Expected */}
                <div className="space-y-1 pt-2 border-t border-slate-800/40">
                  <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span>Player 2 ({rating2} ELO)</span>
                    <span>{(expectedScore2 * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-200 mb-1">
                    <span>Expected Points:</span>
                    <span className="text-lg text-blue-400 font-bold">{expectedPoints2.toFixed(2)} / {numGames}</span>
                  </div>
                  <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${expectedScore2 * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rating Spread Metrics */}
              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Rating Spread ($D_r$):</span>
                  <span className="font-bold text-slate-200">
                    {Math.abs(rating1 - rating2)} points {rating1 > rating2 ? "(Player 1 favored)" : rating2 > rating1 ? "(Player 2 favored)" : "(Even Match)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Win Expectancy Spread:</span>
                  <span className="font-bold text-slate-200">
                    {(Math.abs(expectedScore1 - expectedScore2) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Methodology Section */}
      <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
          <CardTitle className="text-lg font-bold text-gray-900">Mathematical Model & Interpretation</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
         <p>
  Expected score probability is modeled by the logistic distribution curves configured in standard FIDE handbook rules.
  The difference in ratings (Dr = R2 - R1) determines the winning expectation of Player 1 (P1) and Player 2 (P2):
</p>
          <div className="my-4 p-4 bg-slate-50 border border-gray-100 rounded-xl text-center font-mono text-gray-900">
            {"$$P_1 = \\frac{1}{1 + 10^{(R_2 - R_1)/400}}$$"}
          </div>
          <p>
            The sum of expectations is always equal to 1.0 (or 100%). Over a series of $N$ games, the cumulative expected score is calculated by multiplying the single game probability by the total game count:
          </p>
          <div className="my-4 p-4 bg-slate-50 border border-gray-100 rounded-xl text-center font-mono text-gray-900">
            {"$$\\text{Expected Points} = N \\times P$$"}
          </div>
          <p className="font-semibold text-gray-900 mt-4">For the values entered above:</p>
          <div className="space-y-2 bg-blue-50/50 border border-blue-100 p-4 rounded-xl font-mono text-xs text-slate-800">
            <div>1. Rating Difference ($D_r$): {rating2} - {rating1} = {rating2 - rating1} ELO</div>
            <div>2. Player 1 ($R={rating1}$) Win Expectancy:</div>
            <div className="pl-4">{"P1 = 1 / (1 + 10^("}{rating2 - rating1}{" / 400))"}</div>
            <div className="pl-4">{"P1 = 1 / (1 + 10^("}{((rating2 - rating1) / 400).toFixed(4)}{")) = "}{expectedScore1.toFixed(4)}{" ("}{(expectedScore1 * 100).toFixed(2)}{"%)"}</div>
            <div>3. Expected Score over {numGames} games:</div>
            <div className="pl-4">Player 1: {numGames} games * {expectedScore1.toFixed(4)} = {expectedPoints1.toFixed(2)} points</div>
            <div className="pl-4">Player 2: {numGames} games * {expectedScore2.toFixed(4)} = {expectedPoints2.toFixed(2)} points</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ExpectedScoreCalculator() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading calculator configurations...</p>
      </div>
    }>
      <ExpectedScoreCalculatorComponent />
    </Suspense>
  );
}
