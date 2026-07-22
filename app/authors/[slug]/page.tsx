import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { staticPosts } from "@/lib/static-posts";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatReadTime } from "@/lib/read-time";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const allAuthors = staticPosts.flatMap((p) => p.authors);
  const author = allAuthors.find((a) => a.slug === params.slug);
  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} - Author Archive`,
    description: author.bio ?? `Articles by ${author.name} at KPR Chess Academy.`,
  };
}

export default function AuthorArchivePage({ params }: PageProps) {
  const allAuthors = staticPosts.flatMap((p) => p.authors);
  const author = allAuthors.find((a) => a.slug === params.slug);
  if (!author) notFound();

  const posts = staticPosts.filter((p) => p.authors.some((a) => a.slug === params.slug));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-start gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-2xl font-bold text-[#7A0C0C]">
            {author.name.charAt(0)}
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
              <Card className="hover:shadow-md transition-shadow border border-slate-100">
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
