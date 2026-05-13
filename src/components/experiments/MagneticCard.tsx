"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.38);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.38);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    x.set((touch.clientX - (rect.left + rect.width / 2)) * 0.38);
    y.set((touch.clientY - (rect.top + rect.height / 2)) * 0.38);
  };

  const onTouchEnd = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative flex h-16 w-44 items-center justify-center rounded-full border border-white/18 bg-white/5 backdrop-blur-sm"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase select-none">
          muéveme
        </span>
      </motion.div>
    </div>
  );
}
