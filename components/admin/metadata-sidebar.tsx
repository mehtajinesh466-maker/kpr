"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Tag, User, Folder, Layout, ShieldAlert, Sparkles, Check, AlertCircle, RotateCcw } from "lucide-react";
import { slugify } from "@/lib/slug";
import { toast } from "sonner";

interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

interface TagType {
  id: string;
  name: string;
}

interface Revision {
  id: string;
  title: string;
  createdAt: string;
  author?: { name: string } | null;
}

interface MetadataState {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";
  scheduledAt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  listingThumbnailUrl: string;
  isFeatured: boolean;
  isPinned: boolean;
  showTableOfContents: boolean;
  readTimeMinutes: number;
  authorIds: string[];
  categoryIds: string[];
  tagIds: string[];
}

interface MetadataSidebarProps {
  postTitle: string;
  state: MetadataState;
  onChange: (updates: Partial<MetadataState>) => void;
  authors: Author[];
  categories: Category[];
  tags: TagType[];
  revisions: Revision[];
  onRestoreRevision: (revisionId: string) => void;
  onSave: () => void;
  saving: boolean;
}

export function MetadataSidebar({
  postTitle,
  state,
  onChange,
  authors,
  categories,
  tags,
  revisions,
  onRestoreRevision,
  onSave,
  saving
}: MetadataSidebarProps) {
  const [showAdvance, setShowAdvance] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  const [newCatInput, setNewCatInput] = useState("");
  const [newCatParent, setNewCatParent] = useState("none");

  // Auto-generate slug from post title when editing a blank or new post
  useEffect(() => {
    if (postTitle && !state.slug) {
      onChange({ slug: slugify(postTitle) });
    }
  }, [postTitle]);

  // Handle meta description boundary parameters
  const metaDescLength = state.metaDescription?.length || 0;
  const isMetaDescOptimal = metaDescLength >= 150 && metaDescLength <= 160;

  // Render hierarchical category tree options
  const renderCategoryTree = (parentId: string | null = null, depth = 0) => {
    const levelCategories = categories.filter((c) => c.parentId === parentId);
    if (levelCategories.length === 0) return null;

    return (
      <div className={`space-y-2 ${depth > 0 ? "pl-4 border-l border-gray-100" : ""}`}>
        {levelCategories.map((cat) => {
          const checked = state.categoryIds.includes(cat.id);
          return (
            <div key={cat.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${cat.id}`}
                  checked={checked}
                  onCheckedChange={(isChecked) => {
                    const updated = isChecked
                      ? [...state.categoryIds, cat.id]
                      : state.categoryIds.filter((id) => id !== cat.id);
                    onChange({ categoryIds: updated });
                  }}
                />
                <Label htmlFor={`cat-${cat.id}`} className="text-xs font-semibold text-gray-700 cursor-pointer">
                  {cat.name}
                </Label>
              </div>
              {renderCategoryTree(cat.id, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  // Add a new Category inline
  const handleAddCategory = async () => {
    if (!newCatInput.trim()) return;
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatInput.trim(),
          parentId: newCatParent === "none" ? null : newCatParent
        })
      });
      if (!response.ok) throw new Error();
      const created = await response.json();
      // Auto check created category
      onChange({ categoryIds: [...state.categoryIds, created.id] });
      setNewCatInput("");
      setNewCatParent("none");
      toast.success(`Category "${created.name}" created.`);
    } catch {
      toast.error("Failed to create category.");
    }
  };

  // Add a new Tag inline
  const handleAddTag = async () => {
    if (!newTagInput.trim()) return;
    try {
      const response = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTagInput.trim() })
      });
      if (!response.ok) throw new Error();
      const created = await response.json();
      // Auto check created tag
      onChange({ tagIds: [...state.tagIds, created.id] });
      setNewTagInput("");
      toast.success(`Tag "${created.name}" created.`);
    } catch {
      toast.error("Failed to create tag.");
    }
  };

  return (
    <div className="bg-slate-50 border-l border-gray-200 h-full overflow-y-auto p-5 flex flex-col gap-6 text-xs text-gray-700">
      
      {/* Action panel button */}
      <div className="flex gap-2">
        <Button onClick={onSave} disabled={saving} className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold h-9 shadow-md shadow-blue-500/25">
          {saving ? "Saving..." : "Save Post"}
        </Button>
      </div>

      {/* 1. Status & Scheduling */}
      <Card className="border-gray-200 rounded-xl bg-white shadow-sm overflow">
        <div className="bg-slate-100 px-4 py-1 font-bold flex items-center gap-2.5 border-b border-gray-200 text-gray-800">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Publish Settings</span>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="post-status" className="font-bold text-gray-600">Publication Status</Label>
            <Select
              value={state.status}
              onValueChange={(val: any) => {
                onChange({
                  status: val,
                  scheduledAt: val !== "SCHEDULED" ? "" : state.scheduledAt
                });
              }}
            >
              <SelectTrigger id="post-status" className="h-8 rounded-lg">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {state.status === "SCHEDULED" && (
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <Label htmlFor="schedule-time" className="font-bold text-gray-600">Schedule Release Coordinates</Label>
              <Input
                id="schedule-time"
                type="datetime-local"
                value={state.scheduledAt}
                onChange={(e) => onChange({ scheduledAt: e.target.value })}
                className="h-8 rounded-lg"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Primary SEO metadata panel */}
      <Card className="border-gray-200 rounded-xl bg-white shadow-sm overflow">
        <div className="bg-slate-100 px-4 py-2 font-bold flex items-center gap-1.5 border-b border-gray-200 text-gray-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>SEO Metadata Settings</span>
        </div>
        <CardContent className="p-4 space-y-4">
          
          <div className="space-y-1.5">
            <Label htmlFor="post-slug" className="font-bold text-gray-600">URL Slug path</Label>
            <Input
              id="post-slug"
              value={state.slug}
              onChange={(e) => onChange({ slug: slugify(e.target.value) })}
              placeholder="url-path-of-post"
              className="h-8 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo-title" className="font-bold text-gray-600">Custom Meta Title</Label>
            <Input
              id="seo-title"
              value={state.metaTitle}
              onChange={(e) => onChange({ metaTitle: e.target.value })}
              placeholder="Search engine index title"
              className="h-8 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="seo-desc" className="font-bold text-gray-600">Meta Description</Label>
              <span className={`text-[10px] font-bold ${
                isMetaDescOptimal ? "text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full" : "text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full"
              }`}>
                {metaDescLength} / 150-160 chars
              </span>
            </div>
            <Textarea
              id="seo-desc"
              rows={3}
              value={state.metaDescription}
              onChange={(e) => onChange({ metaDescription: e.target.value })}
              placeholder="Brief summary displayed in search engines"
              className="rounded-lg resize-none text-xs"
            />
            {metaDescLength > 0 && !isMetaDescOptimal && (
              <p className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Ideal description length is strictly 150-160 characters.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="focus-keyword" className="font-bold text-gray-600">Focus Keyword</Label>
            <Input
              id="focus-keyword"
              value={state.focusKeyword}
              onChange={(e) => onChange({ focusKeyword: e.target.value })}
              placeholder="e.g. Sicilian Defense"
              className="h-8 rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="canonical-override" className="font-bold text-gray-600">Canonical URL Override</Label>
            <Input
              id="canonical-override"
              value={state.canonicalUrl}
              onChange={(e) => onChange({ canonicalUrl: e.target.value })}
              placeholder="https://originalsite.com/post"
              className="h-8 rounded-lg"
            />
          </div>

        </CardContent>
      </Card>

      {/* 3. Taxonomy: Categories and Tags */}
      <Card className="border-gray-200 rounded-xl bg-white shadow-sm overflow">
        <div className="bg-slate-100 px-4 py-2 font-bold flex items-center gap-1.5 border-b border-gray-200 text-gray-800">
          <Folder className="w-3.5 h-3.5 text-blue-600" />
          <span>Categories & Tags</span>
        </div>
        <CardContent className="p-4 space-y-5">
          {/* Hierarchical Categories picker */}
          <div className="space-y-2">
            <Label className="font-bold text-gray-600">Categories (Tree Hierarchy)</Label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 max-h-[160px] overflow-y-auto space-y-2">
              {renderCategoryTree(null)}
            </div>
            
            {/* Inline creation macro */}
            <div className="pt-2 flex flex-col gap-2 bg-gray-50/50 p-2.5 rounded-lg border border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Inline Category Creator</span>
              <div className="flex gap-1.5">
                <Input
                  placeholder="New Category name"
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  className="h-7 text-[11px] rounded-md bg-white"
                />
                <Button onClick={handleAddCategory} type="button" size="sm" className="h-7 px-2 bg-slate-700 hover:bg-slate-800 text-[10px] font-bold rounded-md">
                  Add
                </Button>
              </div>
              <Select value={newCatParent} onValueChange={setNewCatParent}>
                <SelectTrigger className="h-7 text-[10px] rounded-md bg-white">
                  <SelectValue placeholder="Parent Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Root Category)</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Flat Tags list */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <Label className="font-bold text-gray-600">Tags (Flat Taxonomy)</Label>
            <div className="flex flex-wrap gap-1.5 bg-gray-50 border border-gray-200 rounded-xl p-3 max-h-[120px] overflow-y-auto">
              {tags.map((tag) => {
                const checked = state.tagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => {
                      const updated = checked
                        ? state.tagIds.filter((id) => id !== tag.id)
                        : [...state.tagIds, tag.id];
                      onChange({ tagIds: updated });
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-semibold transition-all ${
                      checked
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Tag className="w-2.5 h-2.5 shrink-0" />
                    <span>{tag.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Inline tag creator */}
            <div className="flex gap-1.5 pt-1">
              <Input
                placeholder="New Tag label"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="h-7 text-[11px] rounded-md bg-white"
              />
              <Button onClick={handleAddTag} type="button" size="sm" className="h-7 px-2.5 bg-slate-700 hover:bg-slate-800 text-[10px] font-bold rounded-md">
                Add Tag
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* 4. Co-Authors Attribution */}
      <Card className="border-gray-200 rounded-xl bg-white shadow-sm overflow">
        <div className="bg-slate-100 px-4 py-2 font-bold flex items-center gap-1.5 border-b border-gray-200 text-gray-800">
          <User className="w-3.5 h-3.5 text-blue-600" />
          <span>Author Attribution</span>
        </div>
        <CardContent className="p-4 space-y-2">
          <Label className="font-bold text-gray-600">Select Post Authors</Label>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2 max-h-[140px] overflow-y-auto">
            {authors.map((author) => {
              const checked = state.authorIds.includes(author.id);
              return (
                <div key={author.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`author-${author.id}`}
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      const updated = isChecked
                        ? [...state.authorIds, author.id]
                        : state.authorIds.filter((id) => id !== author.id);
                      onChange({ authorIds: updated });
                    }}
                  />
                  <Label htmlFor={`author-${author.id}`} className="text-xs font-semibold text-gray-700 cursor-pointer">
                    {author.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 5. Promotion Flags & Layout Settings */}
      <Card className="border-gray-200 rounded-xl bg-white shadow-sm overflow">
        <div className="bg-slate-100 px-4 py-2 font-bold flex items-center gap-1.5 border-b border-gray-200 text-gray-800">
          <Layout className="w-3.5 h-3.5 text-blue-600" />
          <span>Flags & Display UI</span>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-gray-700 block">Featured Content</span>
              <span className="text-[10px] text-gray-400">Pushes to homepage showcase</span>
            </div>
            <Switch
              checked={state.isFeatured}
              onCheckedChange={(val) => onChange({ isFeatured: val })}
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="space-y-0.5">
              <span className="font-bold text-gray-700 block">Pinned Article</span>
              <span className="text-[10px] text-gray-400">Lock permanently at peak of index views</span>
            </div>
            <Switch
              checked={state.isPinned}
              onCheckedChange={(val) => onChange({ isPinned: val })}
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="space-y-0.5">
              <span className="font-bold text-gray-700 block">Sticky Table of Contents</span>
              <span className="text-[10px] text-gray-400">Generates sticky headers sidebar</span>
            </div>
            <Switch
              checked={state.showTableOfContents}
              onCheckedChange={(val) => onChange({ showTableOfContents: val })}
            />
          </div>

          <div className="space-y-1.5 pt-3 border-t border-gray-100">
            <Label htmlFor="read-time-minutes" className="font-bold text-gray-600">Estimated Reading Time (Min)</Label>
            <Input
              id="read-time-minutes"
              type="number"
              min={1}
              value={state.readTimeMinutes}
              onChange={(e) => onChange({ readTimeMinutes: Number(e.target.value) || 5 })}
              className="h-8 rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* 6. Post Revision Archiving (Last 10 sequential delta logs) */}
      {revisions.length > 0 && (
        <Card className="border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 font-bold flex items-center gap-1.5 border-b border-gray-200 text-gray-800">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
            <span>Post Revisions ({revisions.length})</span>
          </div>
          <CardContent className="p-3">
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {revisions.map((rev) => (
                <div key={rev.id} className="flex justify-between items-center bg-gray-50 border p-2 rounded-lg">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[10px] text-slate-800 line-clamp-1">{rev.title}</span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      {new Date(rev.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                      {rev.author?.name ? ` by ${rev.author.name}` : ""}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to restore this post content? Current un-saved progress will be written as a new revision.")) {
                        onRestoreRevision(rev.id);
                      }
                    }}
                    className="h-7 px-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Restore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
