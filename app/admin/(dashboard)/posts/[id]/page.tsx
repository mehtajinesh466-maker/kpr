"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TipTapEditor } from "@/components/admin/tiptap-editor";
import { MetadataSidebar } from "@/components/admin/metadata-sidebar";
import { ArrowLeft, RefreshCw, Eye, Save } from "lucide-react";
import Link from "next/link";
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

interface Tag {
  id: string;
  name: string;
}

interface Revision {
  id: string;
  title: string;
  createdAt: string;
  author?: { name: string } | null;
}

export default function AdminEditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Lists definitions
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [revisions, setRevisions] = useState<Revision[]>([]);

  // Post editor states
  const [postTitle, setPostTitle] = useState("");
  const [editorContent, setEditorContent] = useState<any>(null);
  const [editorHtml, setEditorHtml] = useState("");
  
  const [metadataState, setMetadataState] = useState({
    slug: "",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    status: "DRAFT" as "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED",
    scheduledAt: "",
    featuredImageUrl: "",
    featuredImageAlt: "",
    listingThumbnailUrl: "",
    isFeatured: false,
    isPinned: false,
    showTableOfContents: true,
    readTimeMinutes: 5,
    authorIds: [] as string[],
    categoryIds: [] as string[],
    tagIds: [] as string[]
  });

  // Load editor details
  const fetchEditorData = async () => {
    setLoading(true);
    try {
      const [postRes, authRes, catRes, tagRes] = await Promise.all([
        fetch(`/api/admin/posts/${params.id}`),
        fetch("/api/admin/authors"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/tags")
      ]);

      if (!postRes.ok) throw new Error("Failed to load post");
      const postData = await postRes.json();

      setPostTitle(postData.title);
      setEditorContent(postData.content);
      setEditorHtml(postData.contentHtml || "");
      
      setMetadataState({
        slug: postData.slug,
        metaTitle: postData.metaTitle || "",
        metaDescription: postData.metaDescription || "",
        focusKeyword: postData.focusKeyword || "",
        canonicalUrl: postData.canonicalUrl || "",
        status: postData.status,
        scheduledAt: postData.scheduledAt ? new Date(postData.scheduledAt).toISOString().substring(0, 16) : "",
        featuredImageUrl: postData.featuredImageUrl || "",
        featuredImageAlt: postData.featuredImageAlt || "",
        listingThumbnailUrl: postData.listingThumbnailUrl || "",
        isFeatured: postData.isFeatured,
        isPinned: postData.isPinned,
        showTableOfContents: postData.showTableOfContents,
        readTimeMinutes: postData.readTimeMinutes,
        authorIds: postData.authorIds || [],
        categoryIds: postData.categoryIds || [],
        tagIds: postData.tagIds || []
      });

      setRevisions(postData.revisions || []);
      
      if (authRes.ok) setAuthors(await authRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (tagRes.ok) setTags(await tagRes.json());
    } catch {
      toast.error("Failed to load editor components.");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditorData();
  }, [params.id]);

  // Handle PUT save updates
  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title: postTitle,
        content: editorContent,
        contentHtml: editorHtml,
        ...metadataState,
        // Format schedule coord if set
        scheduledAt: metadataState.status === "SCHEDULED" && metadataState.scheduledAt ? new Date(metadataState.scheduledAt).toISOString() : null
      };

      const response = await fetch(`/api/admin/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error();
      
      toast.success("Post saved successfully.");
      
      // Reload revisions
      const freshPostResponse = await fetch(`/api/admin/posts/${params.id}`);
      if (freshPostResponse.ok) {
        const fresh = await freshPostResponse.json();
        setRevisions(fresh.revisions || []);
      }
    } catch {
      toast.error("Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  // Restore post layout version
  const handleRestoreRevision = async (revisionId: string) => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`);
      if (!response.ok) throw new Error();
      const post = await response.json();
      const revision = post.revisions.find((r: any) => r.id === revisionId);
      
      if (!revision) {
        toast.error("Revision details not found.");
        return;
      }

      // Restore parameters
      setPostTitle(revision.title);
      setEditorContent(revision.content);
      
      const meta = revision.metadata || {};
      setMetadataState((prev) => ({
        ...prev,
        metaTitle: meta.metaTitle || "",
        metaDescription: meta.metaDescription || "",
        focusKeyword: meta.focusKeyword || "",
        canonicalUrl: meta.canonicalUrl || "",
        featuredImageUrl: meta.featuredImageUrl || "",
        featuredImageAlt: meta.featuredImageAlt || "",
        status: meta.status || "DRAFT"
      }));

      toast.success("Revision details restored in workspace. Save to publish.");
      
      // Force reload page to mount editor with restored content
      router.refresh();
    } catch {
      toast.error("Failed to restore revision.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-4 bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600">Mounting CMS workspace...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-white text-xs">
      
      {/* Editor Subheader Banner */}
      <div className="bg-slate-50 border-b border-gray-200 h-14 shrink-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="h-8 rounded-lg flex items-center gap-1 text-gray-600 hover:bg-slate-200/50">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-200" />
          <Input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Enter Post Title..."
            className="font-bold text-sm bg-transparent border-transparent hover:border-gray-200 focus:border-blue-500 rounded-lg h-8 px-2 w-[240px] sm:w-[320px] transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          {metadataState.slug && (
            <Link href={`/blog/${metadataState.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="h-8 rounded-lg flex items-center gap-1.5 font-semibold bg-white border-gray-200 text-gray-700 hover:bg-slate-50">
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </Button>
            </Link>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-8 rounded-lg bg-blue-600 hover:bg-blue-700 font-bold flex items-center gap-1.5 text-white shadow-sm shadow-blue-500/25 px-3"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save"}</span>
          </Button>
        </div>
      </div>

      {/* Editor Main Workspace split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Editor */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="max-w-4xl mx-auto space-y-4">
            <TipTapEditor
              initialContent={editorContent}
              onChange={(json, html) => {
                setEditorContent(json);
                setEditorHtml(html);
              }}
            />
          </div>
        </div>

        {/* Right Side: Metadata panel */}
        <aside className="w-80 shrink-0 h-full border-l border-gray-200">
          <MetadataSidebar
            postTitle={postTitle}
            state={metadataState}
            onChange={(updates) => setMetadataState((prev) => ({ ...prev, ...updates }))}
            authors={authors}
            categories={categories}
            tags={tags}
            revisions={revisions}
            onRestoreRevision={handleRestoreRevision}
            onSave={handleSave}
            saving={saving}
          />
        </aside>
      </div>

    </div>
  );
}
