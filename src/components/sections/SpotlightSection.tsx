"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const E = [0.16, 1, 0.3, 1] as const;

const WORDS = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "NODE.JS", "AWS",
  "SERVERLESS", "SHOPIFY", "POSTGRESQL", "TAILWIND", "MOTION",
  "CLAUDE API", "SUBABASE", "CI/CD", "PYTHON", "FIGMA",
  "GITHUB ACTIONS", "VERCEL", "DYNAMODB", "REST APIs", "GRAPHQL",
  "SAM CLI", "REDIS", "LENIS", "LIQUID", "LANGCHAIN",
  "SEO", "GEO", "RAG", "FRAMER", "SHADCN UI",
];

export function SpotlightSection() {
  const ref = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();

  // Position tracks cursor with zero lag — raw motion values, no spring
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  // Radius springs only for smooth enter/leave animation
  const radius = useMotionValue(0);
  const springR = useSpring(radius, { stiffness: 280, damping: 35 });
  const clipPath = useMotionTemplate`circle(${springR}px at ${mouseX}px ${mouseY}px)`;

  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    let inside = false;

    const onMove = (e: MouseEvent) => {
      const el = wordsRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nowInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (nowInside) {
        mouseX.set(x);
        mouseY.set(y);
      }

      if (nowInside !== inside) {
        inside = nowInside;
        radius.set(nowInside ? 200 : 0);
        setEntered(nowInside);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, radius, isMobile]);

  return (
    <section ref={ref} className="py-40 bg-bg border-t border-border overflow-hidden relative select-none">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(196,153,95,0.03) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Container className="relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">05</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Stack Tecnológico</span>
        </motion.div>

        <div className="overflow-hidden mb-3">
          <motion.h2
            className="font-display font-light text-fg leading-[0.9] tracking-[-0.01em]"
            style={{ fontSize: "clamp(44px, 8vw, 104px)" }}
            initial={{ y: "108%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: E }}
          >
            Herramientas del oficio.
          </motion.h2>
        </div>

        <motion.p
          className="font-mono text-[10px] tracking-[0.25em] text-fg-subtle uppercase mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isMobile ? "Stack tecnológico" : entered ? "Sigue explorando →" : "Mueve el cursor para explorar →"}
        </motion.p>

        {/* Words grid */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: E }}
        >
          {isMobile ? (
            /* Mobile: all words visible in gold — no clip-path needed */
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-1">
              {WORDS.map((w) => (
                <span
                  key={w}
                  className="font-mono text-[10px] tracking-[0.18em] text-gold/65 uppercase py-3.5 leading-none"
                >
                  {w}
                </span>
              ))}
            </div>
          ) : (
            /* Desktop: spotlight reveal via clip-path */
            <div ref={wordsRef} className="relative">
              {/* Dim layer */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1 pointer-events-none">
                {WORDS.map((w) => (
                  <span
                    key={w}
                    className="font-mono text-[10px] tracking-[0.18em] text-fg-subtle/25 uppercase py-3.5 leading-none"
                  >
                    {w}
                  </span>
                ))}
              </div>

              {/* Gold revealed layer — clip-path space is relative to this same div */}
              <motion.div
                className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1 pointer-events-none"
                style={{ clipPath }}
              >
                {WORDS.map((w) => (
                  <span
                    key={w}
                    className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase py-3.5 leading-none"
                    style={{ textShadow: "0 0 20px rgba(196,153,95,0.6), 0 0 40px rgba(196,153,95,0.25)" }}
                  >
                    {w}
                  </span>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
