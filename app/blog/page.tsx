import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogListing } from "@/components/blog/blog-listing";
import { staticPosts, staticCategories } from "@/lib/static-posts";
import BlogBanner from "@/components/blogBanner";

export const metadata: Metadata = {
  title: "Blog - Chess Insights & Strategy Articles",
  description:
    "Explore expert chess articles, strategy guides, and training insights from KPR Chess Academy coaches.",
};

export default function BlogPage() {
  const posts = staticPosts;
  const featuredPosts = [staticPosts[0]];
  const categories = staticCategories;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <BlogBanner />

      <BlogListing
        posts={posts}
        featuredPosts={featuredPosts}
        categories={categories}
      />

      <Footer />
    </div>
  );
}
