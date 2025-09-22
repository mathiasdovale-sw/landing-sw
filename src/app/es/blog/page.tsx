import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import VisualBreadcrumbs from "@/app/_components/visual-breadcrumbs";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts('es');

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main className="min-h-screen">
      <VisualBreadcrumbs />
      <div className="bg-white">
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </div>
    </main>
  );
}