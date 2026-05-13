# Portfolio · Plan de Acción 0 → 100

> **Proyecto:** Sitio web personal de Jorge Nava de la Peña
> **Tipo:** Playground técnico con estética minimalista premium
> **Objetivo:** Mostrar a amigos, clientes y reclutadores un sitio del que sentirme orgulloso
> **Idioma:** Español
> **Fecha de inicio:** 2026-05-12

---

## 1. Visión

Un sitio donde **cada detalle se siente premeditado**. Cero ruido, máxima intención. Aparenta ser un sitio simple a primera vista — pero cada interacción revela un nivel de pulido absurdo: tipografía que respira, transiciones con easing perfecto, un cursor que tiene personalidad, un fondo que reacciona sutilmente al scroll.

La referencia mental es **linear.app + vercel.com + framer.com** — sitios donde la tecnología cutting-edge está al servicio de la contención. Nada grita "mírame", pero todo invita a quedarse.

### Principios de diseño

1. **Restraint over abundance** — si una animación no aporta, no va. Cada efecto justifica su existencia.
2. **Detail is everything** — micro-interacciones invisibles hasta que alguien las nota y se enamora.
3. **Performance is the brand** — un sitio lento no puede ser premium. Lighthouse 95+ en todo.
4. **Typography first** — la tipografía es el 60% del diseño. El resto sirve a ella.
5. **Dark canvas** — fondo `#0A0A0A`, texto `#FAFAFA`, un solo acento. Sin gradientes saturados.

---

## 2. Stack técnico

| Capa | Tecnología | Por qué |
|------|------------|---------|
| **Framework** | Next.js 15 (App Router) con `output: 'export'` | Static export → GitHub Pages. DX top, optimizaciones automáticas, `next/font`, `next/image`. |
| **Lenguaje** | TypeScript estricto | Type-safety en componentes y data. |
| **Estilos** | Tailwind CSS v4 | Iteración rápida + tokens de diseño centralizados. v4 ya no requiere config file. |
| **Animaciones (componentes)** | Motion (antes Framer Motion) | Transiciones declarativas, layout animations, gestos. |
| **Animaciones (scroll)** | GSAP 3 + ScrollTrigger | Narrativa de scroll precisa, timelines complejos. Licencia gratis para uso personal. |
| **Smooth scroll** | Lenis (Studio Freight) | Inercia tipo Apple, integración perfecta con GSAP. |
| **3D / WebGL** | React Three Fiber + drei (opcional) | Solo si un experimento lo amerita. |
| **Shaders** | GLSL inline + react-three-fiber, o shader-park | Para fondo animado del hero (mesh gradient). |
| **Componentes UI** | shadcn/ui (selectivo) + Aceternity UI (selectivo) | Solo lo que aporte. Sin librerías pesadas. |
| **Iconos** | Lucide React | Stroke-based, consistentes, ligeros. |
| **Tipografía** | Geist Sans + Geist Mono (via `next/font/local`) | Diseñada por Vercel, perfecta para tech. Alternativa: Inter + JetBrains Mono. |
| **Linting** | ESLint + Prettier + lint-staged + Husky | Disciplina desde el día uno. |
| **CI/CD** | GitHub Actions | Build + deploy automático a GitHub Pages en cada push a `main`. |
| **Analytics** | Plausible (self-hosted en futuro) o Vercel Analytics | Privacy-first, sin cookies. Opcional fase 2. |

### Alternativas consideradas y descartadas

- **Astro** — excelente para sitios de contenido, pero las animaciones complejas con React islands añaden fricción innecesaria. Descartado.
- **Vanilla HTML/CSS/JS** — el sitio se vería igual, pero el desarrollo sería 3x más lento y mantenimiento peor. Descartado.
- **SvelteKit** — DX increíble, pero el ecosistema de animación es más pequeño y la curva mata el tiempo de entrega. Descartado.
- **Vercel hosting** — más fácil que GitHub Pages, pero el usuario pidió GitHub Pages. Lo dejamos como **plan B** si Pages da problemas.

---

## 3. Estructura de contenido

