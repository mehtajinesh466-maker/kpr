"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, CheckSquare, Quote, Table as TableIcon,
  Image as ImageIcon, Video, Link2, Code, FileCode, Check, Copy,
  Grid, PlusCircle, MinusCircle, Layout, ArrowRightLeft, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

// Basic FEN Board Parser Component for the editor preview
function ChessFenBoard({ fen }: { fen: string }) {
  if (!fen) return null;
  const boardPart = fen.split(" ")[0];
  if (!boardPart) return null;

  const rows = boardPart.split("/");
  const pieceUnicode: Record<string, string> = {
    K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
    k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟"
  };

  const parsedGrid: (string | null)[][] = [];

  for (let r = 0; r < 8; r++) {
    const rowStr = rows[r] || "8";
    const gridRow: (string | null)[] = [];
    
    for (let charIdx = 0; charIdx < rowStr.length; charIdx++) {
      const char = rowStr[charIdx];
      const emptyCount = parseInt(char);
      
      if (!isNaN(emptyCount)) {
        for (let i = 0; i < emptyCount; i++) {
          gridRow.push(null);
        }
      } else {
        gridRow.push(pieceUnicode[char] || char);
      }
    }
    // Fill remaining squares to keep 8x8 structural bounds
    while (gridRow.length < 8) gridRow.push(null);
    parsedGrid.push(gridRow);
  }

  return (
    <div className="w-[280px] h-[280px] border-4 border-slate-700 rounded-lg overflow-hidden grid grid-cols-8 grid-rows-8 bg-amber-100 shadow-lg mx-auto my-4">
      {parsedGrid.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          const isDarkSquare = (rIdx + cIdx) % 2 === 1;
          return (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`w-full h-full flex items-center justify-center text-3xl font-bold select-none ${
                isDarkSquare ? "bg-amber-800 text-amber-100" : "bg-amber-200 text-amber-800"
              }`}
            >
              {cell}
            </div>
          );
        })
      )}
    </div>
  );
}

interface TipTapEditorProps {
  initialContent: any;
  onChange: (json: any, html: string) => void;
}

