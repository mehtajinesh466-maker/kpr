export interface SerializedAuthor {
  id: string;
  slug: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
}

export interface SerializedCategory {
  id: string;
  slug: string;
  name: string;
  count: number;
}

export interface SerializedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  contentHtml: string | null;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  publishedAt: string | null;
  readTimeMinutes: number;
  viewCount: number;
  isFeatured: boolean;
  isPinned: boolean;
  showTableOfContents: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  authors: SerializedAuthor[];
  categories: { slug: string; name: string }[];
  tags: { slug: string; name: string }[];
  commentCount: number;
}
