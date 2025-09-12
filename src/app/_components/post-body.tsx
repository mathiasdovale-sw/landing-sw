import markdownStyles from "./markdown-styles.module.css";
import DOMPurify from 'isomorphic-dompurify';

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'br', 'hr', 'img'],
    ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'class', 'id'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'], // Allow target attribute for links
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
