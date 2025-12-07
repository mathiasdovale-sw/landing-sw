import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, language?: string) {
  // Security: Validate and sanitize slug to prevent path traversal attacks
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug provided');
  }
  
  // Remove any path traversal attempts and dangerous characters
  const sanitizedSlug = slug
    .replace(/\.md$/, "")
    .replace(/[^a-zA-Z0-9\-_]/g, '') // Only allow alphanumeric, hyphens, and underscores
    .replace(/^\.+/, '') // Remove leading dots
    .replace(/\.+$/, ''); // Remove trailing dots
  
  // Validate slug format (must be non-empty after sanitization)
  if (!sanitizedSlug || sanitizedSlug.length === 0) {
    throw new Error('Invalid slug format');
  }
  
  // Prevent extremely long slugs (DoS protection)
  if (sanitizedSlug.length > 100) {
    throw new Error('Slug too long');
  }
  
  let realSlug = sanitizedSlug;
  
  // If language is specified, append it to the slug
  if (language) {
    // Validate language parameter
    if (!['en', 'es'].includes(language)) {
      throw new Error('Invalid language parameter');
    }
    
    // Remove existing language suffix if present
    realSlug = realSlug.replace(/-(en|es)$/, "");
    realSlug = `${realSlug}-${language}`;
  }
  
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  
  // Security: Verify the resolved path is still within the posts directory
  let resolvedFullPath: string;
  let resolvedPostsDir: string;
  
  try {
    resolvedFullPath = fs.existsSync(fullPath) ? fs.realpathSync(fullPath) : fullPath;
    resolvedPostsDir = fs.realpathSync(postsDirectory);
  } catch (error) {
    // If realpath fails, use the original paths but still validate
    resolvedFullPath = fullPath;
    resolvedPostsDir = postsDirectory;
  }
  
  if (!resolvedFullPath.startsWith(resolvedPostsDir)) {
    throw new Error('Access denied: Path traversal detected');
  }
  
  // Check if file exists, if not try without language suffix
  if (!fs.existsSync(fullPath) && language) {
    const fallbackSlug = sanitizedSlug.replace(/-(en|es)$/, "");
    const fallbackPath = join(postsDirectory, `${fallbackSlug}.md`);
    
    // Security: Verify fallback path is also within posts directory
    let resolvedFallbackPath: string;
    try {
      resolvedFallbackPath = fs.existsSync(fallbackPath) ? fs.realpathSync(fallbackPath) : fallbackPath;
    } catch (error) {
      resolvedFallbackPath = fallbackPath;
    }
    
    if (!resolvedFallbackPath.startsWith(resolvedPostsDir)) {
      throw new Error('Access denied: Path traversal detected');
    }
    
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
