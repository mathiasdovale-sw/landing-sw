import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, language?: string) {
  let realSlug = slug.replace(/\.md$/, "");
  
  // If language is specified, append it to the slug
  if (language) {
    // Remove existing language suffix if present
    realSlug = realSlug.replace(/-(en|es)$/, "");
    realSlug = `${realSlug}-${language}`;
  }
  
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  
  // Check if file exists, if not try without language suffix
  if (!fs.existsSync(fullPath) && language) {
    const fallbackSlug = slug.replace(/\.md$/, "").replace(/-(en|es)$/, "");
    const fallbackPath = join(postsDirectory, `${fallbackSlug}.md`);
    if (fs.existsSync(fallbackPath)) {
      const fileContents = fs.readFileSync(fallbackPath, "utf8");
      const { data, content } = matter(fileContents);
      return { ...data, slug: fallbackSlug, content } as Post;
    }
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  // Remove language suffix from slug for clean URLs
  const cleanSlug = realSlug.replace(/-(en|es)$/, "");
  
  return { ...data, slug: cleanSlug, content } as Post;
}

export function getAllPosts(language?: string): Post[] {
  const slugs = getPostSlugs();
  
  let filteredSlugs = slugs;
  
  // Filter by language if specified
  if (language) {
    filteredSlugs = slugs.filter(slug => slug.endsWith(`-${language}.md`));
  }
  
  const posts = filteredSlugs
    .map((slug) => getPostBySlug(slug, language))
    // Custom sorting: Allbirds post first, then by date in descending order
    .sort((post1, post2) => {
      // If either post is the Allbirds post, prioritize it
      const isPost1Allbirds = post1.slug.toLowerCase().includes('allbirds');
      const isPost2Allbirds = post2.slug.toLowerCase().includes('allbirds');
      
      if (isPost1Allbirds && !isPost2Allbirds) return -1; // post1 (Allbirds) comes first
      if (!isPost1Allbirds && isPost2Allbirds) return 1;  // post2 (Allbirds) comes first
      
      // If neither or both are Allbirds posts, sort by date in descending order
      return post1.date > post2.date ? -1 : 1;
    });
  return posts;
}
