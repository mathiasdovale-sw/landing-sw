"use client"
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const { t } = useLanguage();
  
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-gray-900">
        {t('blog.moreStories')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
