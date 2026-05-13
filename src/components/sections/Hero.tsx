"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const BLOBS = [
  { x: 0.2, y: 0.3, r: 0.55, color: "rgba(70,20,160,0.45)", sx: 0.00028, sy: 0.00022, px: 0, py: 0.6 },
  { x: 0.72, y: 0.2, r: 0.5, color: "rgba(20,30,140,0.4)", sx: 0.00022, sy: 0.0002, px: 1.4, py: 1.0 },
  { x: 0.5, y: 0.75, r: 0.6, color: "rgba(40,15,120,0.35)", sx: 0.0002, sy: 0.00028, px: 2.6, py: 1.8 },
  { x: 0.85, y: 0.6, r: 0.45, color: "rgba(15,40,100,0.3)", sx: 0.00032, sy: 0.00024, px: 3.9, py: 2.5 },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of BLOBS) {
        const cx = (b.x + Math.sin(t * b.sx * 1000 + b.px) * 0.12) * canvas.width;
        const cy = (b.y + Math.cos(t * b.sy * 1000 + b.py) * 0.12) * canvas.height;
        const r = b.r * Math.max(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 16;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-bg">
      {/* Aurora */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Nav */}
      <Container className="relative z-10">
        <motion.nav
          className="flex items-center justify-between pt-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">
            jorge · nava
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-fg-muted">
            2026
          </span>
        </motion.nav>
      </Container>

      {/* Main */}
      <Container className="relative z-10">
        <div className="flex flex-col gap-5">
          <motion.p
            className="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            Arquitecto de Software · CEO, One Spark
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="font-sans font-medium leading-[0.86] tracking-[-0.04em] text-fg"
              style={{ fontSize: "clamp(68px, 13vw, 190px)" }}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.08, ease: EASE }}
            >
              Jorge
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-sans font-medium leading-[0.86] tracking-[-0.04em] text-fg"
              style={{ fontSize: "clamp(68px, 13vw, 190px)" }}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
            >
              Nava
            </motion.h1>
          </div>

          <motion.p
            className="mt-2 max-w-sm text-base text-fg-muted leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: EASE }}
          >
            Construyo productos digitales que escalan — desde la arquitectura
            hasta el pixel.
          </motion.p>
        </div>
      </Container>

      {/* Scroll cue */}
      <Container className="relative z-10 pb-10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.div
            className="h-px w-8 bg-fg-muted origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">
            scroll
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
