"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, RotateCcw, Share2, Info, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getRatingDifference } from "./rating-performance";

interface OpponentData {
  id: string;
  rating: number;
  title: "None" | "GM" | "IM" | "FM" | "WGM" | "WIM" | "WFM";
  federation: string;
  result: number; // 1 = Win, 0.5 = Draw, 0 = Loss
}

interface NormCriteria {
  minPerformance: number;
  minAvgRating: number;
  minSpecificTitles: number;
  specificTitlesList: string[];
  specificTitlesLabel: string;
}

const NORM_TEMPLATES: Record<string, NormCriteria> = {
  GM: {
    minPerformance: 2600,
    minAvgRating: 2380,
    minSpecificTitles: 3,
    specificTitlesList: ["GM", "WGM"], // FIDE rules: GMs required
    specificTitlesLabel: "GMs"
  },
  IM: {
    minPerformance: 2450,
    minAvgRating: 2230,
    minSpecificTitles: 3,
    specificTitlesList: ["GM", "IM", "WGM", "WIM"],
    specificTitlesLabel: "IMs or GMs"
  },
  WGM: {
    minPerformance: 2400,
    minAvgRating: 2180,
    minSpecificTitles: 3,
    specificTitlesList: ["GM", "IM", "WGM"],
    specificTitlesLabel: "WGMs, IMs, or GMs"
  },
  WIM: {
    minPerformance: 2250,
    minAvgRating: 2030,
    minSpecificTitles: 3,
    specificTitlesList: ["GM", "IM", "WGM", "WIM"],
    specificTitlesLabel: "WIMs, WGMs, IMs, or GMs"
  }
};

function TitleNormCalculatorComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [targetTitle, setTargetTitle] = useState<string>("GM");
  const [playerFed, setPlayerFed] = useState<string>("IND");
  const [opponents, setOpponents] = useState<OpponentData[]>([
    { id: "1", rating: 2450, title: "GM", federation: "USA", result: 1 },
    { id: "2", rating: 2380, title: "IM", federation: "GER", result: 0.5 },
    { id: "3", rating: 2400, title: "GM", federation: "FRA", result: 0.5 },
    { id: "4", rating: 2350, title: "None", federation: "IND", result: 1 },
    { id: "5", rating: 2420, title: "GM", federation: "IND", result: 0.5 },
    { id: "6", rating: 2410, title: "IM", federation: "USA", result: 0.5 },
    { id: "7", rating: 2390, title: "None", federation: "IND", result: 0.5 },
    { id: "8", rating: 2360, title: "FM", federation: "UZB", result: 1 },
    { id: "9", rating: 2370, title: "None", federation: "GER", result: 0.5 }
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state from query parameters on mount
  useEffect(() => {
    const title = searchParams.get("title");
    const fed = searchParams.get("fed");
    const encodedOpps = searchParams.get("opponents");

    if (title && NORM_TEMPLATES[title]) {
      setTargetTitle(title);
    }
    if (fed) {
      setPlayerFed(fed.toUpperCase());
    }
    if (encodedOpps) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encodedOpps)) as {
          rating: number;
          title: "None" | "GM" | "IM" | "FM" | "WGM" | "WIM" | "WFM";
          federation: string;
          result: number;
        }[];
        setOpponents(
          decoded.map((o, idx) => ({
            id: idx.toString(),
            rating: Math.max(100, Math.min(3000, o.rating)),
            title: o.title,
            federation: o.federation || "None",
            result: o.result
          }))
        );
      } catch (e) {
        console.error("Failed to decode opponents parameter", e);
      }
    }
  }, [searchParams]);

  // Update query parameters when state changes
  const updateQueryParams = (title: string, fed: string, newOpps: OpponentData[]) => {
    const params = new URLSearchParams();
    params.set("title", title);
    params.set("fed", fed);
    const compact = newOpps.map((o) => ({
      rating: o.rating,
      title: o.title,
      federation: o.federation,
      result: o.result
    }));
    params.set("opponents", encodeURIComponent(JSON.stringify(compact)));
    router.replace(`/calculators/title-norm?${params.toString()}`, { scroll: false });
  };

  const handleTitleChange = (val: string) => {
    setTargetTitle(val);
    updateQueryParams(val, playerFed, opponents);
  };

  const handlePlayerFedChange = (val: string) => {
    const uppercase = val.toUpperCase().slice(0, 3);
    setPlayerFed(uppercase);
    updateQueryParams(targetTitle, uppercase, opponents);
  };

  // Opponents modifier functions
  const updateOpponentField = (id: string, field: keyof OpponentData, val: any) => {
    const updated = opponents.map((o) => (o.id === id ? { ...o, [field]: val } : o));
    setOpponents(updated);
    updateQueryParams(targetTitle, playerFed, updated);
  };

  const addOpponentRow = () => {
    const nextId = (opponents.length + 1).toString();
    const lastElo = opponents[opponents.length - 1]?.rating ?? 2300;
    const lastFed = opponents[opponents.length - 1]?.federation ?? "IND";
    const updated = [
      ...opponents,
      { id: nextId, rating: lastElo, title: "None" as const, federation: lastFed, result: 0.5 }
    ];
    setOpponents(updated);
    updateQueryParams(targetTitle, playerFed, updated);
  };

  const deleteOpponentRow = (id: string) => {
    if (opponents.length <= 1) {
      toast.error("You must have at least one opponent row.");
      return;
    }
    const updated = opponents.filter((o) => o.id !== id);
    setOpponents(updated);
    updateQueryParams(targetTitle, playerFed, updated);
  };

  const resetCalculator = () => {
    setTargetTitle("GM");
    setPlayerFed("IND");
    setOpponents([
      { id: "1", rating: 2450, title: "GM", federation: "USA", result: 1 },
      { id: "2", rating: 2380, title: "IM", federation: "GER", result: 0.5 },
      { id: "3", rating: 2400, title: "GM", federation: "FRA", result: 0.5 },
      { id: "4", rating: 2350, title: "None", federation: "IND", result: 1 },
      { id: "5", rating: 2420, title: "GM", federation: "IND", result: 0.5 },
      { id: "6", rating: 2410, title: "IM", federation: "USA", result: 0.5 },
      { id: "7", rating: 2390, title: "None", federation: "IND", result: 0.5 },
      { id: "8", rating: 2360, title: "FM", federation: "UZB", result: 1 },
      { id: "9", rating: 2370, title: "None", federation: "GER", result: 0.5 }
    ]);
    router.replace(`/calculators/title-norm`, { scroll: false });
    toast.success("Calculator state reset.");
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Calculator URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Perform Title Norm verification math
  const template = NORM_TEMPLATES[targetTitle] || NORM_TEMPLATES.GM;
  const gamesCount = opponents.length;
  const totalPoints = opponents.reduce((sum, o) => sum + o.result, 0);
  const avgOppRating = gamesCount > 0 ? Math.round(opponents.reduce((sum, o) => sum + o.rating, 0) / gamesCount) : 0;
  const percentage = gamesCount > 0 ? totalPoints / gamesCount : 0;
  const ratingDiff = getRatingDifference(percentage);
  const performanceRating = avgOppRating + ratingDiff;

  // 1. Min performance check
  const hasMinPerformance = performanceRating >= template.minPerformance;

  // 2. Avg opponent rating check
  const hasMinAvgRating = avgOppRating >= template.minAvgRating;

  // 3. Titled opponents percentage check (At least 50% must be titled: GM, IM, FM, WGM, WIM, WFM)
  const titledCount = opponents.filter((o) => o.title !== "None").length;
  const titledPercentage = gamesCount > 0 ? (titledCount / gamesCount) * 100 : 0;
  const hasMinTitledPercentage = titledPercentage >= 50;

  // 4. Specific titles check (At least 3 players holding specific target titles)
  const specificTitlesCount = opponents.filter((o) => template.specificTitlesList.includes(o.title)).length;
  const hasMinSpecificTitles = specificTitlesCount >= template.minSpecificTitles;

  // 5. Federation mixture checks
  // Max 2/3 opponents from own federation
  const ownFedCount = opponents.filter((o) => o.federation.toUpperCase() === playerFed).length;
  const ownFedPercentage = gamesCount > 0 ? (ownFedCount / gamesCount) * 100 : 0;
  const hasOwnFedValidLimit = ownFedPercentage <= 66.7;

  // Represent at least 2 other federations
  const otherFeds = Array.from(
    new Set(opponents.map((o) => o.federation.toUpperCase()).filter((f) => f !== playerFed && f !== ""))
  );
  const hasOtherFedsValidCount = otherFeds.length >= 2;

  const passesAllNormRules =
    gamesCount >= 9 &&
    hasMinPerformance &&
    hasMinAvgRating &&
    hasMinTitledPercentage &&
    hasMinSpecificTitles &&
    hasOwnFedValidLimit &&
    hasOtherFedsValidCount;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            FIDE Title Norm Calculator
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Assess game outcomes against the FIDE handbook checklist to see if title criteria are met.
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

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Opponents Setup Table Card */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-gray-200/80 shadow-md rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <CardTitle className="text-lg font-bold">Norm Configurations</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="space-y-0.5">
                    <Label className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Norm Target</Label>
                    <Select value={targetTitle} onValueChange={handleTitleChange}>
                      <SelectTrigger className="bg-white/10 text-white border-white/20 rounded-lg h-8 w-24">
                        <SelectValue placeholder="Title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GM">GM Norm</SelectItem>
                        <SelectItem value="IM">IM Norm</SelectItem>
                        <SelectItem value="WGM">WGM Norm</SelectItem>
                        <SelectItem value="WIM">WIM Norm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Your Fed (3 Ltr)</Label>
                    <Input
                      type="text"
                      maxLength={3}
                      value={playerFed}
                      onChange={(e) => handlePlayerFedChange(e.target.value)}
                      className="bg-white/10 text-white border-white/20 rounded-lg h-8 w-20 uppercase text-center"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center px-2">
                <h4 className="font-bold text-sm text-gray-800">Opponents List ({gamesCount} games)</h4>
                <Button type="button" variant="outline" size="sm" onClick={addOpponentRow} className="text-blue-600 hover:text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-lg h-8">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Round
                </Button>
              </div>

              {/* Responsive Scrollable List Container */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {opponents.map((opp, index) => (
                  <div key={opp.id} className="flex gap-2 items-end bg-gray-50 border border-gray-200/50 p-2.5 rounded-xl text-xs">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] shrink-0 text-slate-600 mb-1.5">
                      #{index + 1}
                    </div>

                    <div className="flex-1 grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`opp-norm-rating-${opp.id}`} className="text-[10px] text-gray-500 font-semibold uppercase">Rating</Label>
                        <Input
                          id={`opp-norm-rating-${opp.id}`}
                          type="number"
                          value={opp.rating || ""}
                          onChange={(e) => updateOpponentField(opp.id, "rating", parseInt(e.target.value) || 0)}
                          className="h-8 rounded-lg border-gray-200 bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold uppercase">Title</Label>
                        <Select value={opp.title} onValueChange={(val) => updateOpponentField(opp.id, "title", val)}>
                          <SelectTrigger className="h-8 rounded-lg border-gray-200 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="GM">GM</SelectItem>
                            <SelectItem value="IM">IM</SelectItem>
                            <SelectItem value="FM">FM</SelectItem>
                            <SelectItem value="WGM">WGM</SelectItem>
                            <SelectItem value="WIM">WIM</SelectItem>
                            <SelectItem value="WFM">WFM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor={`opp-norm-fed-${opp.id}`} className="text-[10px] text-gray-500 font-semibold uppercase">Fed</Label>
                        <Input
                          id={`opp-norm-fed-${opp.id}`}
                          type="text"
                          maxLength={3}
                          value={opp.federation}
                          onChange={(e) => updateOpponentField(opp.id, "federation", e.target.value.toUpperCase())}
                          className="h-8 rounded-lg border-gray-200 bg-white uppercase text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-semibold uppercase">Outcome</Label>
                        <Select value={opp.result.toString()} onValueChange={(val) => updateOpponentField(opp.id, "result", parseFloat(val))}>
                          <SelectTrigger className="h-8 rounded-lg border-gray-200 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Win (1)</SelectItem>
                            <SelectItem value="0.5">Draw (½)</SelectItem>
                            <SelectItem value="0">Loss (0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteOpponentRow(opp.id)}
                      className="h-8 w-8 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mb-0.5"
                      disabled={opponents.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Check List Panel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className={`border shadow-md rounded-2xl text-white overflow-hidden transition-colors duration-500 ${
            passesAllNormRules ? "bg-emerald-950 border-emerald-800" : "bg-slate-900 border-slate-800"
          }`}>
            <CardHeader className="border-b border-white/10 p-5">
              <CardTitle className="text-lg font-bold flex items-center justify-between">
                <span>Norm Status</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
                  passesAllNormRules ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                }`}>
                  {passesAllNormRules ? "QUALIFIED" : "NOT MET"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-white/5 border border-white/5 p-4 rounded-xl">
                <div>
                  <div className="text-white/60 mb-0.5 font-semibold">Performance ELO</div>
                  <div className="text-xl font-black text-blue-400">{performanceRating}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-0.5 font-semibold font-mono">Opponents Avg</div>
                  <div className="text-xl font-black text-emerald-400">{avgOppRating}</div>
                </div>
              </div>

              {/* Requirement Bullet Checks */}
              <div className="space-y-4 text-xs font-medium">
                <h4 className="font-bold text-white/95 uppercase tracking-wider text-[10px]">Criteria Checklist</h4>
                
                {/* 1. Rounds Check */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${gamesCount >= 9 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {gamesCount >= 9 ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Minimum Games (Rounds)</div>
                    <div className="text-white/60">Minimum 9 games required. Entered: {gamesCount}.</div>
                  </div>
                </div>

                {/* 2. Rating Performance */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${hasMinPerformance ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {hasMinPerformance ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Rating Performance (TPR)</div>
                    <div className="text-white/60">Required: &gt;={template.minPerformance} ELO. Achieved: {performanceRating}.</div>
                  </div>
                </div>

                {/* 3. Opponent Average */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${hasMinAvgRating ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {hasMinAvgRating ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Average Opponent Rating</div>
                    <div className="text-white/60">Required: &gt;={template.minAvgRating} ELO. Average: {avgOppRating}.</div>
                  </div>
                </div>

                {/* 4. 50% Titled Opponents */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${hasMinTitledPercentage ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {hasMinTitledPercentage ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Titled Opponents (%)</div>
                    <div className="text-white/60">Required: &gt;= 50% titled. Achieved: {titledPercentage.toFixed(1)}% ({titledCount} titled).</div>
                  </div>
                </div>

                {/* 5. Specific Titles Holders */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${hasMinSpecificTitles ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {hasMinSpecificTitles ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Required Specific Titles</div>
                    <div className="text-white/60">Required: &gt;= {template.minSpecificTitles} {template.specificTitlesLabel}. Achieved: {specificTitlesCount}.</div>
                  </div>
                </div>

                {/* 6. Federation Mix - Own federation limit */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${hasOwnFedValidLimit ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {hasOwnFedValidLimit ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Max Own Federation (%)</div>
                    <div className="text-white/60">Required: &lt;= 66.7% from own Fed. Achieved: {ownFedPercentage.toFixed(1)}% ({ownFedCount} from {playerFed}).</div>
                  </div>
                </div>

                {/* 7. Federation Mix - Other federations count */}
                <div className="flex items-start gap-2.5">
                  <div className={`p-0.5 rounded-full shrink-0 ${hasOtherFedsValidCount ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {hasOtherFedsValidCount ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold">Other Federations Represented</div>
                    <div className="text-white/60">Required: At least 2 other federations. Found: {otherFeds.length} ({otherFeds.join(", ") || "none"}).</div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FIDE Criteria Details Table */}
      <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
          <CardTitle className="text-lg font-bold text-gray-900">FIDE Title Norm Qualification Rules</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            To achieve a norm for the FIDE titles of Grandmaster (GM), International Master (IM), Woman Grandmaster (WGM), or Woman International Master (WIM), a player must meet strict criteria during a qualified FIDE-rated tournament (as per Section 1 of the FIDE Title Regulations).
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Title Target</th>
                  <th className="px-6 py-3">Min Performance</th>
                  <th className="px-6 py-3">Min Avg Opponent</th>
                  <th className="px-6 py-3">Min Specific Titles Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs text-gray-700 font-medium">
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">GM Norm</td>
                  <td className="px-6 py-4">2600 ELO</td>
                  <td className="px-6 py-4">2380 ELO</td>
                  <td className="px-6 py-4">At least 3 GMs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">IM Norm</td>
                  <td className="px-6 py-4">2450 ELO</td>
                  <td className="px-6 py-4">2230 ELO</td>
                  <td className="px-6 py-4">At least 3 GMs or IMs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">WGM Norm</td>
                  <td className="px-6 py-4">2400 ELO</td>
                  <td className="px-6 py-4">2180 ELO</td>
                  <td className="px-6 py-4">At least 3 GMs, IMs, or WGMs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">WIM Norm</td>
                  <td className="px-6 py-4">2250 ELO</td>
                  <td className="px-6 py-4">2030 ELO</td>
                  <td className="px-6 py-4">At least 3 GMs, IMs, WGMs, or WIMs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TitleNormCalculator() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading calculator configurations...</p>
      </div>
    }>
      <TitleNormCalculatorComponent />
    </Suspense>
  );
}
