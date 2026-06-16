"use client";

import { useState } from "react";
import { CommentForm } from "./comment-form";
import { MessageSquare, CornerDownRight, Reply, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentReply {
  id: string;
  authorName: string;
  createdAt: string | Date;
  content: string;
}

interface Comment {
  id: string;
  authorName: string;
  createdAt: string | Date;
  content: string;
  replies: CommentReply[];
}

interface CommentsSectionProps {
  postId: string;
  initialComments: Comment[];
}

export function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="border-t border-slate-100 pt-12 mt-12">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-6 h-6 text-purple-600 animate-pulse" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Community Comments
        </h2>
      </div>

      {initialComments.length > 0 ? (
        <div className="space-y-8 mb-12">
          {initialComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:border-purple-200/50 dark:hover:border-purple-900/50 hover:shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">
                    {comment.authorName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
                  }
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 gap-1.5 font-semibold text-xs animate-none"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply
                </Button>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {comment.content}
              </p>

              {/* Inline Reply Form for Parent Comment */}
              {activeReplyId === comment.id && (
                <div className="mt-6 p-5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-inner">
                  <div className="text-xs font-semibold text-purple-600 mb-3 flex items-center gap-1">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    Replying to {comment.authorName}
                  </div>
                  <CommentForm
                    postId={postId}
                    parentId={comment.id}
                    onSuccess={() => setActiveReplyId(null)}
                    onCancel={() => setActiveReplyId(null)}
                  />
                </div>
              )}

              {/* Replies Thread List */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 space-y-4 pl-4 md:pl-6 border-l-2 border-purple-100 dark:border-purple-900/40">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-white/60 dark:bg-slate-900/30 rounded-xl p-4 border border-slate-100/50 dark:border-slate-800"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {reply.authorName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(reply.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 mb-12">
          <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Be the first to share your thoughts on this article.
          </p>
        </div>
      )}

      {/* Main Comment Form (Top Level) */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Leave a Comment
        </h3>
        <CommentForm postId={postId} />
      </div>
    </section>
  );
}
