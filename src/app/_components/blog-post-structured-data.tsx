import { type Post } from "@/interfaces/post";
import { getCanonicalBaseUrl, seoUrls } from "@/lib/seo-utils";
import { extractFaq } from "@/lib/post-faq";

type Props = {
  post: Post;
  locale: "es" | "en";
};

// Escape "\\u003c" so post content can never close the <script> tag
const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

const BlogPostStructuredData = ({ post, locale }: Props) => {
  const baseUrl = getCanonicalBaseUrl();
  const url = `${baseUrl}/${locale}/blog/${post.slug}`;
  const absolute = (path: string) => (path.startsWith("/") ? `${baseUrl}${path}` : path);

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description || post.excerpt,
    image: absolute(post.ogImage?.url || post.coverImage),
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    inLanguage: locale === "es" ? "es-ES" : "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: post.author.name,
      image: absolute(post.author.picture),
      url: `${baseUrl}/${locale}${seoUrls.about[locale]}`,
    },
    publisher: {
      "@type": "Organization",
      name: "SellifyWorks",
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/assets/img/logoSW.png` },
    },
  };

  const faq = extractFaq(post.content);
  const faqPage = faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: article.inLanguage,
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(article) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(faqPage) }}
        />
      )}
    </>
  );
};

export default BlogPostStructuredData;
