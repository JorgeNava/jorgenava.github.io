"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const BLOBS = [
  { x: 0.15, y: 0.2,  r: 0.75, color: "rgba(100,30,200,0.65)",  sx: 0.00011, sy: 0.00008, px: 0,   py: 0.7 },
  { x: 0.82, y: 0.15, r: 0.68, color: "rgba(40,15,150,0.58)",   sx: 0.00009, sy: 0.00011, px: 1.4, py: 1.1 },
  { x: 0.5,  y: 0.78, r: 0.72, color: "rgba(60,20,170,0.55)",   sx: 0.00008, sy: 0.00013, px: 2.7, py: 1.9 },
  { x: 0.78, y: 0.72, r: 0.60, color: "rgba(196,153,95,0.16)",  sx: 0.00013, sy: 0.00009, px: 4.0, py: 2.6 },
  { x: 0.3,  y: 0.55, r: 0.58, color: "rgba(20,80,200,0.42)",   sx: 0.00010, sy: 0.00012, px: 1.8, py: 3.2 },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let id: number, t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of BLOBS) {
        const cx = (b.x + Math.sin(t * b.sx * 1000 + b.px) * 0.14) * canvas.width;
        const cy = (b.y + Math.cos(t * b.sy * 1000 + b.py) * 0.14) * canvas.height;
        const r  = b.r * Math.max(canvas.width, canvas.height);
        const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 8;
      id = requestAnimationFrame(draw);
    }
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-bg">
      {/* Aurora canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* CSS radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(196,153,95,0.07) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(80,30,160,0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      {/* Nav */}
      <Container className="relative z-10">
        <motion.nav
          className="flex items-center justify-between pt-8 pb-0"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">
            Jorge Nava
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/JorgeNava"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase hover:text-gold transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://one-spark.com.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase hover:text-gold transition-colors duration-300"
            >
              One Spark
            </a>
          </div>
        </motion.nav>
      </Container>

      {/* Hero content — centrado verticalmente */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 py-20">

        {/* Decorative ring */}
        <motion.div
          className="absolute rounded-full border border-gold-border pointer-events-none"
          style={{ width: "min(520px, 90vw)", height: "min(520px, 90vw)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: E }}
          aria-hidden
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "min(520px, 90vw)", height: "min(520px, 90vw)",
            background: "radial-gradient(circle, rgba(196,153,95,0.04) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.4 }}
          aria-hidden
        />

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: E }}
        >
          Arquitecto de Software · CEO, One Spark
        </motion.p>

        {/* Name — Cormorant Garamond, light, caps */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            className="font-display font-light tracking-[0.18em] text-fg uppercase leading-[0.9]"
            style={{ fontSize: "clamp(56px, 11vw, 168px)" }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: E }}
          >
            Jorge
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display font-light tracking-[0.18em] text-fg uppercase leading-[0.9]"
            style={{ fontSize: "clamp(56px, 11vw, 168px)" }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.22, ease: E }}
          >
            Nava
          </motion.h1>
        </div>

        {/* Gold separator line */}
        <motion.div
          className="flex items-center gap-4 mt-10 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <span className="block h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold text-xs">✦</span>
          <span className="block h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-base text-fg-muted leading-relaxed max-w-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: E }}
        >
          Diseño y construyo productos digitales<br />
          que escalan y perduran.
        </motion.p>

        {/* Bottom location row */}
        <motion.div
          className="flex items-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-muted uppercase">
            Jalisco, México
          </span>
          <span className="block w-px h-3 bg-fg-subtle" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
            Disponible
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-fg-muted uppercase">scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: E }}
        />
      </motion.div>
    </section>
  );
}
