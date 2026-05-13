"use client";
import { useState } from "react";
import { motion } from "motion/react";

const WORD = "CÓDIGO";

export function KineticCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-4">
      <div className="flex items-end gap-0">
        {WORD.split("").map((char, i) => {
          const dist = activeIndex !== null ? Math.abs(i - activeIndex) : 999;
          const yOffset = dist === 0 ? -16 : dist === 1 ? -8 : 0;
          const scale = dist === 0 ? 1.5 : dist === 1 ? 1.2 : 1;

          return (
            <motion.span
              key={i}
              className="inline-block font-sans font-medium text-fg select-none leading-none"
              style={{
                fontSize: "clamp(32px, 5vw, 54px)",
                letterSpacing: "-0.04em",
              }}
              animate={{ y: yOffset, scale }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              onPointerEnter={() => setActiveIndex(i)}
              onPointerLeave={() => setActiveIndex(null)}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
        toca cada letra
      </p>
    </div>
  );
}
