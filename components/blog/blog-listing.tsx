"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Crown,
  TrendingUp,
  Filter,
  User,
  MessageCircle,
  Tag,
} from "lucide-react";
import type { SerializedCategory, SerializedPost } from "@/lib/blog-types";
import { formatReadTime } from "@/lib/read-time";

interface BlogListingProps {
  posts: SerializedPost[];
  featuredPosts: SerializedPost[];
  categories: SerializedCategory[];
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post, featured = false }: { post: SerializedPost; featured?: boolean }) {
  const primaryAuthor = post.authors[0];
  const primaryCategory = post.categories[0];

  return (
    <Card className="bg-white border-2 border-gray-200/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden h-full">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          {post.featuredImageUrl && (
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt ?? post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
          {featured && (
            <div className="absolute bottom-4 left-4 text-white">
              <Crown className="w-5 h-5" />
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
            {primaryCategory && (
              <span className="bg-red-50 text-[#7A0C0C] px-2 py-1 rounded-full text-xs font-medium">
                {primaryCategory.name}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatReadTime(post.readTimeMinutes)}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7A0C0C] transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>{primaryAuthor?.name ?? "KPR Chess"}</span>
              {post.commentCount > 0 && (
                <span className="flex items-center gap-1 ml-2">
                  <MessageCircle className="w-3 h-3" />
                  {post.commentCount}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              className="text-[#7A0C0C] hover:text-[#5E0909] hover:bg-red-50/50 group/btn"
            >
              Read Article
              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function BlogListing({ posts, featuredPosts, categories }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" ||
        post.categories.some((c) => c.slug === activeCategory);
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      if (sortBy === "popular") return b.viewCount - a.viewCount;
      return (
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
      );
    });
  }, [filteredPosts, sortBy]);

  return (
    <>
      {featuredPosts.length > 0 && (
        <section className="relative py-16 bg-[#FCF5F5] border-y border-red-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Featured Insights
                  </h2>
                  <p className="text-gray-600">
                    Deep dives into chess strategy and psychology
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <FadeIn key={post.id} delay={index * 0.2}>
                  <PostCard post={post} featured />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
                      <Search className="w-4 h-4" />
                      Search
                    </div>
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-xl"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
                      <Filter className="w-4 h-4" />
                      Categories
                    </div>
                    <nav className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.slug)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-300 group ${
                            activeCategory === category.slug
                              ? "bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/20 shadow-lg shadow-red-950/20"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-medium">{category.name}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              activeCategory === category.slug
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-[#7A0C0C]"
                            }`}
                          >
                            {category.count}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
                      <TrendingUp className="w-4 h-4" />
                      Sort By
                    </div>
                    <div className="space-y-2">
                      {[
                        { id: "latest" as const, label: "Latest Articles" },
                        { id: "popular" as const, label: "Most Popular" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-300 ${
                            sortBy === option.id
                              ? "bg-red-50 text-[#7A0C0C] font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeCategory === "all"
                      ? "All Articles"
                      : categories.find((c) => c.slug === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {sortedPosts.length} article{sortedPosts.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

              {sortedPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or category filter.
                  </p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {sortedPosts.map((post, index) => (
                    <FadeIn key={post.id} delay={index * 0.05}>
                      <PostCard post={post} />
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
