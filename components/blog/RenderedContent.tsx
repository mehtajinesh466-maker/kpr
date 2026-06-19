"use client";

import React, { Suspense } from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { InteractiveChessBoard } from "@/components/InteractiveChessBoard";

const calculatorComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {};

function getCalculatorComponent(type: string) {
  if (!calculatorComponents[type]) {
    calculatorComponents[type] = React.lazy(() =>
      import(`@/components/calculators/${type}.tsx`).catch(() => ({ default: () => null }))
    );
  }
  return calculatorComponents[type];
}

interface RenderedContentProps {
  html: string;
}

const SHORTCODE_REGEX = /\[\s*(chess-diagram|calculator)\s+[^\]]+\]/;
const BLOCK_SHORTCODE_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

export const RenderedContent: React.FC<RenderedContentProps> = ({ html }) => {
  const decodedHtml = html
    .replace(/&#91;/g, "[")
    .replace(/&#93;/g, "]");

  const parseShortcodes = (str: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /\[\s*(chess-diagram|calculator)\s+([^\]]+)\]/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(str)) !== null) {
      const before = str.slice(lastIndex, match.index);
      if (before) parts.push(before);

      const shortcode = match[1];
      const attrsString = match[2];
      const attrs: Record<string, string> = {};
      const attrRegex = /(\w+)\s*=\s*"([^"]*)"/g;
      let attrMatch: RegExpExecArray | null;
      while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
        attrs[attrMatch[1]] = attrMatch[2];
      }

      if (shortcode === "chess-diagram" && attrs.fen) {
        parts.push(<InteractiveChessBoard fen={attrs.fen} key={match.index} />);
      } else if (shortcode === "calculator" && attrs.type) {
        const CalcComp = getCalculatorComponent(attrs.type);
        parts.push(
          <Suspense fallback={<div>Loading calculator…</div>} key={match.index}>
            <CalcComp />
          </Suspense>
        );
      }

      lastIndex = regex.lastIndex;
    }

    const after = str.slice(lastIndex);
    if (after) parts.push(after);
    return parts.length > 1 ? <>{parts}</> : parts[0];
  };

  const extractText = (node: any): string => {
    if (node.type === "text") return node.data || "";
    if (node.children) return node.children.map(extractText).join("");
    return "";
  };

  const options: HTMLReactParserOptions = {
  replace: (node: any) => {
    // Only process text nodes containing shortcodes
    if (
      node.type === "text" &&
      typeof node.data === "string" &&
      SHORTCODE_REGEX.test(node.data)
    ) {
      return <>{parseShortcodes(node.data)}</>;
    }

    return undefined;
  },
};

  return (
    <div className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-ol:list-decimal prose-ul:list-disc prose-li:marker:text-gray-900">
      {parse(decodedHtml, options)}
    </div>
  );
};