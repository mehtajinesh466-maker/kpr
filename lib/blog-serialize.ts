import type { PostListItem } from "@/lib/blog";
import type { SerializedCategory, SerializedPost } from "@/lib/blog-types";

export function serializePost(post: PostListItem): SerializedPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    contentHtml: post.contentHtml,
    featuredImageUrl: post.featuredImageUrl,
    featuredImageAlt: post.featuredImageAlt,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    readTimeMinutes: post.readTimeMinutes,
    viewCount: post.viewCount,
    isFeatured: post.isFeatured,
    isPinned: post.isPinned,
    showTableOfContents: post.showTableOfContents,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    authors: post.authors.map((a) => ({
      id: a.author.id,
      slug: a.author.slug,
      name: a.author.name,
      bio: a.author.bio,
      avatarUrl: a.author.avatarUrl,
    })),
    categories: post.categories.map((c) => ({
      slug: c.category.slug,
      name: c.category.name,
    })),
    tags: post.tags.map((t) => ({
      slug: t.tag.slug,
      name: t.tag.name,
    })),
    commentCount: post._count.comments,
  };
}

export function serializeCategories(
  categories: Awaited<ReturnType<typeof import("@/lib/blog").getCategoriesWithCounts>>
): SerializedCategory[] {
  const allCount = categories.reduce((sum, c) => sum + c._count.posts, 0);

  return [
    { id: "all", slug: "all", name: "All Articles", count: allCount },
    ...categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      count: c._count.posts,
    })),
  ];
}
