"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MessageSquare, Check, X, ShieldAlert, Edit2, Trash2, ShieldX,
  Search, ListFilter, UserX, AlertCircle, Plus, Undo2
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type CommentStatus = "PENDING" | "APPROVED" | "REJECTED" | "SPAM";

interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  authorName: string;
  authorEmail: string;
  content: string;
  status: CommentStatus;
  ipAddress: string | null;
  createdAt: string;
  post: { title: string; slug: string };
}

interface Ban {
  id: string;
  type: "EMAIL" | "IP";
  value: string;
  reason: string | null;
  createdAt: string;
}

export default function AdminCommentsPage() {
  // Lists states
  const [comments, setComments] = useState<Comment[]>([]);
  const [bans, setBans] = useState<Ban[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("queue");
  const [activeStatusFilter, setActiveStatusFilter] = useState("PENDING");

  // Selection states (for bulk actions)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Editing state
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContentText, setEditContentText] = useState("");

  // Ban creation states
  const [banType, setBanType] = useState<"EMAIL" | "IP">("EMAIL");
  const [banValue, setBanValue] = useState("");
  const [banReason, setBanReason] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/comments?status=${activeStatusFilter}`);
      if (!response.ok) throw new Error();
      setComments(await response.json());
      setSelectedIds([]);
    } catch {
      toast.error("Failed to retrieve comments queue.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBans = async () => {
    try {
      const response = await fetch("/api/admin/comments/bans");
      if (response.ok) setBans(await response.json());
    } catch {
      toast.error("Failed to load ban blacklists.");
    }
  };

  useEffect(() => {
    if (activeTab === "queue") {
      fetchComments();
    } else {
      fetchBans();
    }
  }, [activeTab, activeStatusFilter]);

  // Single comment moderation action
  const handleModerateSingle = async (id: string, status: CommentStatus) => {
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error();
      setComments(comments.filter((c) => c.id !== id));
      toast.success(`Comment status marked as ${status}.`);
    } catch {
      toast.error("Failed to moderate comment.");
    }
  };

  // Bulk comment moderation
  const handleModerateBulk = async (status: CommentStatus) => {
    if (selectedIds.length === 0) return;
    try {
      const response = await fetch("/api/admin/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, status })
      });
      if (!response.ok) throw new Error();
      setComments(comments.filter((c) => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      toast.success(`Successfully updated ${selectedIds.length} comments.`);
    } catch {
      toast.error("Bulk moderation failed.");
    }
  };

  // Content correction (inline editing prior to approval)
  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContentText(comment.content);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editContentText.trim()) return;
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContentText })
      });
      if (!response.ok) throw new Error();
      const updated = await response.json();
      setComments(comments.map((c) => (c.id === id ? { ...c, content: updated.content } : c)));
      setEditingCommentId(null);
      toast.success("Comment content updated.");
    } catch {
      toast.error("Failed to edit comment content.");
    }
  };

  // Delete comment completely
  const handleDeleteComment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment permanently?")) return;
    try {
      const response = await fetch(`/api/admin/comments/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error();
      setComments(comments.filter((c) => c.id !== id));
      toast.success("Comment deleted.");
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  // Ban author (blacklist creation)
  const handleBanAuthor = async (authorEmail: string, ipAddress: string | null) => {
    const value = prompt("Ban commenter by Email or IP? Enter 'EMAIL' or 'IP' to proceed:", "EMAIL");
    if (!value) return;

    const type = value.toUpperCase() === "IP" ? "IP" : "EMAIL";
    const targetValue = type === "IP" ? ipAddress : authorEmail;

    if (!targetValue) {
      toast.error(`No ${type} address found for this commenter.`);
      return;
    }

    const reason = prompt(`Enter reason for banning ${targetValue}:`, "Spam or abuse");

    try {
      const response = await fetch("/api/admin/comments/bans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value: targetValue, reason })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ban failed");
      }
      toast.success(`Successfully banned ${targetValue}.`);
      
      // Auto reject pending comments from this author
      if (type === "EMAIL") {
        const matchingPendingIds = comments
          .filter((c) => c.authorEmail === targetValue)
          .map((c) => c.id);
        if (matchingPendingIds.length > 0) {
          await fetch("/api/admin/comments", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: matchingPendingIds, status: "REJECTED" })
          });
          setComments(comments.filter((c) => c.authorEmail !== targetValue));
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to issue ban.");
    }
  };

  // Inline Blacklist create
  const handleCreateBanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!banValue.trim()) return;

    try {
      const response = await fetch("/api/admin/comments/bans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: banType,
          value: banValue.trim(),
          reason: banReason.trim()
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed");
      }
      toast.success("Ban filter added.");
      setBanValue("");
      setBanReason("");
      fetchBans();
    } catch (err: any) {
      toast.error(err.message || "Failed to add ban entry.");
    }
  };

  // Remove ban filter
  const handleRevokeBan = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/comments/bans?id=${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error();
      setBans(bans.filter((b) => b.id !== id));
      toast.success("Ban filter revoked.");
    } catch {
      toast.error("Failed to revoke ban.");
    }
  };

  // Checkbox helpers
  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(comments.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto text-xs">
      
      {/* Page header title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-emerald-600" />
          <span>Comments Control Center</span>
        </h1>
        <p className="text-slate-500 mt-1">
          Review, edit, approve, reject reader comments, and manage Email/IP blacklists.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-200/50 p-1 rounded-xl">
          <TabsTrigger value="queue" className="rounded-lg font-bold">Comments Staging</TabsTrigger>
          <TabsTrigger value="bans" className="rounded-lg font-bold">Blacklist Filters</TabsTrigger>
        </TabsList>

        {/* 1. Comments Staging Queue Tab */}
        <TabsContent value="queue" className="space-y-4 outline-none">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Status filters */}
            <div className="flex bg-slate-200/50 rounded-lg p-0.5 border border-gray-200">
              {[
                { id: "PENDING", label: "Pending Review" },
                { id: "APPROVED", label: "Approved" },
                { id: "REJECTED", label: "Rejected" },
                { id: "SPAM", label: "Spam Flagged" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveStatusFilter(filter.id)}
                  className={`px-3.5 py-1.5 font-bold rounded-md transition-all ${
                    activeStatusFilter === filter.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Bulk Actions panel */}
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-xl animate-fade-in">
                <span className="font-bold text-emerald-800 mr-2">{selectedIds.length} comments selected:</span>
                <Button onClick={() => handleModerateBulk("APPROVED")} size="sm" className="h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold text-white rounded-md">
                  Approve Bulk
                </Button>
                <Button onClick={() => handleModerateBulk("REJECTED")} size="sm" className="h-7 px-2.5 bg-slate-700 hover:bg-slate-800 text-[10px] font-bold text-white rounded-md">
                  Reject Bulk
                </Button>
                <Button onClick={() => handleModerateBulk("SPAM")} size="sm" className="h-7 px-2.5 bg-red-600 hover:bg-red-700 text-[10px] font-bold text-white rounded-md">
                  Spam Bulk
                </Button>
              </div>
            )}
          </div>

          <Card className="border-gray-200/80 shadow-sm rounded-2xl bg-white overflow-hidden">
            {loading ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-500 font-bold">Scanning database queue...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="py-20 text-center max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Staging Queue is Empty</h3>
                <p className="text-slate-500 text-[11px]">
                  No comments found matching status "{activeStatusFilter}". Good job!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-left">
                  <thead className="bg-slate-50 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="w-12 px-6 py-4 text-center">
                        <Checkbox
                          checked={selectedIds.length === comments.length && comments.length > 0}
                          onCheckedChange={handleToggleSelectAll}
                        />
                      </th>
                      <th className="px-6 py-4">Commenter</th>
                      <th className="px-6 py-4">Comment Content</th>
                      <th className="px-6 py-4">Article Details</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {comments.map((comment) => {
                      const isSelected = selectedIds.includes(comment.id);
                      const isEditing = editingCommentId === comment.id;

                      return (
                        <tr key={comment.id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? "bg-blue-50/10" : ""}`}>
                          <td className="px-6 py-4 text-center">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleToggleSelectRow(comment.id, !!checked)}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-0.5 max-w-[160px]">
                              <span className="font-bold text-slate-900 block truncate">{comment.authorName}</span>
                              <span className="text-slate-400 block truncate font-mono">{comment.authorEmail}</span>
                              {comment.ipAddress && (
                                <span className="text-[10px] text-slate-400 block font-mono">IP: {comment.ipAddress}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <div className="space-y-2 max-w-[400px]">
                                <Textarea
                                  value={editContentText}
                                  onChange={(e) => setEditContentText(e.target.value)}
                                  rows={3}
                                  className="text-xs"
                                />
                                <div className="flex gap-1">
                                  <Button onClick={() => handleSaveEdit(comment.id)} size="sm" className="h-7 px-2.5 bg-blue-600 text-white font-bold rounded-md">Save</Button>
                                  <Button onClick={() => setEditingCommentId(null)} size="sm" variant="ghost" className="h-7 px-2.5 rounded-md text-gray-500">Cancel</Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1.5 max-w-[400px]">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                                <span className="text-[10px] text-slate-400 block font-mono">
                                  Submitted on: {new Date(comment.createdAt).toLocaleString()}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Link href={`/blog/${comment.post.slug}`} target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline font-bold block max-w-[160px] truncate">
                              {comment.post.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              {activeStatusFilter === "PENDING" && (
                                <Button
                                  onClick={() => handleModerateSingle(comment.id, "APPROVED")}
                                  variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:bg-green-50 rounded-lg"
                                  title="Approve Comment"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              
                              {activeStatusFilter === "APPROVED" && (
                                <Button
                                  onClick={() => handleModerateSingle(comment.id, "PENDING")}
                                  variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100 rounded-lg"
                                  title="Send back to Pending Staging"
                                >
                                  <Undo2 className="w-4 h-4" />
                                </Button>
                              )}

                              <Button
                                onClick={() => handleStartEdit(comment)}
                                variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Edit Content"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>

                              <Button
                                onClick={() => handleBanAuthor(comment.authorEmail, comment.ipAddress)}
                                variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:bg-amber-50 rounded-lg"
                                title="Ban Commenter"
                              >
                                <UserX className="w-4 h-4" />
                              </Button>

                              {activeStatusFilter !== "SPAM" && (
                                <Button
                                  onClick={() => handleModerateSingle(comment.id, "SPAM")}
                                  variant="ghost" size="icon" className="h-8 w-8 text-orange-600 hover:bg-orange-50 rounded-lg"
                                  title="Mark as Spam"
                                >
                                  <ShieldX className="w-4 h-4" />
                                </Button>
                              )}

                              <Button
                                onClick={() => handleDeleteComment(comment.id)}
                                variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 rounded-lg"
                                title="Delete Comment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* 2. Blacklist Filters Tab */}
        <TabsContent value="bans" className="grid lg:grid-cols-12 gap-8 items-start outline-none">
          {/* Create new Ban panel */}
          <div className="lg:col-span-4">
            <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-100 border-b border-gray-200 p-4 font-bold text-slate-800">
                <CardTitle className="text-sm">Create Blacklist filter</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <form onSubmit={handleCreateBanSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="ban-type" className="font-bold text-gray-600">Filter Type</Label>
                    <Select value={banType} onValueChange={(val: any) => setBanType(val)}>
                      <SelectTrigger id="ban-type" className="h-8 rounded-lg bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMAIL">Email Address</SelectItem>
                        <SelectItem value="IP">IP Coordinate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ban-value" className="font-bold text-gray-600">
                      {banType === "EMAIL" ? "Email Address" : "IP Address"}
                    </Label>
                    <Input
                      id="ban-value"
                      required
                      value={banValue}
                      onChange={(e) => setBanValue(e.target.value)}
                      placeholder={banType === "EMAIL" ? "spammer@email.com" : "192.168.1.1"}
                      className="h-8 rounded-lg bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ban-reason" className="font-bold text-gray-600">Reason for Ban</Label>
                    <Input
                      id="ban-reason"
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      placeholder="Comment abuse or bots submissions"
                      className="h-8 rounded-lg bg-white"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 font-bold h-8 rounded-lg flex items-center justify-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add Block Filter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Active bans table */}
          <div className="lg:col-span-8">
            <Card className="border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-100 border-b border-gray-200 p-4 font-bold text-slate-800">
                <CardTitle className="text-sm">Active Blacklists ({bans.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {bans.length === 0 ? (
                  <div className="py-20 text-center max-w-sm mx-auto space-y-2">
                    <AlertCircle className="w-10 h-10 text-gray-300 mx-auto" />
                    <h3 className="font-bold text-slate-800">No Banned Addresses</h3>
                    <p className="text-slate-500 text-[10px]">No Email or IP blacklists active on Chesseasy.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100 text-left">
                      <thead className="bg-slate-50 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Type</th>
                          <th className="px-6 py-3">Banned Value</th>
                          <th className="px-6 py-3">Reason</th>
                          <th className="px-6 py-3">Created</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {bans.map((ban) => (
                          <tr key={ban.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-3">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                                ban.type === "EMAIL" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                              }`}>
                                {ban.type}
                              </span>
                            </td>
                            <td className="px-6 py-3 font-mono text-slate-900">{ban.value}</td>
                            <td className="px-6 py-3 text-slate-500">{ban.reason || "No reason given"}</td>
                            <td className="px-6 py-3 text-slate-400">
                              {new Date(ban.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-3 text-right">
                              <Button
                                onClick={() => handleRevokeBan(ban.id)}
                                variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:bg-red-50 rounded-lg"
                                title="Revoke Ban Filter"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
