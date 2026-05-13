"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const LINES = [
  { text: "Construir software",    offset: 35 },
  { text: "no es escribir código.", offset: -22 },
  { text: "Es resolver problemas", offset: 42 },
  { text: "que importan.",         offset: -18 },
  { text: "El detalle",            offset: 28 },
  { text: "lo es todo.",           offset: -32 },
];

function Line({ text, offset, progress, i, inView }: {
  text: string; offset: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  i: number; inView: boolean;
}) {
  const y = useTransform(progress, [0, 1], [offset, -offset]);
  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.1, delay: 0.06 + i * 0.09, ease: E }}
    >
      <p
        className="font-display font-light text-fg leading-[1.0] tracking-[-0.02em]"
        style={{ fontSize: "clamp(36px, 7vw, 88px)" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="py-40 bg-bg border-t border-border overflow-hidden">
      <Container>
        <motion.div
          className="flex items-center gap-4 mb-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">06</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Manifiesto</span>
        </motion.div>

        {/* Large decorative open quote in gold */}
        <motion.div
          className="font-display text-gold/15 leading-none mb-4 select-none"
          style={{ fontSize: "clamp(80px, 14vw, 160px)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          aria-hidden
        >
          "
        </motion.div>

        <div className="flex flex-col gap-2 max-w-4xl">
          {LINES.map((l, i) => (
            <Line key={i} text={l.text} offset={l.offset} progress={scrollYProgress} i={i} inView={inView} />
          ))}
        </div>

        {/* Attribution */}
        <motion.p
          className="mt-12 font-mono text-[10px] tracking-[0.25em] text-gold/50 uppercase"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          — Jorge Nava, 2026
        </motion.p>
      </Container>
    </section>
  );
}
