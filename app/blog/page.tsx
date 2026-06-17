import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogListing } from "@/components/blog/blog-listing";
import {
  getPublishedPosts,
  getFeaturedPosts,
  getCategoriesWithCounts,
} from "@/lib/blog";
import { serializeCategories, serializePost } from "@/lib/blog-serialize";

export const metadata: Metadata = {
  title: "Blog - Chess Insights & Strategy Articles",
  description:
    "Explore expert chess articles, strategy guides, and training insights from Chesseasy Academy coaches.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: ReturnType<typeof serializePost>[] = [];
  let featuredPosts: ReturnType<typeof serializePost>[] = [];
  let categories: ReturnType<typeof serializeCategories> = [];

  try {
    const [postsResult, featured, cats] = await Promise.all([
      getPublishedPosts({ limit: 50 }),
      getFeaturedPosts(5),
      getCategoriesWithCounts(),
    ]);

    posts = postsResult.posts.map(serializePost);
    featuredPosts = featured.map(serializePost);
    categories = serializeCategories(cats);
  } catch (error) {
    console.error("Blog page data fetch failed:", error);
    if (!process.env.DATABASE_URL) {
      console.error(
        "DATABASE_URL is not set. Add your Neon pooled connection string in Vercel → Settings → Environment Variables, then redeploy."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200')] bg-cover bg-center" />
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center py-20">
          <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold text-white mb-6">
            Chess Insights & Strategy
            <br />
            <span className="text-blue-400 text-2xl sm:text-2xl lg:text-4xl">
              Chesseasy Academy Blog
            </span>
          </h1>
          <p className="text-md text-slate-300 mb-8 max-w-2xl mx-auto font-light">
            Research-based insights and practical advice from our expert faculty.
            Elevate your game with strategic thinking that extends beyond the 64
            squares.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="py-20 text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Blog coming soon
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Connect your Neon database and run{" "}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              npm run db:push && npm run db:seed
            </code>{" "}
            to populate articles.
          </p>
        </section>
      ) : (
        <BlogListing
          posts={posts}
          featuredPosts={featuredPosts}
          categories={categories}
        />
      )}

      <Footer />
    </div>
  );
}
