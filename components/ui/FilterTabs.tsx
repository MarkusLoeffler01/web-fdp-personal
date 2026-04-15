"use client";

interface Tab {
  label: string;
  value: string;
}

interface FilterTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0",
        borderBottom: "2px solid #e0e0e0",
        marginBottom: "2rem",
        overflowX: "auto",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            style={{
              padding: "0.6rem 1.25rem",
              fontSize: "0.8rem",
              fontWeight: isActive ? 700 : 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: isActive ? "var(--black)" : "#888",
              borderBottom: isActive
                ? "2px solid var(--yellow)"
                : "2px solid transparent",
              marginBottom: "-2px",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
