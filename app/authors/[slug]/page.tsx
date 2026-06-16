import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@/lib/generated/prisma/client";
import { postListInclude } from "@/lib/blog";
import { serializePost } from "@/lib/blog-serialize";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatReadTime } from "@/lib/read-time";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await prisma.author.findUnique({ where: { slug: params.slug } });
  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} - Author Archive`,
    description: author.bio ?? `Articles by ${author.name} at Chesseasy Academy.`,
  };
}

export default async function AuthorArchivePage({ params }: PageProps) {
  const author = await prisma.author.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        where: {
          post: {
            status: PostStatus.PUBLISHED,
            publishedAt: { lte: new Date() },
          },
        },
        include: {
          post: { include: postListInclude },
        },
        orderBy: { post: { publishedAt: "desc" } },
      },
    },
  });

  if (!author) notFound();

  const posts = author.posts.map((pa) => serializePost(pa.post));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-start gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
            {author.avatarUrl ? (
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              author.name.charAt(0)
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
            {author.bio && (
              <p className="text-gray-600 mt-2 max-w-2xl">{author.bio}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatReadTime(post.readTimeMinutes)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
