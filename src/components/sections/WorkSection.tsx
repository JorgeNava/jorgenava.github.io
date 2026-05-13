"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
const E = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    name: "One Spark",
    type: "Consultoría Digital",
    year: "2022 — Presente",
    desc: "Consultoría de emprendimiento digital. Acompañamos a empresas desde la estrategia hasta el producto terminado: web, eCommerce, SEO y automatización.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 20% 20%, rgba(80,30,180,0.5) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(40,15,100,0.4) 0%, transparent 60%)",
    href: "https://one-spark.com.mx",
    num: "01",
    featured: true,
  },
  {
    name: "Maestros Joyeros",
    type: "eCommerce + SEO & GEO",
    year: "2024",
    desc: "Tienda Shopify de alta conversión con sistema de citas, control de precios y módulo de reparaciones para joyería premium.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 80% 20%, rgba(100,90,110,0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 20% 80%, rgba(60,55,70,0.35) 0%, transparent 60%)",
    href: "https://maestrosjoyeros.com",
    num: "02",
    featured: false,
  },
  {
    name: "Chinaco Tequila",
    type: "Presencia Digital",
    year: "2024",
    desc: "Sitio web y estrategia de presencia digital para marca de tequila premium con distribución internacional.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 80% 80%, rgba(10,60,70,0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 20% 20%, rgba(5,40,50,0.35) 0%, transparent 60%)",
    href: "https://chinacotequila.com",
    num: "03",
    featured: false,
  },
  {
    name: "INA Autopartes",
    type: "Portal Digital",
    year: "2023",
    desc: "Portal digital institucional para el Instituto Nacional de Autopartes de México.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 50% 10%, rgba(30,60,110,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 50% 90%, rgba(20,40,80,0.35) 0%, transparent 60%)",
    href: "https://ina.com.mx",
    num: "04",
    featured: false,
  },
  {
    name: "Agencia Mano",
    type: "Sitio Web",
    year: "2023",
    desc: "Sitio web institucional y portfolio para agencia creativa mexicana.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(60,20,100,0.4) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 50%, rgba(40,10,70,0.35) 0%, transparent 60%)",
    href: "https://agenciamano.mx",
    num: "05",
    featured: false,
  },
  {
    name: "Agua Marina",
    type: "Tienda en Línea",
    year: "2023",
    desc: "Tienda en línea de accesorios y moda con catálogo, gestión de inventario y pasarela de pagos integrada.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 80% 20%, rgba(10,60,80,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 20% 80%, rgba(5,40,60,0.35) 0%, transparent 60%)",
    href: "https://a118.mx",
    num: "06",
    featured: false,
  },
  {
    name: "Iowabre",
    type: "Plataforma Digital",
    year: "2024",
    desc: "Plataforma digital desarrollada a medida con arquitectura moderna y experiencia de usuario optimizada.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 30% 70%, rgba(0,90,80,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 70% 30%, rgba(0,60,55,0.35) 0%, transparent 60%)",
    href: "https://iowabrace.com.mx",
    num: "07",
    featured: false,
  },
  {
    name: "Ponseti",
    type: "Presencia Digital",
    year: "2024",
    desc: "Sitio web y presencia digital para proyecto especializado en el mercado mexicano.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 70% 20%, rgba(120,40,20,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 30% 80%, rgba(90,25,10,0.35) 0%, transparent 60%)",
    href: "https://ponseti.com.mx",
    num: "08",
    featured: false,
  },
  {
    name: "Kurunjuatha",
    type: "Desarrollo Web",
    year: "2024",
    desc: "Experiencia web interactiva con diseño único y arquitectura orientada al rendimiento y la conversión.",
    gradient:
      "radial-gradient(ellipse 80% 80% at 20% 30%, rgba(60,90,20,0.45) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 80% 70%, rgba(40,65,10,0.35) 0%, transparent 60%)",
    href: "https://kurunjuatha.com",
    num: "09",
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
  inView,
  small = false,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
  small?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Reveal description when card is in the centre third of the viewport (works on all devices)
  const [centerVisible, setCenterVisible] = useState(false);
  useEffect(() => {
    if (project.featured) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setCenterVisible(e.isIntersecting),
      { rootMargin: "-32% 0px -32% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [project.featured]);

  const showDesc = project.featured || hovered || centerVisible;

  const inner = (
    <>
      {/* Gradient bg */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ background: project.gradient, opacity: hovered ? 1 : 0.7 }}
        aria-hidden
      />
      {/* Gold border on hover / center-visible */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(196,153,95,0.3)", opacity: showDesc ? 1 : 0 }}
        aria-hidden
      />

      <div
        className={`relative z-10 flex flex-col justify-between ${
          small ? "p-6 min-h-[250px]" : project.featured ? "p-8 lg:p-10 min-h-[360px]" : "p-8 min-h-[280px]"
        }`}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold/60 uppercase">{project.num}</span>
          <motion.span
            className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase"
            initial={{ opacity: 0, x: 8 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
          >
            Ver ↗
          </motion.span>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <h3
            className="font-display font-light text-fg leading-[1.05] tracking-[-0.01em]"
            style={{
              fontSize: project.featured
                ? "clamp(28px, 4.5vw, 52px)"
                : small
                ? "clamp(18px, 2vw, 26px)"
                : "clamp(20px, 2.8vw, 32px)",
            }}
          >
            {project.name}
          </h3>
          {/* Description: always visible on featured; scroll-reveal on mobile; hover on desktop */}
          <motion.p
            className="text-sm text-fg-muted leading-relaxed max-w-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={showDesc ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45 }}
          >
            {project.desc}
          </motion.p>
        </div>

        <div
          className={`flex items-center justify-between border-t border-white/[0.06] ${
            small ? "pt-4 mt-4" : "pt-5 mt-6"
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">{project.type}</span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-fg-subtle uppercase">{project.year}</span>
        </div>
      </div>
    </>
  );

  const motionProps = {
    ref: cardRef,
    className: "relative overflow-hidden rounded-2xl border border-border cursor-pointer",
    style: { background: "#0D0B12" } as React.CSSProperties,
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: 0.06 + index * 0.07, ease: E },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  return (
    <motion.div {...motionProps}>
      {/* Invisible anchor overlay for navigation */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label={`Ver proyecto ${project.name}`}
      />
      {inner}
    </motion.div>
  );
}

export function WorkSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

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

        <div className="flex flex-col gap-4">
          <ProjectCard project={featured} index={0} inView={inView} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rest.map((p, i) => (
              <ProjectCard key={p.num} project={p} index={i + 1} inView={inView} small />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
