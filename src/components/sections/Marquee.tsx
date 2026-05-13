"use client";

const ITEMS = [
  "Arquitectura de Software",
  "Next.js & React",
  "eCommerce Shopify",
  "AWS Serverless",
  "SEO & GEO",
  "Automatización",
  "Jalisco, México",
  "Disponible para proyectos",
];

export function Marquee() {
  const full = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-t border-b border-border py-4 bg-bg-2">
      {/* Gold left/right fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-bg-2 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-bg-2 to-transparent pointer-events-none" />

      <div className="marquee-track gap-0">
        {full.map((item, i) => (
          <span key={i} className="flex items-center gap-0 shrink-0">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-fg-muted whitespace-nowrap">
              {item}
            </span>
            <span className="mx-8 text-gold text-xs opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
