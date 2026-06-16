import React from "react";
import type { Metadata } from "next";
import EloChangeCalculator from "@/components/calculators/elo-rating-change";

export const metadata: Metadata = {
  title: "FIDE Elo Rating Change Calculator",
  description: "Calculate your new rating and changes according to FIDE rules. Enter your rating, opponent rating, K-factor, and match outcomes to see results.",
  alternates: {
    canonical: "https://www.chesseasy.com/calculators/elo-rating-change",
  }
};

export default function EloRatingChangeRoutePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Chess ELO Rating Changes",
    "description": "Step-by-step instructions on calculating FIDE Elo rating changes using the official probability expectancy formulas.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Current Ratings",
        "text": "Provide your current rating and your opponent's rating (capped between 100 and 3000 Elo)."
      },
      {
        "@type": "HowToStep",
        "name": "Select K-Factor",
        "text": "Choose K=40 for juniors or new players, K=20 for active players below 2400 ELO, or K=10 for master-level players."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Expected Score",
        "text": "Compute expectancy score: 1 / (1 + 10^((OpponentRating - PlayerRating)/400))."
      },
      {
        "@type": "HowToStep",
        "name": "Multiply difference by K-Factor",
        "text": "Subtract expected score from actual match result (Win=1, Draw=0.5, Loss=0), and multiply the result by your K-Factor to get rating change."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EloChangeCalculator />
    </>
  );
}