export function TipTapEditor({ initialContent, onChange }: TipTapEditorProps) {
  // Image dialog state
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageUploadFile, setImageUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Link state
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // FEN state
  const [fenDialogOpen, setFenDialogOpen] = useState(false);
  const [fenString, setFenString] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

  // YouTube state
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ width: 640, height: 360 })
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
        // Always provide both the raw JSON (for revisions) and the generated HTML (for frontend rendering).
        // Using editor.getHTML() guarantees we store the rich‑text markup rather than plain text.
        onChange(editor.getJSON(), editor.getHTML());
      },
    editorProps: {
      attributes: {
        class: "prose prose-slate prose-blue max-w-none focus:outline-none min-h-[400px] px-6 py-4"
      }
    }
  });

  if (!editor) return null;

  const handleImageSubmit = async () => {
    if (imageUploadFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", imageUploadFile);
        formData.append("altText", imageAlt);

        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: formData
        });

        if (!response.ok) throw new Error("Upload failed");
        
        const asset = await response.json();
        editor.chain().focus().setImage({ src: asset.url, alt: imageAlt }).run();
        toast.success("Image uploaded and embedded.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload local image.");
      } finally {
        setUploading(false);
        setImageDialogOpen(false);
        setImageUploadFile(null);
        setImageUrl("");
        setImageAlt("");
      }
    } else if (imageUrl) {
      if (!imageAlt) {
        toast.error("Alt text is strictly required for accessibility compliance.");
        return;
      }
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
      setImageDialogOpen(false);
      setImageUrl("");
      setImageAlt("");
    }
  };

  const handleLinkSubmit = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl, target: "_blank" }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setLinkDialogOpen(false);
    setLinkUrl("");
  };

  const handleYoutubeSubmit = () => {
    if (youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
    }
    setYoutubeDialogOpen(false);
    setYoutubeUrl("");
  };

  const injectFenShortcode = () => {
    // Insert raw shortcode without wrapping <p>
    editor.chain().focus().insertContent(`[chess-diagram fen="${fenString}"]`).run();
    setFenDialogOpen(false);
  };

  const injectCalculatorShortcode = (type: string) => {
    // Insert raw calculator shortcode without wrapping <p>
    editor.chain().focus().insertContent(`[calculator type="${type}"]`).run();
    toast.success(`Embedded ${type} calculator widget`);
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
      {/* Editor Control Panel Toolbar */}
      <div className="bg-slate-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center justify-start sticky top-0 z-20">
        
        {/* Basic formatting */}
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-1.5 mr-1">
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("bold") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("italic") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("strike") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-1.5 mr-1">
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("heading", { level: 1 }) ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("heading", { level: 3 }) ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("heading", { level: 4 }) ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          >
            <Heading4 className="w-4 h-4" />
          </Button>
        </div>

        {/* Lists & Blocks */}
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-1.5 mr-1">
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("bulletList") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("orderedList") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("taskList") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <CheckSquare className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("blockquote") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>

        {/* Links & Media embeds */}
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-1.5 mr-1">
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("link") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => setLinkDialogOpen(true)}
          >
            <Link2 className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
            onClick={() => setImageDialogOpen(true)}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
            onClick={() => setYoutubeDialogOpen(true)}
          >
            <Video className="w-4 h-4" />
          </Button>
        </div>

        {/* Custom Highlighting & Code styling */}
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-1.5 mr-1">
          <Button
            type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}
            title="Highlight Yellow"
          >
            <span className="w-4 h-4 rounded-full bg-yellow-200 border border-gray-300" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#bbf7d0" }).run()}
            title="Highlight Green"
          >
            <span className="w-4 h-4 rounded-full bg-green-200 border border-gray-300" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#bfdbfe" }).run()}
            title="Highlight Blue"
          >
            <span className="w-4 h-4 rounded-full bg-blue-200 border border-gray-300" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("code") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code className="w-4 h-4" />
          </Button>
          <Button
            type="button" variant="ghost" size="icon" className={`h-8 w-8 rounded-lg ${editor.isActive("codeBlock") ? "bg-slate-200 text-blue-600" : ""}`}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <FileCode className="w-4 h-4" />
          </Button>
        </div>

        {/* Complex Tables controls */}
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-1.5 mr-1">
          <Button
            type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            title="Insert 3x3 Table"
          >
            <TableIcon className="w-4 h-4" />
          </Button>
          {editor.isActive("table") && (
            <>
              <Button
                type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-emerald-600 hover:text-emerald-700"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                title="Add Column"
              >
                <PlusCircle className="w-4 h-4" />
              </Button>
              <Button
                type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-600 hover:text-red-700"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                title="Delete Column"
              >
                <MinusCircle className="w-4 h-4" />
              </Button>
              <Button
                type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-emerald-600"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                title="Add Row"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-600"
                onClick={() => editor.chain().focus().deleteRow().run()}
                title="Delete Row"
              >
                <Layout className="w-4 h-4" />
              </Button>
              <Button
                type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-purple-600"
                onClick={() => editor.chain().focus().mergeOrSplit().run()}
                title="Merge/Split Cells"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Specialized Chess features */}
        <div className="flex items-center gap-1.5 ml-1">
          <Button
            type="button" variant="outline" size="sm" className="h-8 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1.5 font-bold"
            onClick={() => setFenDialogOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5" /> FEN Board
          </Button>

          <Button
            type="button" variant="outline" size="sm" className="h-8 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 font-bold"
            onClick={() => injectCalculatorShortcode("elo-rating-change")}
          >
            + ELO Calculator
          </Button>
        </div>

      </div>

      {/* Bubble Menu for quick inline actions (Tiptap v3 format) */}
      <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8 }}>
        <div className="bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 p-1 flex gap-0.5 items-center">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${editor.isActive("bold") ? "text-blue-400" : ""}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${editor.isActive("italic") ? "text-blue-400" : ""}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLinkDialogOpen(true)}
            className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${editor.isActive("link") ? "text-blue-400" : ""}`}
          >
            <Link2 className="w-4 h-4" />
          </button>
        </div>
      </BubbleMenu>

      {/* Editor Content Area */}
      <div className="flex-1 bg-white min-h-[450px]">
        <EditorContent editor={editor} />
      </div>

      {/* dialogs container */}
      
      {/* 1. Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <div className="space-y-1">
              <Label htmlFor="image-file">Local File Upload</Label>
              <Input
                id="image-file"
                type="file"
                accept="image/*"
                onChange={(e) => setImageUploadFile(e.target.files?.[0] || null)}
                disabled={uploading}
              />
            </div>
            
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="image-url">External Image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/chess-asset.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={!!imageUploadFile || uploading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="image-alt" className="flex items-center gap-1.5">
                <span>Alternative Text (Alt)</span>
                <span className="text-red-500 font-bold">*Required</span>
              </Label>
              <Input
                id="image-alt"
                placeholder="Alternative description for SEO & screen readers"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                disabled={uploading}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageDialogOpen(false)} disabled={uploading}>Cancel</Button>
            <Button onClick={handleImageSubmit} disabled={uploading || (!imageUrl && !imageUploadFile)}>
              {uploading ? "Uploading..." : "Insert Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Hyperlink</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="link-url">URL Path</Label>
            <Input
              id="link-url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleLinkSubmit}>Insert Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. YouTube Embed Dialog */}
      <Dialog open={youtubeDialogOpen} onOpenChange={setYoutubeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Embed Video (YouTube)</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="youtube-url">YouTube URL / Share Link</Label>
            <Input
              id="youtube-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setYoutubeDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleYoutubeSubmit}>Embed Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Chess FEN Diagram Dialog */}
      <Dialog open={fenDialogOpen} onOpenChange={setFenDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Insert FEN Chess Diagram</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="fen-string">Forsyth-Edwards Notation (FEN) String</Label>
              <Input
                id="fen-string"
                value={fenString}
                onChange={(e) => setFenString(e.target.value)}
                placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
              />
            </div>
            
            {/* Live diagram preview */}
            <div className="bg-slate-50 border rounded-xl p-4 flex flex-col items-center">
              <span className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Live Board Preview</span>
              <ChessFenBoard fen={fenString} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFenDialogOpen(false)}>Cancel</Button>
            <Button onClick={injectFenShortcode} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
              Embed Diagram
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}