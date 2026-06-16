import React from "react";
import type { Metadata } from "next";
import RatingPerformanceCalculator from "@/components/calculators/rating-performance";

export const metadata: Metadata = {
  title: "Chess Rating Performance Calculator (TPR)",
  description: "Calculate your Tournament Performance Rating (TPR) from average opponent Elo and scoring outcomes based on FIDE regulations.",
  alternates: {
    canonical: "https://www.chesseasy.com/calculators/rating-performance",
  }
};

export default function RatingPerformanceRoutePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Chess Tournament Performance Rating",
    "description": "Learn to calculate your TPR using FIDE Handbook regulations and score-to-rating mappings.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calculate Average Opponent Rating",
        "text": "Find the average rating of all the opponents you played in the event."
      },
      {
        "@type": "HowToStep",
        "name": "Find Score Percentage",
        "text": "Divide your actual points scored by the total games played to determine your score percentage."
      },
      {
        "@type": "HowToStep",
        "name": "Lookup dp in FIDE Table",
        "text": "Check the FIDE 8.1a Table for the rating difference (dp) matching your scoring percentage."
      },
      {
        "@type": "HowToStep",
        "name": "Add dp to Average Rating",
        "text": "Combine average opponent rating (Ra) and difference (dp) to get your TPR."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RatingPerformanceCalculator />
    </>
  );
}
