import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { artist: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
  });

  const [hero, ...rest] = posts;

  return (
    <div>
      {/* Hero post */}
      {hero && (
        <Link href={`/blog/${hero.id}`} className="group relative block">
          <div className="relative h-[70vh] w-full overflow-hidden sm:h-[80vh]">
            {hero.imageUrl && (
              <Image
                src={hero.imageUrl}
                alt={hero.title || "Blog post"}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                sizes="100vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/50 to-transparent" />

            <div className="force-white absolute inset-0 flex items-end">
              <div className="w-full px-5 pb-12 sm:px-8 md:max-w-4xl md:px-16 md:pb-20">
                <span className="animate-fade-up inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)]">
                  Latest
                </span>
                <h1 className="animate-fade-up delay-1 mt-4 font-[var(--font-heading)] text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-7xl">
                  {hero.title}
                </h1>
                <p className="animate-fade-up delay-2 mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
                  {hero.subtitle}
                </p>
                <div className="animate-fade-up delay-3 mt-6 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-accent)] transition-all group-hover:gap-3">
                    Read Article
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                  </span>
                  {hero.artist && (
                    <>
                      <span className="h-4 w-px bg-white/20" />
                      <span className="text-[13px] text-white/40">
                        by {hero.artist.username}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Ticker / marquee */}
      <div className="overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-surface-raised)] py-3">
        <div className="animate-ticker flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-faint)]">
              Music <span className="text-[var(--color-accent)]">/</span> Culture <span className="text-[var(--color-accent)]">/</span> Fashion <span className="text-[var(--color-accent)]">/</span> NYC <span className="text-[var(--color-accent)]">/</span> Parties
            </span>
          ))}
        </div>
      </div>

      {/* Recent posts */}
      {rest.length > 0 && (
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-white">
              Recent
            </h2>
            <div className="h-px flex-1 ml-6 bg-[var(--color-border)]" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] transition-all hover:border-[var(--color-accent)]/30"
              >
                {post.imageUrl && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title || "Blog post"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <h3 className="font-[var(--font-heading)] text-lg font-bold leading-tight text-white transition-colors group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
                    {post.subtitle}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                      Read More &rarr;
                    </span>
                    {post.artist && (
                      <span className="text-[13px] text-[var(--color-text-faint)]">
                        {post.artist.username}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-[var(--font-heading)] text-lg font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
            No posts yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
