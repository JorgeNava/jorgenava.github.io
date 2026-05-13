"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;
const EMAIL = "jorgenavadelapena@gmail.com";

const LINKS = [
  { label: "GitHub",   href: "https://github.com/JorgeNava" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jorgenavadelapena" },
  { label: "One Spark",href: "https://one-spark.com.mx" },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [copied, setCopied] = useState(false);

  const copy = () =>
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });

  return (
    <section ref={ref} className="py-40 bg-bg border-t border-border relative overflow-hidden">
      {/* Subtle gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(196,153,95,0.05) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Container className="relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">06</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Contacto</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-end">
          {/* Left — big heading */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display font-light text-fg leading-[0.88] tracking-[-0.01em]"
                style={{ fontSize: "clamp(60px, 11vw, 140px)" }}
                initial={{ y: "108%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.12, ease: E }}
              >
                Hable&shy;mos.
              </motion.h2>
            </div>

            <motion.p
              className="mt-8 text-base text-fg-muted leading-relaxed max-w-xs"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: E }}
            >
              Abierto a proyectos de desarrollo web, consultoría tecnológica y colaboraciones estratégicas.
            </motion.p>
          </div>

          {/* Right — links */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: E }}
          >
            {/* Email */}
            <button
              onClick={copy}
              className="group flex flex-col gap-1 text-left w-full"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">
                Email
              </span>
              <div className="flex items-center justify-between border-b border-border pb-3 group-hover:border-gold/40 transition-colors duration-300">
                <span className="text-base text-fg-muted group-hover:text-fg transition-colors duration-300 break-all">
                  {EMAIL}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-gold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4 shrink-0">
                  {copied ? "✓ copiado" : "copiar"}
                </span>
              </div>
            </button>

            {/* Social links */}
            <div className="flex flex-col gap-0">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-border py-4 hover:border-gold/40 transition-colors duration-300"
                >
                  <span className="text-base text-fg-muted group-hover:text-fg transition-colors duration-300">
                    {l.label}
                  </span>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-gold transition-colors duration-300">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="flex items-center justify-between mt-32 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">
            © 2026 Jorge Nava
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">
            Jalisco, México
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
