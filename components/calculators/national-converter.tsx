"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Share2, Info, ArrowLeftRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ConversionResult {
  fromSystem: string;
  toSystem: string;
  fromValue: number;
  toValue: number;
  formula: string;
  steps: string[];
}

function NationalConverterCalculatorComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [nationalSystem, setNationalSystem] = useState<string>("USCF");
  const [inputValue, setInputValue] = useState<number>(2000);
  const [convertToFide, setConvertToFide] = useState<boolean>(true); // true = Nat to FIDE, false = FIDE to Nat
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state from query parameters on mount
  useEffect(() => {
    const sys = searchParams.get("system");
    const val = searchParams.get("val");
    const dir = searchParams.get("dir");

    if (sys && ["USCF", "ECF_OLD", "DWZ", "CFC"].includes(sys)) {
      setNationalSystem(sys);
    }
    if (val) {
      const parsed = parseInt(val);
      if (parsed >= 1 && parsed <= 3000) setInputValue(parsed);
    }
    if (dir) {
      setConvertToFide(dir === "to_fide");
    }
  }, [searchParams]);

  // Sync state back to URL query parameters
  const updateQueryParams = (sys: string, val: number, toFide: boolean) => {
    const params = new URLSearchParams();
    params.set("system", sys);
    params.set("val", val.toString());
    params.set("dir", toFide ? "to_fide" : "from_fide");
    router.replace(`/calculators/national-converter?${params.toString()}`, { scroll: false });
  };

  const handleSystemChange = (val: string) => {
    setNationalSystem(val);
    // Adjust default rating based on system
    let defVal = inputValue;
    if (val === "ECF_OLD" && inputValue > 300) {
      defVal = 150;
    } else if (val !== "ECF_OLD" && inputValue < 300) {
      defVal = 1800;
    }
    setInputValue(defVal);
    updateQueryParams(val, defVal, convertToFide);
  };

  const handleRatingValueChange = (val: string) => {
    const num = parseInt(val) || 0;
    setInputValue(num);
    updateQueryParams(nationalSystem, num, convertToFide);
  };

  const toggleDirection = () => {
    const newDir = !convertToFide;
    setConvertToFide(newDir);
    // Toggle value scale if switching ECF old
    let defVal = inputValue;
    if (nationalSystem === "ECF_OLD") {
      if (newDir) {
        // ECF Old -> FIDE: input value should be low (e.g. 150)
        if (inputValue > 300) defVal = 150;
      } else {
        // FIDE -> ECF Old: input value is FIDE (e.g. 1800)
        if (inputValue < 300) defVal = 1800;
      }
    }
    setInputValue(defVal);
    updateQueryParams(nationalSystem, defVal, newDir);
  };

  const resetCalculator = () => {
    setNationalSystem("USCF");
    setInputValue(2000);
    setConvertToFide(true);
    router.replace(`/calculators/national-converter`, { scroll: false });
    toast.success("Calculator state reset.");
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Calculator URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Perform conversions
  const runConversion = (): ConversionResult => {
    let resultValue = 0;
    let formulaStr = "";
    let stepsList: string[] = [];

    const v = inputValue;

    if (convertToFide) {
      switch (nationalSystem) {
        case "USCF":
          if (v >= 2000) {
            resultValue = Math.round(0.94 * v - 140);
            formulaStr = "FIDE = 0.94 * USCF - 140  (for USCF >= 2000)";
            stepsList = [
              `1. Since USCF rating (${v}) is >= 2000, apply the high-range formula.`,
              `2. Multiply USCF rating by 0.94: 0.94 * ${v} = ${(0.94 * v).toFixed(2)}`,
              `3. Subtract 140: ${(0.94 * v).toFixed(2)} - 140 = ${(0.94 * v - 140).toFixed(2)}`,
              `4. Round to the nearest integer: ${resultValue} ELO.`
            ];
          } else {
            resultValue = Math.round(0.72 * v + 300);
            formulaStr = "FIDE = 0.72 * USCF + 300  (for USCF < 2000)";
            stepsList = [
              `1. Since USCF rating (${v}) is < 2000, apply the low-range formula.`,
              `2. Multiply USCF rating by 0.72: 0.72 * ${v} = ${(0.72 * v).toFixed(2)}`,
              `3. Add 300: ${(0.72 * v).toFixed(2)} + 300 = ${(0.72 * v + 300).toFixed(2)}`,
              `4. Round to the nearest integer: ${resultValue} ELO.`
            ];
          }
          break;
        case "ECF_OLD":
          resultValue = Math.round(v * 7.5 + 700);
          formulaStr = "FIDE = ECF * 7.5 + 700";
          stepsList = [
            `1. Multiply the legacy ECF Grade (${v}) by 7.5: 7.5 * ${v} = ${(v * 7.5).toFixed(2)}`,
            `2. Add 700 points: ${(v * 7.5).toFixed(2)} + 700 = ${(v * 7.5 + 700).toFixed(2)}`,
            `3. Round to the nearest integer: ${resultValue} ELO.`
          ];
          break;
        case "DWZ":
          if (v >= 2000) {
            resultValue = v;
            formulaStr = "FIDE = DWZ  (for DWZ >= 2000)";
            stepsList = [
              `1. Since German DWZ (${v}) is >= 2000, it is considered equivalent to FIDE.`,
              `2. Result: ${resultValue} ELO.`
            ];
          } else {
            resultValue = Math.round(v + 30);
            formulaStr = "FIDE = DWZ + 30  (for DWZ < 2000)";
            stepsList = [
              `1. Since German DWZ (${v}) is < 2000, add a 30-point calibration gap.`,
              `2. Add 30: ${v} + 30 = ${v + 30}`,
              `3. Result: ${resultValue} ELO.`
            ];
          }
          break;
        case "CFC":
          resultValue = Math.round(0.95 * v - 10);
          formulaStr = "FIDE = 0.95 * CFC - 10";
          stepsList = [
            `1. Multiply Chess Federation of Canada (CFC) rating (${v}) by 0.95: 0.95 * ${v} = ${(0.95 * v).toFixed(2)}`,
            `2. Subtract 10 points: ${(0.95 * v).toFixed(2)} - 10 = ${(0.95 * v - 10).toFixed(2)}`,
            `3. Round to the nearest integer: ${resultValue} ELO.`
          ];
          break;
      }
      return {
        fromSystem: nationalSystem === "ECF_OLD" ? "ECF (Old Grade)" : nationalSystem,
        toSystem: "FIDE",
        fromValue: inputValue,
        toValue: resultValue,
        formula: formulaStr,
        steps: stepsList
      };
    } else {
      // FIDE -> National
      switch (nationalSystem) {
        case "USCF":
          if (v >= 1740) {
            resultValue = Math.round((v + 140) / 0.94);
            formulaStr = "USCF = (FIDE + 140) / 0.94  (for FIDE >= 1740)";
            stepsList = [
              `1. Since FIDE rating (${v}) is >= 1740, apply the high-range inverse formula.`,
              `2. Add 140: ${v} + 140 = ${v + 140}`,
              `3. Divide by 0.94: ${v + 140} / 0.94 = ${((v + 140) / 0.94).toFixed(2)}`,
              `4. Round to the nearest integer: ${resultValue} USCF.`
            ];
          } else {
            resultValue = Math.round((v - 300) / 0.72);
            formulaStr = "USCF = (FIDE - 300) / 0.72  (for FIDE < 1740)";
            stepsList = [
              `1. Since FIDE rating (${v}) is < 1740, apply the low-range inverse formula.`,
              `2. Subtract 300: ${v} - 300 = ${v - 300}`,
              `3. Divide by 0.72: ${v - 300} / 0.72 = ${((v - 300) / 0.72).toFixed(2)}`,
              `4. Round to the nearest integer: ${resultValue} USCF.`
            ];
          }
          break;
        case "ECF_OLD":
          resultValue = Math.round((v - 700) / 7.5);
          formulaStr = "ECF = (FIDE - 700) / 7.5";
          stepsList = [
            `1. Subtract 700 from FIDE ELO (${v}): ${v} - 700 = ${v - 700}`,
            `2. Divide by 7.5: ${v - 700} / 7.5 = ${((v - 700) / 7.5).toFixed(2)}`,
            `3. Round to the nearest integer Grade: ${resultValue} ECF.`
          ];
          break;
        case "DWZ":
          if (v >= 2000) {
            resultValue = v;
            formulaStr = "DWZ = FIDE  (for FIDE >= 2000)";
            stepsList = [
              `1. Since FIDE rating (${v}) is >= 2000, DWZ is considered equivalent.`,
              `2. Result: ${resultValue} DWZ.`
            ];
          } else {
            resultValue = Math.round(v - 30);
            formulaStr = "DWZ = FIDE - 30  (for FIDE < 2000)";
            stepsList = [
              `1. Since FIDE rating (${v}) is < 2000, subtract the 30-point calibration gap.`,
              `2. Subtract 30: ${v} - 30 = ${v - 30}`,
              `3. Result: ${resultValue} DWZ.`
            ];
          }
          break;
        case "CFC":
          resultValue = Math.round((v + 10) / 0.95);
          formulaStr = "CFC = (FIDE + 10) / 0.95";
          stepsList = [
            `1. Add 10 points to FIDE ELO (${v}): ${v} + 10 = ${v + 10}`,
            `2. Divide by 0.95: ${v + 10} / 0.95 = ${((v + 10) / 0.95).toFixed(2)}`,
            `3. Round to the nearest integer: ${resultValue} CFC.`
          ];
          break;
      }
      return {
        fromSystem: "FIDE",
        toSystem: nationalSystem === "ECF_OLD" ? "ECF (Old Grade)" : nationalSystem,
        fromValue: inputValue,
        toValue: resultValue,
        formula: formulaStr,
        steps: stepsList
      };
    }
  };

  const conversion = runConversion();

  // Validate bounds
  const isInputValid =
    nationalSystem === "ECF_OLD" && convertToFide
      ? inputValue >= 1 && inputValue <= 300
      : inputValue >= 100 && inputValue <= 3000;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            National Rating to FIDE Converter
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Convert national federation ratings (USCF, ECF, DWZ, CFC) to and from estimated FIDE Elo.
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
        {/* Configurations Card */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-gray-200/80 shadow-md rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-5">
              <CardTitle className="text-lg font-bold">Conversion Configuration</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Federation selection & Conversion direction */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="national-system" className="text-sm font-semibold text-gray-700">
                    National Federation System
                  </Label>
                  <Select value={nationalSystem} onValueChange={handleSystemChange}>
                    <SelectTrigger id="national-system" className="rounded-xl border-gray-200">
                      <SelectValue placeholder="Select System" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USCF">USCF (United States)</SelectItem>
                      <SelectItem value="ECF_OLD">ECF (UK Old Grade: &lt;300)</SelectItem>
                      <SelectItem value="DWZ">DWZ (Germany)</SelectItem>
                      <SelectItem value="CFC">CFC (Canada)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Conversion Direction</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleDirection}
                    className="w-full justify-between rounded-xl border-gray-200 hover:bg-slate-50 font-medium"
                  >
                    <span className="truncate">
                      {convertToFide
                        ? `${nationalSystem === "ECF_OLD" ? "ECF Grade" : nationalSystem} → FIDE ELO`
                        : `FIDE ELO → ${nationalSystem === "ECF_OLD" ? "ECF Grade" : nationalSystem}`}
                    </span>
                    <ArrowLeftRight className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Rating value inputs */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <Label htmlFor="input-rating" className="text-sm font-semibold text-gray-700">
                  Enter Rating / Grade Value to Convert
                </Label>
                <Input
                  id="input-rating"
                  type="number"
                  value={inputValue || ""}
                  onChange={(e) => handleRatingValueChange(e.target.value)}
                  className={`rounded-xl border-gray-200 ${!isInputValid ? "border-red-500" : ""}`}
                />
                {!isInputValid && (
                  <p className="text-xs text-red-500 font-medium">
                    {nationalSystem === "ECF_OLD" && convertToFide
                      ? "Please enter an ECF Grade between 1 and 300."
                      : "Please enter a rating between 100 and 3000."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-gray-200 shadow-md rounded-2xl bg-[#0F172A] text-white">
            <CardHeader className="bg-slate-900 border-b border-slate-800 p-5">
              <CardTitle className="text-lg font-bold text-slate-100">Equivalent Rating Estimate</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Output metric blocks */}
              <div className="flex flex-col items-center justify-center py-6 bg-slate-800/40 border border-slate-700/40 rounded-2xl text-center space-y-2">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  {conversion.fromSystem} Value
                </div>
                <div className="text-xl font-bold text-slate-300">{conversion.fromValue}</div>
                
                <div className="h-6 w-px bg-slate-700 my-1" />

                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Estimated {conversion.toSystem} Equivalent
                </div>
                <div className="text-3xl font-black text-blue-400">
                  {isInputValid ? conversion.toValue : "-"}
                </div>
              </div>

              {/* Conversion formula formulaStr */}
              <div className="bg-slate-800/30 border border-slate-800 p-4 rounded-xl text-xs space-y-1 text-slate-400">
                <div className="font-bold text-slate-300">Conversion Formula Applied:</div>
                <div className="font-mono text-blue-300">{conversion.formula}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Methodology Section */}
      <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
          <CardTitle className="text-lg font-bold text-gray-900">Step-by-Step Math Conversion</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            National rating systems calculate playing strength using historical parameters aligned to their federations.
            Because formulas and scaling factors vary, statistical regression models are used to map equivalence back and forth to FIDE Elo.
          </p>
          {isInputValid && (
            <div className="space-y-2 bg-blue-50/50 border border-blue-100 p-4 rounded-xl font-mono text-xs text-slate-800">
              <div className="font-bold text-blue-900">Calculation Steps:</div>
              {conversion.steps.map((step, idx) => (
                <div key={idx} className="pl-2 border-l border-blue-200">{step}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function NationalConverterCalculator() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading calculator configurations...</p>
      </div>
    }>
      <NationalConverterCalculatorComponent />
    </Suspense>
  );
}
