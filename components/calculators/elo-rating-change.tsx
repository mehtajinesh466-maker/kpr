"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Plus, Trash2, Share2, Clipboard, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Game {
  id: string;
  opponentElo: number;
  result: number; // 1 = win, 0.5 = draw, 0 = loss
}

function EloChangeCalculatorComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State variables
  const [playerElo, setPlayerElo] = useState<number>(2000);
  const [kFactor, setKFactor] = useState<number>(20);
  const [games, setGames] = useState<Game[]>([
    { id: "1", opponentElo: 1900, result: 1 }
  ]);
  const [singleOpponentElo, setSingleOpponentElo] = useState<number>(1900);
  const [singleResult, setSingleResult] = useState<number>(1);
  const [isMultiGame, setIsMultiGame] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Sync state from query parameters on mount
  useEffect(() => {
    const rating = searchParams.get("rating");
    const k = searchParams.get("k");
    const mode = searchParams.get("mode");
    const opp = searchParams.get("opponent");
    const res = searchParams.get("result");
    const encodedGames = searchParams.get("games");

    if (rating) {
      const parsed = parseInt(rating);
      if (parsed >= 100 && parsed <= 3000) setPlayerElo(parsed);
    }
    if (k) {
      const parsed = parseInt(k);
      if ([10, 20, 40].includes(parsed)) setKFactor(parsed);
    }
    if (mode === "multi") {
      setIsMultiGame(true);
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
      setIsMultiGame(false);
      if (opp) {
        const parsed = parseInt(opp);
        if (parsed >= 100 && parsed <= 3000) setSingleOpponentElo(parsed);
      }
      if (res) {
        const parsed = parseFloat(res);
        if ([0, 0.5, 1].includes(parsed)) setSingleResult(parsed);
      }
    }
  }, [searchParams]);

  // Update query parameters when state changes
  const updateQueryParams = (
    newPlayerElo: number,
    newKFactor: number,
    newMulti: boolean,
    newGames: Game[],
    newSingleElo: number,
    newSingleRes: number
  ) => {
    const params = new URLSearchParams();
    params.set("rating", newPlayerElo.toString());
    params.set("k", newKFactor.toString());
    params.set("mode", newMulti ? "multi" : "single");

    if (newMulti) {
      const compactGames = newGames.map((g) => ({
        opponentElo: g.opponentElo,
        result: g.result
      }));
      params.set("games", encodeURIComponent(JSON.stringify(compactGames)));
    } else {
      params.set("opponent", newSingleElo.toString());
      params.set("result", newSingleRes.toString());
    }

    router.replace(`/calculators/elo-rating-change?${params.toString()}`, { scroll: false });
  };

  const handlePlayerEloChange = (val: string) => {
    const num = parseInt(val) || 0;
    setPlayerElo(num);
    updateQueryParams(num, kFactor, isMultiGame, games, singleOpponentElo, singleResult);
  };

  const handleKFactorChange = (val: string) => {
    const num = parseInt(val) || 20;
    setKFactor(num);
    updateQueryParams(playerElo, num, isMultiGame, games, singleOpponentElo, singleResult);
  };

  const handleModeChange = (multi: boolean) => {
    setIsMultiGame(multi);
    updateQueryParams(playerElo, kFactor, multi, games, singleOpponentElo, singleResult);
  };

  // Single game updates
  const handleSingleEloChange = (val: string) => {
    const num = parseInt(val) || 0;
    setSingleOpponentElo(num);
    updateQueryParams(playerElo, kFactor, false, games, num, singleResult);
  };

  const handleSingleResultChange = (val: string) => {
    const num = parseFloat(val);
    setSingleResult(num);
    updateQueryParams(playerElo, kFactor, false, games, singleOpponentElo, num);
  };

  // Multi game updates
  const handleGameEloChange = (id: string, val: string) => {
    const num = parseInt(val) || 0;
    const updated = games.map((g) => (g.id === id ? { ...g, opponentElo: num } : g));
    setGames(updated);
    updateQueryParams(playerElo, kFactor, true, updated, singleOpponentElo, singleResult);
  };

  const handleGameResultChange = (id: string, val: number) => {
    const updated = games.map((g) => (g.id === id ? { ...g, result: val } : g));
    setGames(updated);
    updateQueryParams(playerElo, kFactor, true, updated, singleOpponentElo, singleResult);
  };

  const addGameRow = () => {
    const nextId = (games.length + 1).toString();
    const lastGameElo = games[games.length - 1]?.opponentElo ?? 1900;
    const updated = [...games, { id: nextId, opponentElo: lastGameElo, result: 0.5 }];
    setGames(updated);
    updateQueryParams(playerElo, kFactor, true, updated, singleOpponentElo, singleResult);
  };

  const deleteGameRow = (id: string) => {
    if (games.length <= 1) {
      toast.error("You must have at least one game row.");
      return;
    }
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    updateQueryParams(playerElo, kFactor, true, updated, singleOpponentElo, singleResult);
  };

  const resetCalculator = () => {
    setPlayerElo(2000);
    setKFactor(20);
    setSingleOpponentElo(1900);
    setSingleResult(1);
    setGames([{ id: "1", opponentElo: 1900, result: 1 }]);
    setIsMultiGame(false);
    router.replace(`/calculators/elo-rating-change`, { scroll: false });
    toast.success("Calculator state reset.");
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Calculator URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Mathematical Calculation Helpers
  const calcExpectedScore = (pElo: number, oElo: number) => {
    const diff = oElo - pElo;
    return 1 / (1 + Math.pow(10, diff / 400));
  };

  // Perform calculations
  const isPlayerEloValid = playerElo >= 100 && playerElo <= 3000;
  const isSingleOppEloValid = singleOpponentElo >= 100 && singleOpponentElo <= 3000;
  const areMultiGamesValid = games.every((g) => g.opponentElo >= 100 && g.opponentElo <= 3000);

  let totalExpected = 0;
  let totalActual = 0;
  let ratingChange = 0;

  if (isPlayerEloValid) {
    if (isMultiGame) {
      if (areMultiGamesValid) {
        games.forEach((game) => {
          const exp = calcExpectedScore(playerElo, game.opponentElo);
          totalExpected += exp;
          totalActual += game.result;
          ratingChange += kFactor * (game.result - exp);
        });
      }
    } else {
      if (isSingleOppEloValid) {
        const exp = calcExpectedScore(playerElo, singleOpponentElo);
        totalExpected = exp;
        totalActual = singleResult;
        ratingChange = kFactor * (singleResult - exp);
      }
    }
  }

  const finalElo = Math.round(playerElo + ratingChange);

  // Suggested K-Factor description helper
  const getKFactorHint = (rating: number) => {
    if (rating < 2300) return "K=40 suggested for juniors (<18 yrs) or new rating entry; K=20 standard.";
    if (rating >= 2400) return "K=10 standard for master levels (once 2400 is reached).";
    return "K=20 standard for players under 2400 ELO.";
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            FIDE ELO Rating Change Calculator
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Calculate your new rating and changes according to standard FIDE rules.
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
        {/* Input parameters panel */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-gray-200/80 shadow-md rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <span>Match Setup</span>
                </CardTitle>
                <div className="flex bg-white/10 rounded-lg p-0.5 border border-white/10">
                  <button
                    onClick={() => handleModeChange(false)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      !isMultiGame ? "bg-white text-slate-900 shadow-sm" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Single Match
                  </button>
                  <button
                    onClick={() => handleModeChange(true)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                      isMultiGame ? "bg-white text-slate-900 shadow-sm" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Tournament (Multi)
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Common Parameters */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="player-elo" className="text-sm font-semibold text-gray-700">
                    Your Current ELO Rating
                  </Label>
                  <Input
                    id="player-elo"
                    type="number"
                    min="100"
                    max="3000"
                    value={playerElo || ""}
                    onChange={(e) => handlePlayerEloChange(e.target.value)}
                    className={`rounded-xl border-gray-200 ${
                      !isPlayerEloValid && playerElo !== 0 ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                  />
                  {!isPlayerEloValid && playerElo !== 0 && (
                    <p className="text-xs text-red-500 font-medium">Please enter a rating between 100 and 3000.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="k-factor" className="text-sm font-semibold text-gray-700">
                    FIDE K-Factor
                  </Label>
                  <Select value={kFactor.toString()} onValueChange={handleKFactorChange}>
                    <SelectTrigger id="k-factor" className="rounded-xl border-gray-200">
                      <SelectValue placeholder="Select K-factor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="40">K = 40 (Juniors, New entry)</SelectItem>
                      <SelectItem value="20">K = 20 (Standard, &lt;2400 ELO)</SelectItem>
                      <SelectItem value="10">K = 10 (Master levels, &gt;2400 ELO)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[11px] text-gray-500 flex items-start gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0 text-blue-500 mt-0.5" />
                    <span>{getKFactorHint(playerElo)}</span>
                  </p>
                </div>
              </div>

              {/* Single Game Form */}
              {!isMultiGame && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-sm text-gray-900">Opponent & Game Outcome</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="opp-elo" className="text-sm font-semibold text-gray-700">
                        Opponent ELO Rating
                      </Label>
                      <Input
                        id="opp-elo"
                        type="number"
                        min="100"
                        max="3000"
                        value={singleOpponentElo || ""}
                        onChange={(e) => handleSingleEloChange(e.target.value)}
                        className={`rounded-xl border-gray-200 ${
                          !isSingleOppEloValid && singleOpponentElo !== 0 ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                      />
                      {!isSingleOppEloValid && singleOpponentElo !== 0 && (
                        <p className="text-xs text-red-500 font-medium">Please enter a rating between 100 and 3000.</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="game-result" className="text-sm font-semibold text-gray-700">
                        Game Result
                      </Label>
                      <Select value={singleResult.toString()} onValueChange={handleSingleResultChange}>
                        <SelectTrigger id="game-result" className="rounded-xl border-gray-200">
                          <SelectValue placeholder="Select Result" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Win (1.0)</SelectItem>
                          <SelectItem value="0.5">Draw (0.5)</SelectItem>
                          <SelectItem value="0">Loss (0.0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-Game Tournament Form */}
              {isMultiGame && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-gray-900">Tournament Opponents & Outcomes</h4>
                    <Button type="button" variant="outline" size="sm" onClick={addGameRow} className="text-blue-600 hover:text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-lg">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Game
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {games.map((game, index) => (
                      <div key={game.id} className="flex gap-3 items-end bg-gray-50/80 border border-gray-200/50 p-3 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs shrink-0 text-slate-600 mb-1">
                          #{index + 1}
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor={`game-opp-${game.id}`} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Opponent Rating
                            </Label>
                            <Input
                              id={`game-opp-${game.id}`}
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
                              Outcome
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
                  {!areMultiGamesValid && (
                    <p className="text-xs text-red-500 font-medium">All opponent ratings must be between 100 and 3000.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-gray-200/80 shadow-md rounded-2xl bg-[#0F172A] text-white overflow-hidden">
            <CardHeader className="bg-slate-900 border-b border-slate-800 p-5">
              <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Calculated Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Output metric blocks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/60 border border-slate-700/40 p-4 rounded-xl text-center">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Rating Change
                  </div>
                  <div className={`text-2xl md:text-3xl font-black ${
                    ratingChange > 0 ? "text-green-400" : ratingChange < 0 ? "text-red-400" : "text-gray-400"
                  }`}>
                    {ratingChange >= 0 ? "+" : ""}{ratingChange.toFixed(2)}
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/40 p-4 rounded-xl text-center">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    New Rating
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-blue-400">
                    {isNaN(finalElo) ? "-" : finalElo}
                  </div>
                </div>
              </div>

              {/* Expectations details */}
              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                <h4 className="font-bold text-slate-300">Expected vs Actual Score</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Games played:</span>
                    <span className="font-semibold text-slate-200">{isMultiGame ? games.length : 1}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Expected score ($P_e$):</span>
                    <span className="font-semibold text-slate-200">{totalExpected.toFixed(3)} pts ({ (totalExpected / (isMultiGame ? games.length : 1) * 100).toFixed(1) }%)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Actual score achieved:</span>
                    <span className="font-semibold text-slate-200">{totalActual.toFixed(1)} pts</span>
                  </div>
                </div>

                {/* Score bar visual */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Expected ({totalExpected.toFixed(1)} pts)</span>
                    <span>Actual ({totalActual.toFixed(1)} pts)</span>
                  </div>
                  <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500/40 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(0, (totalExpected / (isMultiGame ? games.length : 1)) * 100))}%` }}
                    />
                    <div
                      className="absolute left-0 top-0 h-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, (totalActual / (isMultiGame ? games.length : 1)) * 100))}%`,
                        opacity: 0.85
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* FIDE Regulations checklist info */}
              <div className="bg-slate-800/30 border border-slate-800 p-4 rounded-xl text-xs space-y-2 text-slate-400">
                <p className="font-semibold text-slate-300">FIDE Rating Regulations Info:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Ratings are calculated to 2 decimal places and rounded to the nearest integer for publication.</li>
                  <li>In FIDE rules, a rating difference ($D_r$) exceeding 400 is treated as exactly 400 points difference, except for a player's own calculation where only one match in an event can exceed 400. This calculator does not automatically cap difference to 400 to show full math scale.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Step-by-Step Methodology explanation */}
      <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
          <CardTitle className="text-lg font-bold text-gray-900">
            Calculation Methodology & Formula
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            FIDE calculates rating changes using the expected score formula from probability theory. For each opponent, we compute your expected score ($P_e$) which estimates the scoring chance between 0 and 1:
          </p>
          <div className="my-4 p-4 bg-slate-50 border border-gray-100 rounded-xl text-center font-mono text-gray-900">
            {"$$P_e = \\frac{1}{1 + 10^{(R_{opponent} - R_{player})/400}}$$"}
          </div>
          <p>
            Once the expected score is calculated for each game, the rating change ($\Delta R$) is determined by subtracting the expected score from the actual result ($W$, where Win = 1, Draw = 0.5, Loss = 0) and multiplying it by the player's K-factor ($K$):
          </p>
          <div className="my-4 p-4 bg-slate-50 border border-gray-100 rounded-xl text-center font-mono text-gray-900">
            {"$$\\Delta R = K \\times (W - P_e)$$"}
          </div>
          <p className="font-semibold text-gray-900 mt-4">For the values entered above:</p>
          <div className="space-y-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl font-mono text-xs text-slate-800">
            {!isMultiGame ? (
              <>
                <div>1. Rating difference: {singleOpponentElo} - {playerElo} = {singleOpponentElo - playerElo}</div>
                <div>2. Expected score calculation:</div>
                <div className="pl-4">{"Pe = 1 / (1 + 10^("}{singleOpponentElo - playerElo}{" / 400))"}</div>
                <div className="pl-4">{"Pe = 1 / (1 + 10^("}{((singleOpponentElo - playerElo) / 400).toFixed(4)}{"))"}</div>
                <div className="pl-4">Pe = {totalExpected.toFixed(4)}</div>
                <div>3. Rating adjustment calculation:</div>
                <div className="pl-4">Change = {kFactor} * ({singleResult} - {totalExpected.toFixed(4)})</div>
                <div className="pl-4">Change = {kFactor} * ({(singleResult - totalExpected).toFixed(4)})</div>
                <div className="pl-4 font-bold text-blue-900">Change = {ratingChange.toFixed(4)}</div>
              </>
            ) : (
              <>
                <div>Tournament calculations over {games.length} games:</div>
                {games.map((g, idx) => {
                  const exp = calcExpectedScore(playerElo, g.opponentElo);
                  const chg = kFactor * (g.result - exp);
                  return (
                    <div key={g.id} className="pl-4 border-l-2 border-blue-200 py-1 my-1">
                      Game #{idx + 1} vs {g.opponentElo} | Result: {g.result} | Expected: {exp.toFixed(4)} | Change: {chg.toFixed(2)}
                    </div>
                  );
                })}
                <div className="font-bold text-blue-900 mt-2">
                  Total cumulative rating change = Sum(Changes) = {ratingChange.toFixed(2)}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EloChangeCalculator() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading calculator configurations...</p>
      </div>
    }>
      <EloChangeCalculatorComponent />
    </Suspense>
  );
}
