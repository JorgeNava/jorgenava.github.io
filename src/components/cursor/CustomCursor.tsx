"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        ring.current = { x: e.clientX, y: e.clientY };
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 will-change-transform"
        style={{ transform: "translate3d(-200px,-200px,0)" }}
        aria-hidden
      >
        <div
          className="h-1.5 w-1.5 rounded-full bg-white"
          style={{ transform: "translate(-50%,-50%)" }}
        />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0 will-change-transform transition-[width,height,border-color] duration-200"
        style={{ transform: "translate3d(-200px,-200px,0)" }}
        aria-hidden
      >
        <div
          className="h-9 w-9 rounded-full border border-white/25"
          style={{ transform: "translate(-50%,-50%)" }}
        />
      </div>
    </>
  );
}
