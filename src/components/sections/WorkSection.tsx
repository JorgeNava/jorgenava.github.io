"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    name: "One Spark",
    type: "Consultoría Digital",
    year: "2022 — Presente",
    tags: ["Estrategia", "Desarrollo", "Marca"],
    desc: "Consultoría de emprendimiento digital. Acompañamos a empresas desde la estrategia hasta el producto terminado.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 20% 20%, rgba(80,30,180,0.5) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(40,15,100,0.4) 0%, transparent 60%)",
    href: "https://one-spark.com.mx",
    num: "01",
  },
  {
    name: "Maestros Joyeros",
    type: "eCommerce + SEO & GEO",
    year: "2024",
    tags: ["Shopify", "SEO", "Automatización"],
    desc: "Tienda Shopify de alta conversión con sistema de citas, control de precios y módulo de reparaciones.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 80% 20%, rgba(100,90,110,0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 20% 80%, rgba(60,55,70,0.35) 0%, transparent 60%)",
    href: "#",
    num: "02",
  },
  {
    name: "Bamberg Cervecería",
    type: "Plataforma LMS Cervecera",
    year: "2025",
    tags: ["Next.js", "AWS Lambda", "LMS"],
    desc: "Plataforma de aprendizaje en línea para la industria cervecera artesanal. Brewery Experience Hub.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 20% 80%, rgba(110,60,10,0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 20%, rgba(80,40,5,0.35) 0%, transparent 60%)",
    href: "#",
    num: "03",
  },
  {
    name: "Chinaco Tequila",
    type: "Presencia Digital",
    year: "2024",
    tags: ["Web", "Diseño", "SEO"],
    desc: "Sitio web y estrategia de presencia digital para marca de tequila premium con distribución internacional.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 80% 80%, rgba(10,60,70,0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 20% 20%, rgba(5,40,50,0.35) 0%, transparent 60%)",
    href: "#",
    num: "04",
  },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-border cursor-pointer"
      style={{ background: "#0D0B12" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1 + index * 0.1, ease: E }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient bg */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: project.gradient,
          opacity: hovered ? 1 : 0.7,
        }}
        aria-hidden
      />

      {/* Gold border on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(196,153,95,0.3)",
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-10 flex flex-col justify-between min-h-[320px]">
        {/* Top */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold/60 uppercase">
            {project.num}
          </span>
          <motion.span
            className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase"
            initial={{ opacity: 0, x: 8 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
          >
            Ver proyecto →
          </motion.span>
        </div>

        {/* Middle */}
        <div className="flex flex-col gap-3">
          <h3
            className="font-display font-light text-fg leading-[1.05] tracking-[-0.01em]"
            style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
          >
            {project.name}
          </h3>
          <motion.p
            className="text-sm text-fg-muted leading-relaxed max-w-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {project.desc}
          </motion.p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-6 border-t border-white/08 mt-4">
          <span className="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
            {project.type}
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-fg-subtle uppercase">
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} className="py-32 bg-bg border-t border-border">
      <Container>
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">02</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Proyectos</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} inView={inView} />
          ))}
        </div>
      </Container>
    </section>
  );
}
