"use client";
import { useState } from "react";

const SHAPES = [
  {
    clip: "circle(42% at 50% 50%)",
    label: "círculo",
  },
  {
    clip: "polygon(50% 4%, 96% 88%, 4% 88%)",
    label: "triángulo",
  },
  {
    clip: "polygon(8% 8%, 92% 8%, 92% 92%, 8% 92%)",
    label: "cuadrado",
  },
  {
    clip: "polygon(50% 4%, 96% 50%, 50% 96%, 4% 50%)",
    label: "rombo",
  },
];

export function MorphCard() {
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const next = () => setIdx((p) => (p + 1) % SHAPES.length);

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-8"
      onMouseEnter={() => {
        if (!hovering) {
          setHovering(true);
          next();
        }
      }}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="h-28 w-28 bg-white/12 border border-white/20"
        style={{
          clipPath: SHAPES[idx].clip,
          transition:
            "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease",
        }}
        aria-hidden
      />
      <div className="flex flex-col items-center gap-1">
        <p
          className="font-mono text-xs text-fg-muted tracking-widest"
          style={{ transition: "opacity 0.3s" }}
        >
          {SHAPES[idx].label}
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em] text-fg-subtle uppercase">
          hover para transformar
        </p>
      </div>
    </div>
  );
}
