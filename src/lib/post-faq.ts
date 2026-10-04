export type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_HEADING = /^##\s+(preguntas frecuentes|frequently asked questions|faq)\s*$/im;

// Extracts Q&A pairs from a "## Preguntas frecuentes" / "## Frequently asked questions"
// section, where each question is a "###" heading followed by its answer.
export function extractFaq(markdown: string): FaqItem[] {
  const match = FAQ_HEADING.exec(markdown);
  if (!match) return [];

  const afterHeading = markdown.slice(match.index + match[0].length);
  const nextSection = afterHeading.search(/^##\s/m);
  const section = nextSection === -1 ? afterHeading : afterHeading.slice(0, nextSection);

  return section
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      const answer = rest
        .join(" ")
        .replace(/\*+|__|`/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
      return { question: question.trim(), answer };
    })
    .filter((item) => item.question && item.answer);
}
