"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CommentForm({ postId, parentId, onSuccess, onCancel }: CommentFormProps) {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, parentId, authorName, authorEmail, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Failed to submit comment");
        return;
      }

      setStatus("success");
      setMessage("Your comment has been submitted and is awaiting moderation.");
      setAuthorName("");
      setAuthorEmail("");
      setContent("");
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="authorName">Name</Label>
          <Input
            id="authorName"
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="authorEmail">Email</Label>
          <Input
            id="authorEmail"
            type="email"
            required
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="content">Comment</Label>
        <Textarea
          id="content"
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
        />
      </div>

      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Comment"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
