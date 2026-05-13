import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Repositorios — Jorge Nava",
  description: "Repositorios públicos de Jorge Nava en GitHub: proyectos open source, experimentos y herramientas.",
};

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const LANG_COLOR: Record<string, { bg: string; dot: string }> = {
  TypeScript:  { bg: "rgba(49,120,198,0.18)",  dot: "#60A5FA" },
  JavaScript:  { bg: "rgba(247,223,30,0.15)",  dot: "#FCD34D" },
  Python:      { bg: "rgba(55,118,171,0.18)",  dot: "#93C5FD" },
  CSS:         { bg: "rgba(102,51,153,0.18)",  dot: "#C084FC" },
  HTML:        { bg: "rgba(227,79,38,0.18)",   dot: "#FCA5A5" },
  Shell:       { bg: "rgba(137,224,81,0.15)",  dot: "#86EFAC" },
  Liquid:      { bg: "rgba(6,180,180,0.15)",   dot: "#67E8F9" },
  Ruby:        { bg: "rgba(204,52,45,0.18)",   dot: "#FCA5A5" },
  Go:          { bg: "rgba(0,173,216,0.15)",   dot: "#67E8F9" },
  MDX:         { bg: "rgba(196,153,95,0.15)",  dot: "#D9B97A" },
};

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/JorgeNava/repos?type=public&per_page=100&sort=updated",
      { cache: "force-cache" }
    );
    if (!res.ok) return [];
    const data: Repo[] = await res.json();
    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
  });
}

export default async function ReposPage() {
  const repos = await getRepos();

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Top nav */}
      <header className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-bg/80">
        <Container>
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase hover:text-gold transition-colors duration-200 flex items-center gap-2"
            >
              ← Portafolio
            </Link>
            <span className="font-mono text-[10px] tracking-[0.25em] text-fg-subtle uppercase">
              {repos.length} repositorios
            </span>
          </div>
        </Container>
      </header>

      <main className="py-24">
        <Container>
          {/* Header */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <span className="font-mono text-[10px] tracking-[0.25em] text-gold uppercase">GitHub</span>
              <span className="block h-px w-10 bg-gold/30" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-fg-muted uppercase">Código Abierto</span>
            </div>
            <h1
              className="font-display font-light text-fg leading-[0.9] tracking-[-0.01em] mb-6"
              style={{ fontSize: "clamp(48px, 9vw, 110px)" }}
            >
              Repositorios.
            </h1>
            <p className="text-base text-fg-muted leading-relaxed max-w-lg">
              Proyectos públicos en GitHub — desde plataformas de producción hasta experimentos y herramientas internas. Actualizados al momento del último build.
            </p>
          </div>

          {/* Repos grid */}
          {repos.length === 0 ? (
            <p className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase">
              No se pudieron cargar los repositorios. Intenta de nuevo más tarde.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {repos.map((repo, i) => {
                const langStyle = repo.language ? LANG_COLOR[repo.language] : null;
                return (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col rounded-2xl border border-border bg-[#0D0B12] p-6 transition-all duration-500 hover:border-[rgba(196,153,95,0.3)] hover:bg-[#110F18]"
                    style={{ minHeight: "220px" }}
                  >
                    {/* Subtle hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,153,95,0.06) 0%, transparent 70%)",
                      }}
                      aria-hidden
                    />

                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-gold/50 uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-3">
                        {repo.stargazers_count > 0 && (
                          <span className="font-mono text-[10px] tracking-widest text-fg-subtle flex items-center gap-1">
                            ★ {repo.stargazers_count}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-widest">
                          ↗
                        </span>
                      </div>
                    </div>

                    {/* Repo name */}
                    <h2
                      className="font-display font-light text-fg leading-[1.05] tracking-[-0.01em] mb-3 relative z-10 group-hover:text-fg transition-colors duration-300"
                      style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                    >
                      {repo.name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-fg-muted leading-relaxed flex-1 mb-6 relative z-10">
                      {repo.description || (
                        <span className="text-fg-subtle italic">Sin descripción</span>
                      )}
                    </p>

                    {/* Footer */}
                    <div className="relative z-10 space-y-3">
                      {/* Topics */}
                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {repo.topics.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] tracking-[0.15em] text-fg-muted uppercase px-2 py-0.5 rounded-full border border-white/[0.07] bg-white/[0.03]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Language + date */}
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                        {langStyle && repo.language ? (
                          <span
                            className="font-mono text-[9px] tracking-[0.18em] uppercase flex items-center gap-1.5 px-2 py-1 rounded-full"
                            style={{ background: langStyle.bg, color: langStyle.dot }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: langStyle.dot }}
                              aria-hidden
                            />
                            {repo.language}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="font-mono text-[9px] tracking-[0.15em] text-fg-subtle uppercase">
                          {formatDate(repo.updated_at)}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-24 pt-8 border-t border-border">
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase hover:text-gold transition-colors duration-200"
            >
              ← Volver al portafolio
            </Link>
            <a
              href="https://github.com/JorgeNava"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] text-fg-subtle uppercase hover:text-gold transition-colors duration-200"
            >
              Ver en GitHub ↗
            </a>
          </div>
        </Container>
      </main>
    </div>
  );
}
