"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    num: "01", name: "Arquitectura de Software", sub: "Sistemas escalables, decisiones de largo plazo",
    desc: "Diseñamos la base técnica de tu producto: APIs, microservicios, bases de datos y la hoja de ruta para escalar sin deuda técnica.",
    tools: ["Node.js", "AWS SAM", "PostgreSQL", "Redis", "DynamoDB"],
  },
  {
    num: "02", name: "Desarrollo Web", sub: "Next.js, React, Node.js, APIs serverless",
    desc: "Sitios y aplicaciones web rápidos, responsivos y bien optimizados. Desde landing pages hasta plataformas complejas con arquitectura serverless.",
    tools: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vercel"],
  },
  {
    num: "03", name: "Tiendas en Línea", sub: "Shopify, integraciones, alto tráfico",
    desc: "eCommerce de alta conversión con catálogos, pasarelas de pago, lógica de envíos y automatizaciones para escalar ventas.",
    tools: ["Shopify", "Liquid", "Shopify CLI", "Matrixify", "Klaviyo"],
  },
  {
    num: "04", name: "SEO & GEO", sub: "Buscadores tradicionales y motores de IA",
    desc: "Posicionamiento en Google y en motores de IA generativa como ChatGPT, Perplexity y Bing AI. Schema.org, Core Web Vitals y estrategia de contenido.",
    tools: ["Schema.org", "SEMrush", "Google Search Console", "PageSpeed", "Bing AI"],
  },
  {
    num: "05", name: "Automatización", sub: "Flujos automáticos, bots, integraciones",
    desc: "Eliminamos las tareas repetitivas con flujos automáticos, bots y conectores entre plataformas. Ahorra tiempo, reduce errores y escala sin más personal.",
    tools: ["n8n", "Make", "AWS Lambda", "Zapier", "APIs REST"],
  },
  {
    num: "06", name: "Consultoría Tecnológica", sub: "Estrategia, diagnóstico, hoja de ruta",
    desc: "Diagnóstico profundo de tu infraestructura digital y una hoja de ruta concreta para crecer sin cuellos de botella técnicos.",
    tools: ["Tech Roadmap", "Auditorías", "Team Coaching", "Arquitectura", "Due Diligence"],
  },
  {
    num: "07", name: "Sistemas de IA", sub: "Agentes, RAG, automatización con LLMs",
    desc: "Integramos inteligencia artificial en tu negocio: chatbots, agentes autónomos, procesamiento de documentos y workflows con los últimos modelos de IA.",
    tools: ["Claude API", "OpenAI", "LangChain", "RAG", "Vector DBs"],
  },
  {
    num: "08", name: "Desarrollo Móvil", sub: "Apps iOS y Android con React Native",
    desc: "Aplicaciones móviles nativas y multiplataforma. Desde el diseño UX hasta el lanzamiento en App Store y Google Play con actualizaciones OTA.",
    tools: ["React Native", "Expo", "iOS", "Android", "Supabase"],
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

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
              className="border-t border-border relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: E }}
            >
              {/* Gold slide background on hover */}
              <motion.div
                className="absolute inset-0 bg-gold/[0.04] pointer-events-none"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered === i || open === i ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.4, ease: E }}
                aria-hidden
              />

              {/* Row — clickable */}
              <button
                className="group flex items-center gap-8 py-6 w-full text-left relative z-10"
                onClick={() => toggle(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold/50 w-8 shrink-0">
                  {s.num}
                </span>

                <div className="flex flex-col gap-0.5 flex-1">
                  <span
                    className="font-display font-light text-fg leading-tight transition-colors duration-300 group-hover:text-gold-light text-left"
                    style={{ fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "-0.01em" }}
                  >
                    {s.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
                    {s.sub}
                  </span>
                </div>

                {/* +/− toggle */}
                <motion.span
                  className="font-mono text-[18px] text-gold ml-auto shrink-0 leading-none"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: E }}
                >
                  +
                </motion.span>
              </button>

              {/* Expanded panel */}
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    key={`panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: E }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="pb-8 pl-16 flex flex-col gap-5 relative z-10">
                      <p className="text-sm text-fg-muted leading-[1.85] max-w-lg">
                        {s.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[9px] tracking-[0.15em] text-gold/70 uppercase border border-gold/20 px-3 py-1.5 rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {/* last border */}
          <div className="border-t border-border" />
        </div>
      </Container>
    </section>
  );
}
