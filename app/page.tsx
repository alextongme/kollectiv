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
      {/* Hero post — full bleed */}
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
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)]/60 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-5 pb-12 sm:px-8 md:max-w-3xl md:px-16 md:pb-20">
                <p className="animate-fade-up font-[var(--font-mono)] text-[10px] uppercase tracking-[4px] text-[var(--color-accent)]">
                  latest
                </p>
                <h1 className="animate-fade-up delay-1 mt-3 font-[var(--font-serif)] text-4xl leading-[1.1] text-white sm:text-5xl md:text-7xl">
                  {hero.title}
                </h1>
                <p className="animate-fade-up delay-2 mt-4 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base">
                  {hero.subtitle}
                </p>
                <div className="animate-fade-up delay-3 mt-6 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[3px] text-[var(--color-accent)] transition-all group-hover:gap-3">
                    read article
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                  </span>
                  {hero.artist && (
                    <>
                      <span className="h-3 w-px bg-neutral-700" />
                      <span className="text-[10px] tracking-[2px] text-neutral-600">
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

      {/* Ticker / marquee divider */}
      <div className="overflow-hidden border-y border-white/5 bg-[var(--color-surface-raised)] py-3">
        <div className="animate-ticker flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-neutral-700">
              music <span className="text-[var(--color-accent)]">&bull;</span> culture <span className="text-[var(--color-accent)]">&bull;</span> fashion <span className="text-[var(--color-accent)]">&bull;</span> nyc <span className="text-[var(--color-accent)]">&bull;</span> parties
            </span>
          ))}
        </div>
      </div>

      {/* Rest of posts — editorial grid */}
      {rest.length > 0 && (
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="mb-12 flex items-center gap-4">
            <h2 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-neutral-500">
              Recent
            </h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid gap-px bg-white/5 sm:grid-cols-2">
            {rest.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group relative flex flex-col bg-[var(--color-surface)] transition-colors hover:bg-[var(--color-surface-raised)]"
              >
                {post.imageUrl && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title || "Blog post"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-60" />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <h3 className="font-[var(--font-serif)] text-xl leading-tight text-[var(--color-bone)] transition-colors group-hover:text-white sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {post.subtitle}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[3px] text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                      read more &rarr;
                    </span>
                    {post.artist && (
                      <span className="text-[10px] tracking-[2px] text-neutral-700">
                        {post.artist.username}
                      </span>
                    )}
                  </div>
                </div>

                {/* Issue number */}
                <span className="absolute right-4 top-4 text-[10px] tabular-nums tracking-wider text-neutral-800">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-neutral-700">
            No posts yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
