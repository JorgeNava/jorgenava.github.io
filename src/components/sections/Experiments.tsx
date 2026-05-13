"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { AuroraCard } from "@/components/experiments/AuroraCard";
import { MagneticCard } from "@/components/experiments/MagneticCard";
import { KineticCard } from "@/components/experiments/KineticCard";
import { MorphCard } from "@/components/experiments/MorphCard";

const E = [0.16, 1, 0.3, 1] as const;

const EXPERIMENTS = [
  {
    num: "01",
    title: "Aurora Mesh",
    tech: "Canvas 2D · requestAnimationFrame",
    desc: "Gradientes radiales animados como blobs de plasma. Cada uno se mueve con funciones sinusoidales independientes sobre un tiempo continuo.",
    Demo: AuroraCard,
  },
  {
    num: "02",
    title: "Campo Magnético",
    tech: "Motion Springs · useMotionValue",
    desc: "Atracción simulada con física de spring. El offset del elemento se calcula relativo al centro del contenedor en tiempo real.",
    Demo: MagneticCard,
  },
  {
    num: "03",
    title: "Tipografía Cinética",
    tech: "Framer springs · Proximity index",
    desc: "Cada carácter tiene spring propio. La proximidad al índice activo determina escala y desplazamiento.",
    Demo: KineticCard,
  },
  {
    num: "04",
    title: "Morph Geométrico",
    tech: "CSS clip-path · cubic-bezier",
    desc: "Interpolación de polígonos con clip-path CSS. El navegador calcula las trayectorias intermedias de cada vértice.",
    Demo: MorphCard,
  },
];

function ExperimentRow({ exp, index, inView }: {
  exp: (typeof EXPERIMENTS)[0]; index: number; inView: boolean;
}) {
  const { Demo } = exp;
  const flip = index % 2 !== 0;
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-16 border-t border-border"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.08 + index * 0.1, ease: E }}
    >
      <div className={`flex flex-col justify-center gap-5 ${flip ? "lg:order-last" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold/60">{exp.num}</span>
          <span className="block h-px w-6 bg-gold/20" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-fg-muted uppercase">{exp.tech}</span>
        </div>
        <h3
          className="font-display font-light text-fg leading-tight"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)", letterSpacing: "-0.01em" }}
        >
          {exp.title}
        </h3>
        <p className="text-sm text-fg-muted leading-[1.85] max-w-sm">
          {exp.desc}
        </p>
      </div>
      <div className={`h-72 lg:h-80 rounded-2xl overflow-hidden border border-border bg-surface ${flip ? "lg:order-first" : ""}`}>
        <Demo />
      </div>
    </motion.div>
  );
}

export function Experiments() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="pb-32 pt-0 bg-bg border-t border-border">
      <Container>
        <motion.div
          className="flex items-center gap-4 mb-2 pt-32"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">04</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Experimentos</span>
        </motion.div>
        {EXPERIMENTS.map((exp, i) => (
          <ExperimentRow key={exp.num} exp={exp} index={i} inView={inView} />
        ))}
      </Container>
    </section>
  );
}
