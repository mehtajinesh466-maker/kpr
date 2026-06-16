import React from "react";
import type { Metadata } from "next";
import NationalConverterCalculator from "@/components/calculators/national-converter";

export const metadata: Metadata = {
  title: "National Rating to FIDE Estimated Converter",
  description: "Convert national federation ratings (USCF, DWZ, CFC, old ECF grades) back and forth into estimated FIDE equivalents.",
  alternates: {
    canonical: "https://www.chesseasy.com/calculators/national-converter",
  }
};

export default function NationalConverterRoutePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert National Ratings to FIDE ELO",
    "description": "Formulas to convert national ratings (like USCF, old ECF grades) to estimated FIDE ELO ratings.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select National System",
        "text": "Choose USCF (USA), ECF (UK), CFC (Canada), or DWZ (Germany)."
      },
      {
        "@type": "HowToStep",
        "name": "Apply Conversion Formula",
        "text": "For USCF >= 2000, FIDE = 0.94 * USCF - 140. For CFC, FIDE = 0.95 * CFC - 10. For old ECF, FIDE = ECF * 7.5 + 700."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NationalConverterCalculator />
    </>
  );
}
