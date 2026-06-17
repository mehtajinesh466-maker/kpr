import "dotenv/config";
import { PrismaClient, PostStatus } from "@prisma/client";
import { seedArticles, seedCategories } from "./seed-data";
import { slugify } from "../lib/slug";
import { toTipTapDoc } from "../lib/blog";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.postTag.deleteMany();
  await prisma.postCategory.deleteMany();
  await prisma.postAuthor.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postRevision.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.author.deleteMany();

  const categoryMap = new Map<string, string>();

  for (const category of seedCategories) {
    const created = await prisma.category.create({
      data: { name: category.name, slug: category.slug },
    });
    categoryMap.set(category.slug, created.id);
  }

  const authorMap = new Map<string, string>();

  for (const article of seedArticles) {
    if (!authorMap.has(article.author)) {
      const author = await prisma.author.create({
        data: {
          name: article.author,
          slug: slugify(article.author),
          bio: article.authorBio,
        },
      });
      authorMap.set(article.author, author.id);
    }
  }

  const tagMap = new Map<string, string>();

  for (const article of seedArticles) {
    for (const tagName of article.tags) {
      if (!tagMap.has(tagName)) {
        const tag = await prisma.tag.create({
          data: { name: tagName, slug: slugify(tagName) },
        });
        tagMap.set(tagName, tag.id);
      }
    }
  }

  for (const article of seedArticles) {
    const slug = slugify(article.title);
    const content = toTipTapDoc(article.fullContent);
    const metaDescription = article.excerpt.slice(0, 160);

    await prisma.post.create({
      data: {
        slug,
        title: article.title,
        excerpt: article.excerpt,
        content,
        contentHtml: `<p>${article.fullContent}</p>`,
        metaTitle: article.title,
        metaDescription,
        focusKeyword: article.tags[0],
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(article.publishDate),
        featuredImageUrl: article.image,
        featuredImageAlt: article.title,
        isFeatured: article.featured,
        readTimeMinutes: article.readTimeMinutes,
        viewCount: article.views,
        authors: {
          create: {
            authorId: authorMap.get(article.author)!,
            sortOrder: 0,
          },
        },
        categories: {
          create: {
            categoryId: categoryMap.get(article.category)!,
          },
        },
        tags: {
          create: article.tags.map((tag) => ({
            tagId: tagMap.get(tag)!,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${seedArticles.length} posts, ${authorMap.size} authors, ${categoryMap.size} categories.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
