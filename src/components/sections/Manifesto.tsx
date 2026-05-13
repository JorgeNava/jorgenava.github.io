"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINES = [
  { text: "Construir software", offset: 30 },
  { text: "no es escribir código.", offset: -20 },
  { text: "Es resolver problemas", offset: 40 },
  { text: "que importan.", offset: -15 },
  { text: "El detalle", offset: 25 },
  { text: "lo es todo.", offset: -35 },
];

function ManifestoLine({
  text,
  offset,
  scrollYProgress,
  index,
  inView,
}: {
  text: string;
  offset: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  inView: boolean;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.0, delay: 0.05 + index * 0.08, ease: EASE }}
    >
      <p
        className="font-sans font-medium tracking-[-0.03em] text-fg leading-[1.05]"
        style={{ fontSize: "clamp(32px, 6vw, 72px)" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="py-40 bg-bg border-t border-border overflow-hidden"
    >
      <Container>
        <motion.div
          className="flex items-baseline gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
            003
          </p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
            Manifiesto
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 max-w-3xl">
          {LINES.map((line, i) => (
            <ManifestoLine
              key={i}
              text={line.text}
              offset={line.offset}
              scrollYProgress={scrollYProgress}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
