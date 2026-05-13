"use client";
import { useEffect, useRef } from "react";

const BLOBS = [
  { x: 0.25, y: 0.35, r: 0.7, color: "rgba(100,30,200,0.55)", sx: 0.00028, sy: 0.00022, px: 0, py: 0.6 },
  { x: 0.72, y: 0.25, r: 0.6, color: "rgba(30,50,200,0.45)", sx: 0.00022, sy: 0.00018, px: 1.3, py: 0.9 },
  { x: 0.5, y: 0.72, r: 0.65, color: "rgba(60,20,160,0.4)", sx: 0.00018, sy: 0.0003, px: 2.6, py: 1.8 },
  { x: 0.8, y: 0.65, r: 0.5, color: "rgba(20,60,140,0.35)", sx: 0.0003, sy: 0.00025, px: 4.0, py: 2.5 },
];

export function AuroraCard() {
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
        const cx = (b.x + Math.sin(t * b.sx * 1000 + b.px) * 0.18) * canvas.width;
        const cy = (b.y + Math.cos(t * b.sy * 1000 + b.py) * 0.18) * canvas.height;
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
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-hidden
    />
  );
}
