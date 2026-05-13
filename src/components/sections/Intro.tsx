"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { number: "8+",  label: "Años de\nexperiencia" },
  { number: "20+", label: "Proyectos\nentregados" },
  { number: "6",   label: "Industrias\natendidas" },
  { number: "3",   label: "Empresas\nfundadas" },
];

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="py-32 bg-bg">
      <Container>
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">01</span>
          <span className="block h-px flex-1 max-w-[40px] bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Sobre mí</span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-20 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: E }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col gap-2 px-8 py-10 bg-surface border-border">
              <span
                className="font-display font-light text-gold leading-none"
                style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {s.number}
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-fg-muted uppercase whitespace-pre-line leading-relaxed">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Photo + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
          {/* Photo */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.15, ease: E }}
          >
            {/* Gold border frame */}
            <div
              className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(196,153,95,0.18)" }}
              aria-hidden
            />
            {/* Subtle bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(6,6,8,0.5) 0%, transparent 100%)" }}
              aria-hidden
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/jorge.jpg"
              alt="Jorge Nava"
              className="w-full object-cover"
              style={{ aspectRatio: "3/4", display: "block" }}
            />
            {/* Caption */}
            <div className="absolute bottom-5 left-6 z-20">
              <span className="font-mono text-[9px] tracking-[0.3em] text-fg-subtle/70 uppercase">
                Jalisco · México
              </span>
            </div>
          </motion.div>

          {/* Bio text */}
          <div className="flex flex-col gap-8 lg:pt-4">
            {[
              "Soy Jorge Nava, arquitecto de software con sede en Guadalajara. Diseño sistemas digitales que escalan: desde APIs serverless y tiendas de alto tráfico hasta estrategias de presencia digital completas.",
              "Fundé One Spark para acompañar a empresas y emprendedores en cada etapa de su transformación digital — de la estrategia al código, del concepto al servidor en producción.",
              "Trabajo en la intersección del diseño y la ingeniería. Creo que los mejores productos son aquellos donde la forma y la función son inseparables.",
            ].map((p, i) => (
              <motion.p
                key={i}
                className="text-lg text-fg-muted leading-[1.85]"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: E }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
