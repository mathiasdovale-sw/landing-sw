import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import VisualBreadcrumbs from "@/app/_components/visual-breadcrumbs";
import BlogCTA from "@/app/_components/blog-cta";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug, 'en');
  } catch (error) {
    // Security: If there's an error (like path traversal attempt), return 404
    console.error('Security error in blog post access:', error);
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="min-h-screen">
      <div className="relative">
        <VisualBreadcrumbs />
      </div>
      <div className="bg-white">
        <Container>
          <article className="pb-32">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={content} />
            
            {/* CTA Section */}
            <BlogCTA />
          </article>
        </Container>
      </div>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug, 'en');
  } catch (error) {
    // Security: If there's an error (like path traversal attempt), return 404
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | SellifyWorks Blog`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts('en');

  return posts.map((post) => ({
    slug: post.slug,
  }));
}