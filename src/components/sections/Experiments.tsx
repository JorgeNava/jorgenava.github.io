"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { AuroraCard } from "@/components/experiments/AuroraCard";
import { MagneticCard } from "@/components/experiments/MagneticCard";
import { KineticCard } from "@/components/experiments/KineticCard";
import { MorphCard } from "@/components/experiments/MorphCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const EXPERIMENTS = [
  {
    num: "01",
    title: "Aurora Mesh",
    desc: "Gradientes radiales en canvas 2D. Cada blob se mueve de forma independiente con funciones sinusoidales sobre un tiempo continuo.",
    Demo: AuroraCard,
  },
  {
    num: "02",
    title: "Campo Magnético",
    desc: "Motion springs que simulan atracción. El elemento calcula su offset relativo al centro del contenedor y aplica una fuerza proporcional.",
    Demo: MagneticCard,
  },
  {
    num: "03",
    title: "Tipografía Cinética",
    desc: "Cada carácter tiene su propia animación de spring. La proximidad al índice activo determina el desplazamiento y la escala.",
    Demo: KineticCard,
  },
  {
    num: "04",
    title: "Morph Geométrico",
    desc: "CSS clip-path interpolado entre polígonos. El navegador calcula las trayectorias intermedias con cubic-bezier personalizado.",
    Demo: MorphCard,
  },
];

function ExperimentRow({
  exp,
  index,
  inView,
}: {
  exp: (typeof EXPERIMENTS)[0];
  index: number;
  inView: boolean;
}) {
  const { Demo } = exp;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-16 border-t border-border"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.08 + index * 0.1, ease: EASE }}
    >
      <div
        className={`flex flex-col justify-center gap-5 ${isEven ? "" : "lg:order-last"}`}
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle">
          {exp.num}
        </span>
        <h3
          className="font-sans font-medium tracking-[-0.025em] text-fg"
          style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
        >
          {exp.title}
        </h3>
        <p className="text-sm text-fg-muted leading-[1.8] max-w-xs">
          {exp.desc}
        </p>
      </div>

      <div
        className={`h-64 lg:h-72 rounded-2xl overflow-hidden bg-bg-card border border-border ${isEven ? "" : "lg:order-first"}`}
      >
        <Demo />
      </div>
    </motion.div>
  );
}

export function Experiments() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="pb-32 bg-bg">
      <Container>
        <motion.div
          className="flex items-baseline gap-6 mb-4 pt-32"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
            002
          </p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
            Experimentos
          </p>
        </motion.div>

        {EXPERIMENTS.map((exp, i) => (
          <ExperimentRow key={exp.num} exp={exp} index={i} inView={inView} />
        ))}
      </Container>
    </section>
  );
}
