interface CategoryBadgeProps {
  category: string;
}

const styles: Record<string, { bg: string; color: string }> = {
  PRESSEMITTEILUNG: { bg: "var(--yellow)", color: "var(--black)" },
  BESCHLUSS: { bg: "var(--magenta)", color: "#fff" },
  NEWSLETTER: { bg: "#e0e0e0", color: "var(--black)" },
  ALLGEMEIN: { bg: "var(--black)", color: "var(--yellow)" },
};

const labels: Record<string, string> = {
  PRESSEMITTEILUNG: "Pressemitteilung",
  BESCHLUSS: "Beschluss",
  NEWSLETTER: "Newsletter",
  ALLGEMEIN: "Allgemein",
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const style = styles[category] ?? styles.ALLGEMEIN;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "3px",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        background: style.bg,
        color: style.color,
        whiteSpace: "nowrap",
      }}
    >
      {labels[category] ?? category}
    </span>
  );
}
