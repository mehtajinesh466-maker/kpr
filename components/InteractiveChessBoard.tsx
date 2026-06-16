"use client";
import React, { useState } from "react";

// Mapping of FEN characters to Unicode chess pieces
const pieceUnicode: Record<string, string> = {
  p: "♟︎",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

/**
 * Parses the piece placement portion of a FEN string into a 2‑dimensional array.
 * Empty squares are represented by an empty string.
 */
function parseFEN(fen: string): string[][] {
  const rows = fen.split(" ")[0].split("/");
  const board: string[][] = [];
  for (const row of rows) {
    const boardRow: string[] = [];
    for (const char of row) {
      if (/[1-8]/.test(char)) {
        const emptyCount = parseInt(char, 10);
        for (let i = 0; i < emptyCount; i++) {
          boardRow.push("");
        }
      } else {
        boardRow.push(pieceUnicode[char] || "");
      }
    }
    // Ensure each row has exactly 8 columns
    while (boardRow.length < 8) boardRow.push("");
    board.push(boardRow);
  }
  // Ensure we have exactly 8 rows
  while (board.length < 8) board.unshift(["", "", "", "", "", "", "", ""]);
  return board;
}

interface InteractiveChessBoardProps {
  /**
   * FEN string describing the board position. If omitted, the default
   * starting position is used.
   */
  fen?: string;
}

export const InteractiveChessBoard: React.FC<InteractiveChessBoardProps> = ({ fen }) => {
  const defaultFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const board = parseFEN(fen ?? defaultFEN);

  const [activeSquare, setActiveSquare] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-64 h-64 border-2 border-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {board.flatMap((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const index = rowIndex * 8 + colIndex;
          const isDark = (rowIndex + colIndex) % 2 === 1;
          return (
            <div
              key={index}
              className={`relative flex items-center justify-center ${
                isDark ? "bg-gray-700" : "bg-amber-50"
              }`}
              onMouseEnter={() => setActiveSquare(index)}
              onMouseLeave={() => setActiveSquare(null)}
            >
              {/* Highlight on hover */}
              {activeSquare === index && (
                <div className="absolute inset-0 bg-blue-500 opacity-20" />
              )}
              <span className="text-2xl select-none">{piece}</span>
            </div>
          );
        })
      )}
    </div>
  );
};
