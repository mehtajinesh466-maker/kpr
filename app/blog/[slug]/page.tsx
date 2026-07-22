import type { Metadata } from "next";
import { RenderedContent } from "@/components/blog/RenderedContent";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { SocialShare } from "@/components/blog/social-share";
import { staticPosts } from "@/lib/static-posts";
import { formatReadTime } from "@/lib/read-time";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = staticPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : [],
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = staticPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // Find related posts (same category or others)
  const related = staticPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const primaryAuthor = post.authors[0];
  const primaryCategory = post.categories[0];

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      <Navbar />

      <article id="article-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 -ml-2 text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {primaryCategory && (
          <span className="bg-red-100 text-[#7A0C0C] px-3 py-1 rounded-full text-sm font-medium">
            {primaryCategory.name}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
          {primaryAuthor && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-slate-700 font-semibold">{primaryAuthor.name}</span>
            </div>
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

        {post.featuredImageUrl && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-slate-100">
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt ?? post.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
        )}

        <div className="prose prose-slate max-w-none mb-12">
          <RenderedContent html={post.contentHtml} />
        </div>

        <SocialShare title={post.title} />

        {primaryAuthor?.bio && (
          <Card className="mb-12 border border-gray-100 shadow-sm rounded-2xl overflow-hidden mt-12">
            <CardContent className="p-6 bg-slate-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7A0C0C]/10 flex items-center justify-center text-[#7A0C0C] font-bold shrink-0">
                  {primaryAuthor.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{primaryAuthor.name}</p>
                  <p className="text-gray-600 mt-1 text-sm">{primaryAuthor.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {related.length > 0 && (
          <section className="mb-16 border-t border-slate-100 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((r) => {
                const cat = r.categories[0];
                return (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                    <Card className="border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col justify-between bg-white">
                      <div className="relative h-44 overflow-hidden bg-slate-50">
                        {r.featuredImageUrl ? (
                          <img
                            src={r.featuredImageUrl}
                            alt={r.featuredImageAlt ?? r.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-red-50 to-orange-50 flex items-center justify-center">
                            <span className="text-red-300 font-semibold text-sm">KPR Chess</span>
                          </div>
                        )}
                        {cat && (
                          <span className="absolute top-4 left-4 bg-[#7A0C0C] text-[#FFB800] border border-[#FFB800]/25 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                            {cat.name}
                          </span>
                        )}
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-[#7A0C0C] transition-colors line-clamp-2 text-base md:text-lg mb-2">
                            {r.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {r.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-3 mt-auto">
                          <span>{formatDate(r.publishedAt)}</span>
                          <span>{formatReadTime(r.readTimeMinutes)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}