"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY = [
  "Soy Jorge Nava, arquitecto de software con sede en Guadalajara. Llevo más de ocho años construyendo sistemas digitales que escalan: desde APIs serverless hasta tiendas de alto tráfico.",
  "Fundé One Spark para acompañar a empresas y emprendedores en su transformación digital. De la estrategia al código, del pixel al servidor.",
  "Este sitio es mi playground — donde el código y el diseño conversan sin apuro.",
];

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section ref={ref} className="py-40 bg-bg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          <motion.div
            className="flex flex-col gap-3 pt-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
              001
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
              Sobre mí
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {COPY.map((text, i) => (
              <motion.p
                key={i}
                className="text-lg text-fg-muted leading-[1.8]"
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.08 + i * 0.13,
                  ease: EASE,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
