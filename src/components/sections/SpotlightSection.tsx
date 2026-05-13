"use client";
import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const WORDS = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "NODE.JS", "AWS",
  "SERVERLESS", "SHOPIFY", "POSTGRESQL", "TAILWIND", "MOTION",
  "CLAUDE API", "SUPABASE", "CI/CD", "PYTHON", "FIGMA",
  "GITHUB ACTIONS", "VERCEL", "DYNAMODB", "REST APIs", "GRAPHQL",
  "SAM CLI", "REDIS", "LENIS", "LIQUID", "LANGCHAIN",
  "SEO", "GEO", "RAG", "FRAMER", "SHADCN UI",
];

export function SpotlightSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 320, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 320, damping: 35 });
  const springR = useSpring(radius, { stiffness: 180, damping: 28 });

  const clipPath = useMotionTemplate`circle(${springR}px at ${springX}px ${springY}px)`;

  const [entered, setEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    radius.set(220);
    setEntered(true);
  };

  const handleMouseLeave = () => {
    radius.set(0);
    setEntered(false);
  };

  return (
    <section
      ref={ref}
      className="py-40 bg-bg border-t border-border overflow-hidden relative select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(196,153,95,0.03) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Section label */}
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

        {/* Heading */}
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

        {/* Hint */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.25em] text-fg-subtle uppercase mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {entered ? "Sigue explorando →" : "Mueve el cursor para explorar →"}
        </motion.p>

        {/* Words grid — two stacked layers */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: E }}
        >
          {/* Dim layer (always visible) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1">
            {WORDS.map((w) => (
              <span
                key={w}
                className="font-mono text-[10px] tracking-[0.18em] text-fg-subtle/25 uppercase py-3.5 leading-none"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Gold revealed layer — clipped to spotlight */}
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
        </motion.div>
      </Container>
    </section>
  );
}
