"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus, Search, Calendar, User, Eye, Trash2, Edit3, MessageCircle, Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface AdminPost {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  scheduledAt: string | null;
  isFeatured: boolean;
  isPinned: boolean;
  viewCount: number;
  authors: { author: { name: string } }[];
  categories: { category: { name: string } }[];
  _count: { comments: number };
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [creating, setCreating] = useState(false);

  // Load all posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = `/api/admin/posts?status=${status}&search=${encodeURIComponent(search)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setPosts(data);
    } catch {
      toast.error("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [status, search]);

  // Create a blank draft post and redirect to the editor workspace
  const handleCreatePost = async () => {
    setCreating(true);
    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled Draft Post",
          excerpt: "",
          content: { type: "doc", content: [] },
          contentHtml: "<p></p>",
          status: "DRAFT"
        })
      });

      if (!response.ok) throw new Error();
      const newPost = await response.json();
      toast.success("Draft post created.");
      router.push(`/admin/posts/${newPost.id}`);
    } catch {
      toast.error("Failed to create new post.");
    } finally {
      setCreating(false);
    }
  };

  // Delete post from the server
  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post permanently? This cannot be undone.")) return;
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error();
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Post deleted successfully.");
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const getStatusBadge = (postStatus: string) => {
    switch (postStatus) {
      case "PUBLISHED":
        return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px]">PUBLISHED</span>;
      case "DRAFT":
        return <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold text-[10px]">DRAFT</span>;
      case "SCHEDULED":
        return <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold text-[10px]">SCHEDULED</span>;
      case "ARCHIVED":
        return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold text-[10px]">ARCHIVED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Title & Header Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Posts Library</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Write, review, publish, and schedule your editorial blog posts.
          </p>
        </div>

        <Button
          onClick={handleCreatePost}
          disabled={creating}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/25 h-9"
        >
          <Plus className="w-4 h-4" />
          <span>{creating ? "Creating..." : "Write New Post"}</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-gray-200/80 shadow-sm rounded-2xl bg-white">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-gray-200 bg-slate-50 focus-visible:bg-white h-9"
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="rounded-xl border-gray-200 h-9">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="DRAFT">Drafts</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table List */}
      <Card className="border-gray-200/80 shadow-sm rounded-2xl bg-white overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 text-xs font-bold">Retrieving posts library...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center max-w-sm mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Articles Found</h3>
            <p className="text-slate-500 text-xs">
              No matching records found. Click "Write New Post" to publish an article!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs text-gray-700">
            <table className="min-w-full divide-y divide-gray-100 text-left">
              <thead className="bg-slate-50 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Authors</th>
                  <th className="px-6 py-4">Categories</th>
                  <th className="px-6 py-4">Release Date</th>
                  <th className="px-6 py-4 text-center">Stats</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="space-y-1 max-w-[280px]">
                        <span className="font-bold text-slate-900 line-clamp-1 flex items-center gap-1.5">
                          {post.title}
                          {post.isPinned && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono truncate">/{post.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(post.status)}</td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">
                        {post.authors.map((a) => a.author.name).join(", ") || "Unassigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">
                        {post.categories.map((c) => c.category.name).join(", ") || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {post.status === "SCHEDULED" && post.scheduledAt ? (
                        <span className="text-amber-600 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.scheduledAt).toLocaleDateString()}
                        </span>
                      ) : post.publishedAt ? (
                        new Date(post.publishedAt).toLocaleDateString()
                      ) : (
                        "Draft Stage"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-slate-500">
                        <div className="flex items-center gap-1" title="Views">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{post.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Comments">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post._count.comments}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/posts/${post.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePost(post.id)}
                          className="h-8 w-8 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
