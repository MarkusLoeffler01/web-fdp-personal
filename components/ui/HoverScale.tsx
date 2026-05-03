"use client";

import type { ReactNode } from "react";

export function HoverScale({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
      }}
    >
      {children}
    </div>
  );
}
