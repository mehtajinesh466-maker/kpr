import React from "react";
import type { Metadata } from "next";
import TitleNormCalculator from "@/components/calculators/title-norm";

export const metadata: Metadata = {
  title: "FIDE Title Norm Calculator",
  description: "Check qualification thresholds and rules for Grandmaster (GM), International Master (IM), WGM, and WIM title norms.",
  alternates: {
    canonical: "https://www.chesseasy.com/calculators/title-norm",
  }
};

export default function TitleNormRoutePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Validate a FIDE Title Norm",
    "description": "Assess standard FIDE requirements for norms including rounds, opponent ratings, titled mixes, and federation distribution.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Verify Rounds Count",
        "text": "Ensure you have played at least 9 rounds in a FIDE-registered tournament."
      },
      {
        "@type": "HowToStep",
        "name": "Check Average Opponent ELO",
        "text": "Verify your opponent average ELO is >= 2380 for GM norms, >= 2230 for IM norms, >= 2180 for WGMs, or >= 2030 for WIMs."
      },
      {
        "@type": "HowToStep",
        "name": "Assess Titled Opponents Mix",
        "text": "At least 50% of your opponents must be titled. You need 3 GMs for a GM norm, or 3 IMs/GMs for an IM norm."
      },
      {
        "@type": "HowToStep",
        "name": "Check Federation Mix",
        "text": "Your opponents must represent at least 2 other federations, and no more than 2/3 of opponents can be from your own federation."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TitleNormCalculator />
    </>
  );
}
