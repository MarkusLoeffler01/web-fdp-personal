interface SplitColorHeadlineProps {
  text: string;
  highlight: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SplitColorHeadline({
  text,
  highlight,
  as: Tag = "h1",
  className = "",
}: SplitColorHeadlineProps) {
  const words = text.split(" ");

  return (
    <Tag className={`h-hero ${className}`}>
      {words.map((word, i) => {
        const isHighlighted = highlight.some(
          (h) => word.toLowerCase().includes(h.toLowerCase())
        );
        return (
          <span key={i}>
            {isHighlighted ? (
              <span style={{ color: "var(--yellow)" }}>{word}</span>
            ) : (
              word
            )}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
