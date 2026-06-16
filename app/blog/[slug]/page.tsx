import type { Metadata } from "next";
import { RenderedContent } from "@/components/blog/RenderedContent";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { CommentsSection } from "@/components/blog/comments-section";
import { SocialShare } from "@/components/blog/social-share";
import {
  getPostBySlug,
  getRelatedPosts,
  incrementPostViews,
} from "@/lib/blog";
import { formatReadTime } from "@/lib/read-time";
import { Calendar, Clock, User, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt ?? undefined,
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  };
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  await incrementPostViews(params.slug);

  const related = await getRelatedPosts(post.id, 4);
  const primaryAuthor = post.authors[0]?.author;
  const primaryCategory = post.categories[0]?.category;

  const serializedComments = post.comments.map((comment) => ({
    id: comment.id,
    authorName: comment.authorName,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      authorName: reply.authorName,
      content: reply.content,
      createdAt: reply.createdAt.toISOString(),
    })),
  }));

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
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
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
              <Link
                href={`/authors/${primaryAuthor.slug}`}
                className="hover:text-blue-600"
              >
                {primaryAuthor.name}
              </Link>
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
          {post._count.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post._count.comments} comments
            </div>
          )}
        </div>

        {post.featuredImageUrl && (
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt ?? post.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
        )}

        {/* prose scoped only to article body content */}
       <RenderedContent html={post.contentHtml ?? `<p>${post.excerpt ?? ""}</p>`} />
        <SocialShare title={post.title} />

        {primaryAuthor?.bio && (
          <Card className="mb-12 border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {primaryAuthor.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{primaryAuthor.name}</p>
                  <p className="text-gray-600 mt-1">{primaryAuthor.bio}</p>
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
                const primaryCategory = r.categories[0]?.category;
                return (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                    <Card className="border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col justify-between bg-white dark:bg-slate-900">
                      <div className="relative h-44 overflow-hidden bg-slate-50">
                        {r.featuredImageUrl ? (
                          <img
                            src={r.featuredImageUrl}
                            alt={r.featuredImageAlt ?? r.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-purple-50 to-indigo-50 flex items-center justify-center">
                            <span className="text-purple-300 font-semibold text-sm">ChessEasy</span>
                          </div>
                        )}
                        {primaryCategory && (
                          <span className="absolute top-4 left-4 bg-purple-600/95 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                            {primaryCategory.name}
                          </span>
                        )}
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 text-base md:text-lg mb-2">
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

        <CommentsSection postId={post.id} initialComments={serializedComments} />
      </article>

      <Footer />
    </div>
  );
}