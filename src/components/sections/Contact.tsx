"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";

const E = [0.16, 1, 0.3, 1] as const;
const EMAIL = "jorgenavadelapena@gmail.com";

const LINKS = [
  { label: "GitHub",   href: "https://github.com/JorgeNava" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jorge-nava123/" },
  { label: "One Spark", href: "https://one-spark.com.mx" },
];

type FormState = { nombre: string; email: string; mensaje: string };

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const copy = () =>
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    setSending(true);

    // Small delay for UX feel, then open mailto
    await new Promise((r) => setTimeout(r, 600));

    const subject = encodeURIComponent(`Contacto desde el portafolio — ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\n\nMensaje:\n${form.mensaje}`
    );
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`);

    setSending(false);
    setSent(true);
    setForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section ref={ref} className="py-40 bg-bg border-t border-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(196,153,95,0.05) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Container className="relative z-10">
        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">07</span>
          <span className="block h-px w-10 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Contacto</span>
        </motion.div>

        {/* Top grid — heading + links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-end">
          {/* Left */}
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
            {/* Email copy */}
            <button onClick={copy} className="group flex flex-col gap-1 text-left w-full">
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">Email</span>
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

        {/* Form */}
        <motion.div
          className="mt-24 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: E }}
        >
          <p className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase mb-12">
            O escríbeme directamente
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] gap-x-16">
            {/* Nombre — left col row 1 */}
            <div className="flex flex-col gap-2 mb-10 lg:col-start-1 lg:row-start-1">
              <label className="font-mono text-[9px] tracking-[0.3em] text-fg uppercase">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="bg-transparent border-b border-white/35 py-3.5 text-base text-fg placeholder:text-fg-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
              />
            </div>

            {/* Email — left col row 2 */}
            <div className="flex flex-col gap-2 mb-10 lg:col-start-1 lg:row-start-2">
              <label className="font-mono text-[9px] tracking-[0.3em] text-fg uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                className="bg-transparent border-b border-white/35 py-3.5 text-base text-fg placeholder:text-fg-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
              />
            </div>

            {/* Mensaje — right col rows 1-3; in DOM order before button so mobile shows it before submit */}
            <div className="flex flex-col gap-2 mb-10 lg:col-start-2 lg:row-start-1 lg:row-span-3">
              <label className="font-mono text-[9px] tracking-[0.3em] text-fg uppercase">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
                rows={8}
                placeholder="Cuéntame sobre tu proyecto…"
                className="bg-transparent border-b border-white/35 py-3.5 text-base text-fg placeholder:text-fg-muted focus:outline-none focus:border-gold/60 transition-colors duration-300 resize-none flex-1"
              />
            </div>

            {/* Submit — left col row 3 */}
            <div className="pt-4 lg:col-start-1 lg:row-start-3">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.p
                    key="sent"
                    className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓ Mensaje enviado — revisa tu cliente de correo
                  </motion.p>
                ) : (
                  <motion.button
                    key="btn"
                    type="submit"
                    disabled={sending}
                    className="group flex items-center gap-4 border border-white/35 px-8 py-4 font-mono text-[10px] tracking-[0.25em] text-fg uppercase hover:border-gold/60 hover:text-gold transition-all duration-300 disabled:opacity-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {sending ? "Enviando…" : "Enviar mensaje"}
                    {!sending && (
                      <motion.span
                        className="text-gold"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

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
