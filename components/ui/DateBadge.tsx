import { getDateBadgeParts } from "@/lib/utils";

interface DateBadgeProps {
  date: Date | string;
}

export function DateBadge({ date }: DateBadgeProps) {
  const { day, month } = getDateBadgeParts(date);
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--yellow)",
        color: "var(--black)",
        width: "64px",
        height: "72px",
        borderRadius: "4px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1 }}>
        {day}
      </span>
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: "2px",
        }}
      >
        {month}
      </span>
    </div>
  );
}