Como es un **playground**, no hay contenido funcional obligatorio. Pero necesitamos un esqueleto narrativo para que el visitante sienta que está recorriendo algo, no solo viendo demos sueltas.

### Estructura propuesta: long-scroll narrativo

Una sola página (one-pager) con secciones que fluyen. El visitante hace scroll y la página se le revela.

```
┌─ Sección 1 · HERO ─────────────────────────────────┐
│  Nombre grande. Tagline corto. Fondo: shader       │
│  gradient sutil que reacciona al mouse.            │
│  CTA: "Scroll" con indicador animado.              │
├─ Sección 2 · INTRO ────────────────────────────────┤
│  Dos párrafos cortos. "Soy Jorge. Construyo cosas  │
│  digitales." Reveal por carácter con scroll.       │
├─ Sección 3 · EXPERIMENTOS ─────────────────────────┤
│  Lista vertical de 4-5 experimentos. Cada uno con  │
│  su propia interactividad. Cards minimalistas.     │
├─ Sección 4 · MANIFIESTO ───────────────────────────┤
│  Texto largo, tipográfico. Cita o filosofía de     │
│  trabajo. Kinetic typography sutil.                │
├─ Sección 5 · CONTACTO ─────────────────────────────┤
│  Email, GitHub, LinkedIn. Footer minimal.          │
│  Easter egg: cursor cambia al hover.               │
└────────────────────────────────────────────────────┘
```

### Los 5 experimentos (showcase técnico)

Cada experimento es una demo autocontenida, embebida en su sección. Son **el corazón del playground**.

1. **Aurora mesh gradient (Hero background)**
   *Shader WebGL ultra-sutil* que genera un gradiente animado tipo aurora boreal. Colores oscuros casi-negros con tints púrpura/azul. Reacciona a la posición del mouse con paralaje muy suave. Inspiración: paper.design, vercel.com hero.

2. **Magnetic cursor + hover states**
   Cursor personalizado (un punto + outline) que se "imanta" hacia botones y links. Cambia de forma según el elemento bajo él (texto → línea vertical, link → círculo expandido, imagen → "ver"). Inspiración: studiotreble.com.

3. **Kinetic typography (Manifiesto)**
   Un párrafo donde las palabras se animan independientemente con el scroll. Cada palabra entra desde un offset diferente con stagger. Algunas palabras clave se distorsionan ligeramente al pasar el viewport central. GSAP SplitText + ScrollTrigger.

4. **Scroll-driven SVG morph**
   Una pieza SVG abstracta (líneas geométricas) que se redibuja a sí misma conforme el usuario hace scroll. Cada path tiene `pathLength` controlado por scroll progress. Estilo: ilustración técnica blueprint.

5. **3D wireframe object (opcional, decide en fase 4)**
   Un objeto 3D wireframe muy minimal (un toroide, un cubo) rotando lento en una de las secciones. React Three Fiber. Solo si no compromete performance mobile.

---

## 4. Sistema de diseño

### Paleta

```css
--bg:        #0A0A0A;  /* casi negro, no #000 (evita banding) */
--bg-elev:   #111111;  /* cards elevadas */
--fg:        #FAFAFA;  /* texto principal */
--fg-muted:  #A1A1A1;  /* texto secundario */
--fg-subtle: #525252;  /* borders, dividers */
--accent:    #FAFAFA;  /* uno solo — el mismo blanco del texto */
--accent-glow: rgba(250, 250, 250, 0.06); /* solo para highlights sutiles */
```

