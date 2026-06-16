import React from "react";
import type { Metadata } from "next";
import ExpectedScoreCalculator from "@/components/calculators/expected-score";

export const metadata: Metadata = {
  title: "Chess Expected Score Calculator",
  description: "Compute the mathematical win expectancy and expected point totals between two players based on their rating difference.",
  alternates: {
    canonical: "https://www.chesseasy.com/calculators/expected-score",
  }
};

export default function ExpectedScoreRoutePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Chess Match Expectancy Score",
    "description": "Formulas and steps to evaluate win/draw probabilities between chess players of different ratings.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Acquire Player ELOs",
        "text": "Locate the ratings of both competing chess players."
      },
      {
        "@type": "HowToStep",
        "name": "Find Rating Spread",
        "text": "Subtract Player 1's rating from Player 2's rating to find the ELO difference."
      },
      {
        "@type": "HowToStep",
        "name": "Apply Logistic Probability Curve",
        "text": "Calculate expected percentage score: Expectancy = 1 / (1 + 10^(difference / 400))."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ExpectedScoreCalculator />
    </>
  );
}
