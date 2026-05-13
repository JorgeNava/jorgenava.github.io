"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  { num: "01", name: "Arquitectura de Software",  sub: "Sistemas escalables, decisiones de largo plazo" },
  { num: "02", name: "Desarrollo Web",             sub: "Next.js, React, Node.js, APIs serverless" },
  { num: "03", name: "Tiendas en Línea",           sub: "Shopify, integraciones, alto tráfico" },
  { num: "04", name: "SEO & GEO",                  sub: "Buscadores tradicionales y motores de IA" },
  { num: "05", name: "Automatización",             sub: "Flujos automáticos, bots, integraciones" },
  { num: "06", name: "Consultoría Tecnológica",    sub: "Estrategia, diagnóstico, hoja de ruta" },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 bg-bg border-t border-border">
      <Container>
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">03</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Servicios</span>
        </motion.div>

        <div className="flex flex-col">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              className="group flex items-center gap-8 py-6 border-t border-border relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.06 * i, ease: E }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Gold slide background on hover */}
              <motion.div
                className="absolute inset-0 bg-gold/[0.04] pointer-events-none"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.4, ease: E }}
                aria-hidden
              />

              <span className="font-mono text-[10px] tracking-[0.2em] text-gold/50 w-8 shrink-0">
                {s.num}
              </span>

              <div className="flex flex-col gap-0.5 flex-1">
                <span
                  className="font-display font-light text-fg leading-tight transition-colors duration-300 group-hover:text-gold-light"
                  style={{ fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "-0.01em" }}
                >
                  {s.name}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
                  {s.sub}
                </span>
              </div>

              <motion.span
                className="font-mono text-[11px] text-gold ml-auto shrink-0"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -8 }}
                transition={{ duration: 0.25 }}
              >
                →
              </motion.span>
            </motion.div>
          ))}
          {/* last border */}
          <div className="border-t border-border" />
        </div>
      </Container>
    </section>
  );
}
