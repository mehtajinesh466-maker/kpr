import React from "react";
import { InteractiveChessBoard } from "@/components/InteractiveChessBoard";
import Head from "next/head";

export default function ChessboardPage() {
  return (
    <>
      <Head>
        <title>Interactive Chessboard | Chesseasy</title>
        <meta name="description" content="Explore the interactive chessboard component with standard starting position." />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
        <InteractiveChessBoard />
      </div>
    </>
  );
}