> **Nota:** un único acento (el mismo blanco). Cero colores. La riqueza viene de la tipografía y el espacio, no del color. Si después decidimos añadir UN acento cromático, será un solo tono saturado (#7C3AED púrpura o #06B6D4 cyan) usado con extrema moderación.

### Tipografía

```
Display:    Geist Sans · 56–120px · weight 500 · letter-spacing -0.04em
Headings:   Geist Sans · 24–40px  · weight 500 · letter-spacing -0.02em
Body:       Geist Sans · 16px     · weight 400 · line-height 1.6
Mono:       Geist Mono · 13–14px  · para labels, números, código
```

### Espaciado

Escala basada en `4px`. Secciones con `py-32` mínimo (128px). Generosidad obligatoria.

### Easing

```js
const easing = {
  out:    [0.16, 1, 0.3, 1],      // ease-out-expo — para entradas
  inOut:  [0.83, 0, 0.17, 1],     // ease-in-out-quart — para transitions
  bounce: [0.34, 1.56, 0.64, 1],  // overshoot sutil — solo para feedback
};
```

Duraciones: micro `0.15s`, base `0.4s`, narrative `0.8s`, hero `1.2s`. Nunca más de `1.2s` para no aburrir.

---

## 5. Arquitectura del repo

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build + deploy a gh-pages
├── public/
│   ├── fonts/                  # Geist Sans + Geist Mono .woff2
│   ├── og.png                  # Open Graph image 1200x630
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Home (single-page)
│   │   ├── globals.css         # Tailwind + design tokens
│   │   └── not-found.tsx       # 404 con personalidad
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Intro.tsx
│   │   │   ├── Experiments.tsx
│   │   │   ├── Manifesto.tsx
│   │   │   └── Contact.tsx
│   │   ├── experiments/
│   │   │   ├── AuroraMesh.tsx        # Shader hero bg
│   │   │   ├── MagneticCursor.tsx
│   │   │   ├── KineticText.tsx
│   │   │   ├── ScrollMorphSVG.tsx
│   │   │   └── WireframeObject.tsx   # opcional
│   │   ├── ui/
│   │   │   ├── Container.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Link.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx  # Lenis wrapper
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollProgress.ts
│   │   └── usePrefersReducedMotion.ts
│   ├── lib/
│   │   ├── easing.ts
│   │   └── gsap.ts             # GSAP config + ScrollTrigger plugin
│   └── styles/
│       └── tokens.css          # CSS custom properties
├── next.config.mjs             # output: 'export', basePath, images.unoptimized
├── tailwind.config.ts          # extends para tokens
├── tsconfig.json
├── package.json
├── README.md
└── PLAN.md                     # este archivo
```

---

## 6. Roadmap por fases

> **Estimación total:** 8–12 días de trabajo enfocado. Como es proyecto personal, sin presión de cliente, puede estirarse o comprimirse. La estimación asume sesiones de 3-4h.

### Fase 0 · Setup & Decisiones (medio día)

- [ ] Decidir nombre del repo (recomendación: `<github-username>.github.io` para que sirva en la raíz del dominio personal)
- [ ] Crear repo público en GitHub personal (NO en One-Spark-Co)
- [ ] Clonar repo a `/Users/jorge.nava/Personal/Repos/portfolio`
- [ ] Confirmar GitHub username y configurar git remote
- [ ] Decisión: ¿custom domain (`jorgenava.dev`?) o usar `<username>.github.io`?
- [ ] Crear board en Linear/Notion/GitHub Projects para tracking (opcional)

### Fase 1 · Bootstrap técnico (1 día)

- [ ] `npx create-next-app@latest portfolio --typescript --tailwind --app --eslint`
- [ ] Configurar `next.config.mjs` con `output: 'export'`, `images.unoptimized: true`, `basePath` si aplica
- [ ] Instalar dependencias core: `motion`, `gsap`, `@studio-freight/lenis`, `lucide-react`
- [ ] Instalar shadcn/ui con tema custom
- [ ] Configurar `next/font/local` para Geist Sans + Mono
- [ ] Setup Prettier + ESLint + Husky + lint-staged
- [ ] Crear `tokens.css` con todas las CSS variables del sistema de diseño
- [ ] Smoke test: `npm run build` debe generar `out/` exportable

### Fase 2 · Pipeline de deploy (medio día)

- [ ] Crear `.github/workflows/deploy.yml` con:
  - Trigger: push a `main`
  - Steps: checkout → setup node → install → build → upload artifact → deploy a `gh-pages`
- [ ] En GitHub: Settings → Pages → Source: GitHub Actions
- [ ] Primer deploy de "Hello World" para validar la cadena completa
- [ ] Verificar URL pública del sitio
- [ ] (Opcional) Configurar custom domain + CNAME

### Fase 3 · Sistema de diseño en código (1 día)

- [ ] Componente `<Container>` con max-width y padding responsivo
- [ ] Componente `<Section>` con spacing vertical estandarizado
- [ ] Componente `<Heading>` con variantes (display, h1, h2, h3)
- [ ] Componente `<Link>` con estado hover animado (underline reveal)
- [ ] `globals.css` con reset, scroll-behavior, selection colors, focus rings
- [ ] Layout root con metadata, fonts, providers
- [ ] Modo: solo dark (no toggle — es la marca)
- [ ] Test responsivo: 375px, 768px, 1280px, 1920px

### Fase 4 · Animation foundation (1 día)

- [ ] `<SmoothScrollProvider>` con Lenis configurado (lerp 0.1, wheelMultiplier 1)
- [ ] Integración Lenis ↔ GSAP ScrollTrigger (sincronizar tickers)
- [ ] Hook `usePrefersReducedMotion` — respetar `prefers-reduced-motion`
- [ ] Helper `reveal()` para fade-up de cualquier elemento con IntersectionObserver
- [ ] Configurar GSAP plugin SplitText (o alternativa free: `gsap-split-text-vars`)
- [ ] Test: scroll smooth funciona en desktop, fallback nativo en mobile (Lenis off)

### Fase 5 · Construir secciones (3–4 días)

#### Día 1 — Hero
- [ ] Layout del hero: nombre, tagline, scroll indicator
- [ ] Reveal animation: tipo a tipo con stagger, easing out-expo
- [ ] Experimento 1: Aurora mesh shader como fondo
- [ ] Mouse parallax sutil (translate 4-8px max)

#### Día 2 — Intro + Manifiesto
- [ ] Sección Intro: dos párrafos cortos con reveal por palabra
- [ ] Sección Manifiesto: experimento 3 (kinetic typography)
- [ ] Spacing y vertical rhythm afinados

#### Día 3 — Experimentos
- [ ] Lista vertical de experimentos
- [ ] Experimento 2: magnetic cursor (global, no solo aquí)
- [ ] Experimento 4: scroll-driven SVG morph
- [ ] Experimento 5: wireframe 3D (decisión go/no-go basada en perf)

#### Día 4 — Contacto + Footer
- [ ] Email con copy-on-click
- [ ] Links a GitHub, LinkedIn, Twitter/X (los que apliquen)
- [ ] Easter egg en footer (TBD — sorprenderme a mí mismo)

### Fase 6 · Polish (2 días)

- [ ] **Preloader** minimal: nombre + barra de progreso de assets, < 1.5s
- [ ] **Page transitions** (si crece a multi-page): fade + curtain
- [ ] **404 page** con personalidad (un experimento perdido)
- [ ] **Selection styling** custom
- [ ] **Focus states** visibles y elegantes (accesibilidad)
- [ ] **Reduced motion** verificado en cada animación
- [ ] **Tab navigation** completa
- [ ] Microcopy revisado palabra por palabra

### Fase 7 · Performance & SEO (1 día)

- [ ] Lighthouse audit, objetivo 95+ en las 4 categorías
- [ ] Bundle analysis con `@next/bundle-analyzer`
- [ ] Code-split de experimentos pesados con `dynamic()` y `loading: skeleton`
- [ ] Preload de fonts críticas, fallback `font-display: swap`
- [ ] OG image diseñada (1200x630, JPG optimizado)
- [ ] `<meta>` tags: title, description, OG, Twitter card
- [ ] `robots.txt` y `sitemap.xml` generados
- [ ] Test en BrowserStack o real devices: iPhone, Android, Safari, Firefox

### Fase 8 · Launch (medio día)

- [ ] Final deploy
- [ ] Smoke test en producción
- [ ] Compartir con 3 amigos cercanos para feedback antes de difundir
- [ ] Iterar 1 ronda con su feedback
- [ ] Post en LinkedIn / Twitter (opcional)
- [ ] Añadir URL al GitHub profile, signatura de email, CV

---

## 7. Recursos y referencias

### Inspiración (analizar a fondo, no copiar)

| Sitio | Qué robar |
|-------|-----------|
| linear.app | Restraint, tipografía, micro-animaciones de hover |
| vercel.com | Hero shader gradient, dark palette |
| paper.design | Aurora mesh background |
| brittanychiang.com | Layout long-scroll, navegación lateral |
| studiotreble.com | Magnetic cursor, transiciones |
| paco.me | Tipografía editorial, mood premium |
| igorbedesqui.com | Detalle obsesivo, scroll storytelling |
| basement.studio | Page transitions, atrevimiento contenido |

### Librerías de componentes free (canibalizar selectivamente)

- **Aceternity UI** — aceternity.com/components — aurora bg, spotlight, text reveal
- **Magic UI** — magicui.design — marquee, particles, animated beams
- **shadcn/ui** — ui.shadcn.com — base de componentes accesibles
- **Cult UI** — cult-ui.com — efectos modernos

### Fuentes

- **Geist** — vercel.com/font (gratis, OFL) ← *recomendación primaria*
- **Inter** — rsms.me/inter (gratis, OFL)
- **JetBrains Mono** — jetbrains.com/lp/mono (gratis, OFL)

### Documentación clave

- Next.js static export: nextjs.org/docs/app/building-your-application/deploying/static-exports
- GitHub Pages con Actions: docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow
- Lenis + GSAP: lenis.darkroom.engineering
- React Three Fiber: r3f.docs.pmnd.rs

---

## 8. Riesgos y decisiones abiertas

| Riesgo / Decisión | Mitigación / Pregunta |
|---|---|
| **GitHub Pages tiene limitaciones para Next.js** (no API routes, no Image Optimization runtime, no middleware) | Static export resuelve todo eso. Si necesitamos algo dinámico después, migrar a Vercel (free tier). |
| **Performance del shader en mobile** | Detectar device pixel ratio + GPU tier; fallback a gradient CSS estático en low-end. |
| **GSAP SplitText es de pago** | Usar alternativas free: `gsap-split-text-vars` o split manual con regex. |
| **¿Custom domain?** | Decidir en Fase 0. Opciones: `jorgenava.dev` (Google Domains, ~$12/año), `jorgenava.me`, o gratis `<username>.github.io`. |
| **¿Cuál es tu GitHub username personal?** | Confirmar antes de Fase 0. |
| **¿Necesitamos PWA / offline?** | No por ahora. Decisión: NO. |
| **Accesibilidad** | Lighthouse a11y 95+ obligatorio. Reduced motion respetado en cada animación. Contrast ratio AAA donde sea posible. |

---

## 9. Definition of Done

El sitio se considera "lanzado" cuando:

- ✅ Lighthouse 95+ en Performance, Accessibility, Best Practices, SEO en mobile y desktop
- ✅ Despliegue automatizado: push a `main` actualiza producción en < 3 min
- ✅ Funciona perfecto en: Safari (iOS + macOS), Chrome, Firefox, Edge
- ✅ Funciona perfecto en: iPhone SE, iPhone 15, iPad, MacBook 13", monitor 27" 4K
- ✅ Cero errores en consola, cero warnings en build
- ✅ `prefers-reduced-motion` respetado
- ✅ Tab navigation completa con focus visible
- ✅ OG preview se ve bonito al compartir en WhatsApp, LinkedIn, Twitter
- ✅ Mostrar a 3 personas y que digan "qué chingón" sin preguntarles

---

## 10. Próximos pasos inmediatos

Cuando me digas "go", arranco con:

1. Pedirte tu **GitHub username personal** (no One-Spark-Co)
2. Decidir contigo el **nombre del repo** y si vamos con **custom domain**
3. Ejecutar Fase 0 + Fase 1 en una sola sesión (setup completo + primer deploy de Hello World en producción)

A partir de ahí, te muestro el deploy funcionando y avanzamos fase por fase.

---

*Última actualización: 2026-05-12*
