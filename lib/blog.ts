import { prisma } from "@/lib/prisma";
import { PostStatus, Prisma } from "@/lib/generated/prisma/client";

export const postListInclude = {
  authors: {
    orderBy: { sortOrder: "asc" as const },
    include: { author: true },
  },
  categories: { include: { category: true } },
  tags: { include: { tag: true } },
  _count: { select: { comments: { where: { status: "APPROVED" } } } },
} satisfies Prisma.PostInclude;

export type PostListItem = Prisma.PostGetPayload<{
  include: typeof postListInclude;
}>;

export const postDetailInclude = {
  ...postListInclude,
  comments: {
    where: { status: "APPROVED", parentId: null },
    orderBy: { createdAt: "desc" as const },
    include: {
      replies: {
        where: { status: "APPROVED" },
        orderBy: { createdAt: "asc" as const },
      },
    },
  },
} satisfies Prisma.PostInclude;

export type PostDetail = Prisma.PostGetPayload<{
  include: typeof postDetailInclude;
}>;

export interface PostListQuery {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  sort?: "latest" | "popular";
}

const DEFAULT_LIMIT = 12;

export async function getPublishedPosts(query: PostListQuery = {}) {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(24, Math.max(1, query.limit ?? DEFAULT_LIMIT));
  const skip = (page - 1) * limit;

  const where: Prisma.PostWhereInput = {
    status: PostStatus.PUBLISHED,
    publishedAt: { lte: new Date() },
  };

  if (query.featured) {
    where.isFeatured = true;
  }

  if (query.category && query.category !== "all") {
    where.categories = {
      some: { category: { slug: query.category } },
    };
  }

  if (query.tag) {
    where.tags = {
      some: { tag: { slug: query.tag } },
    };
  }

  if (query.search?.trim()) {
    const term = query.search.trim();
    where.OR = [
      { title: { contains: term, mode: "insensitive" } },
      { excerpt: { contains: term, mode: "insensitive" } },
      { contentHtml: { contains: term, mode: "insensitive" } },
      { tags: { some: { tag: { name: { contains: term, mode: "insensitive" } } } } },
      { categories: { some: { category: { name: { contains: term, mode: "insensitive" } } } } },
    ];
  }

  const orderBy: Prisma.PostOrderByWithRelationInput[] = [
    { isPinned: "desc" },
    query.sort === "popular"
      ? { viewCount: "desc" }
      : { publishedAt: "desc" },
  ];

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: postListInclude,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: {
      slug,
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
    },
    include: postDetailInclude,
  });
}

export async function getFeaturedPosts(limit = 5) {
  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      isFeatured: true,
      publishedAt: { lte: new Date() },
    },
    include: postListInclude,
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    take: Math.min(5, Math.max(1, limit)),
  });
}

export async function getCategoriesWithCounts() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: {
            where: {
              post: {
                status: PostStatus.PUBLISHED,
                publishedAt: { lte: new Date() },
              },
            },
          },
        },
      },
      children: {
        include: {
          _count: {
            select: {
              posts: {
                where: {
                  post: {
                    status: PostStatus.PUBLISHED,
                    publishedAt: { lte: new Date() },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: { parentId: null },
    orderBy: { name: "asc" },
  });

  return categories;
}

export async function getRelatedPosts(postId: string, limit = 4) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      categories: { select: { categoryId: true } },
      tags: { select: { tagId: true } },
    },
  });

  if (!post) return [];

  const categoryIds = post.categories.map((c) => c.categoryId);
  const tagIds = post.tags.map((t) => t.tagId);

  return prisma.post.findMany({
    where: {
      id: { not: postId },
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
      OR: [
        { categories: { some: { categoryId: { in: categoryIds } } } },
        { tags: { some: { tagId: { in: tagIds } } } },
      ],
    },
    include: postListInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function searchPosts(term: string, limit = 10) {
  const trimmed = term.trim();
  if (!trimmed) return [];

  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
      OR: [
        { title: { contains: trimmed, mode: "insensitive" } },
        { excerpt: { contains: trimmed, mode: "insensitive" } },
        { contentHtml: { contains: trimmed, mode: "insensitive" } },
        { tags: { some: { tag: { name: { contains: trimmed, mode: "insensitive" } } } } },
        { categories: { some: { category: { name: { contains: trimmed, mode: "insensitive" } } } } },
      ],
    },
    include: postListInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function incrementPostViews(slug: string) {
  return prisma.post.update({
    where: { slug },
    data: { viewCount: { increment: 1 } },
  });
}

export async function publishScheduledPosts() {
  const now = new Date();
  const due = await prisma.post.findMany({
    where: {
      status: PostStatus.SCHEDULED,
      scheduledAt: { lte: now },
    },
    select: { id: true, scheduledAt: true },
  });

  if (due.length === 0) return { published: 0 };

  await prisma.post.updateMany({
    where: { id: { in: due.map((p) => p.id) } },
    data: {
      status: PostStatus.PUBLISHED,
      publishedAt: now,
    },
  });

  return { published: due.length };
}

export function toTipTapDoc(text: string) {
  return {
    type: "doc",
    content: text.split("\n\n").map((paragraph) => ({
      type: "paragraph",
      content: paragraph ? [{ type: "text", text: paragraph }] : [],
    })),
  };
}
