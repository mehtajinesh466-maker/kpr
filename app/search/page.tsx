import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { searchPosts } from "@/lib/blog";
import { serializePost } from "@/lib/blog-serialize";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Search as SearchIcon } from "lucide-react";
import { formatReadTime } from "@/lib/read-time";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";
  return {
    title: query ? `Search Results for "${query}"` : "Search Articles",
    description: `Browse articles and tutorials matching search query "${query}".`,
  };
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || "";
  const rawPosts = await searchPosts(query, 20);
  const posts = rawPosts.map(serializePost);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header section with active query or prompt */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {query ? `Search Results for "${query}"` : "Search the Blog"}
            </h1>
            <p className="text-lg text-slate-600">
              {query
                ? `We found ${posts.length} ${posts.length === 1 ? "article" : "articles"} matching your search.`
                : "Enter keywords below to search through our guides, strategies, and chess concepts."}
            </p>

            {/* Direct search input on results page */}
            <form action="/search" method="GET" className="mt-8 relative max-w-md mx-auto">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles, rules, tactics..."
                className="w-full pl-12 pr-24 py-3 bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-full text-slate-900 text-sm shadow-sm transition-all"
              />
              <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-xs font-bold transition-all uppercase tracking-wider"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const primaryAuthor = post.authors[0];
                const primaryCategory = post.categories[0];

                return (
                  <Card
                    key={post.id}
                    className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col justify-between h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col">
                      <div className="relative h-48 overflow-hidden shrink-0">
                        {post.featuredImageUrl ? (
                          <img
                            src={post.featuredImageUrl}
                            alt={post.featuredImageAlt ?? post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center">
                            <span className="text-slate-400 font-medium">Chesseasy</span>
                          </div>
                        )}
                        {primaryCategory && (
                          <span className="absolute top-4 left-4 bg-purple-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                            {primaryCategory.name}
                          </span>
                        )}
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {formatReadTime(post.readTimeMinutes)}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {primaryAuthor?.name ?? "Chesseasy"}
                          </span>
                          <span className="text-xs font-bold text-purple-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            Read Article
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-600 mb-8">
                We couldn&apos;t find any articles matching your search criteria. Try using different keywords.
              </p>
              <Link href="/blog">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
