"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/JorgeNava",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jorgenavadelapena",
    external: true,
  },
  {
    label: "One Spark",
    href: "https://one-spark.com.mx",
    external: true,
  },
];

const EMAIL = "jorgenavadelapena@gmail.com";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section
      ref={ref}
      className="py-40 bg-bg border-t border-border"
    >
      <Container>
        <motion.div
          className="flex items-baseline gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
            004
          </p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
            Contacto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <div>
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.h2
                className="font-sans font-medium tracking-[-0.04em] text-fg leading-[0.9]"
                style={{ fontSize: "clamp(52px, 9vw, 110px)" }}
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.12, ease: EASE }}
              >
                Hable&shy;mos.
              </motion.h2>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col justify-end gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            {/* Email */}
            <button
              onClick={copyEmail}
              className="group flex items-center gap-4 text-left"
              aria-label="Copiar correo electrónico"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase mb-1">
                  Email
                </p>
                <p className="text-base text-fg-muted group-hover:text-fg transition-colors duration-300">
                  {EMAIL}
                </p>
              </div>
              <span className="ml-auto font-mono text-[10px] tracking-widest text-fg-subtle uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {copied ? "✓ copiado" : "copiar"}
              </span>
            </button>

            {/* Links */}
            <div className="flex flex-col gap-3 border-t border-border pt-8">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between group"
                >
                  <span className="text-base text-fg-muted group-hover:text-fg transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-fg-muted transition-colors duration-300">
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
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">
            Jorge Nava · 2026
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">
            Hecho con amor y demasiado café
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
