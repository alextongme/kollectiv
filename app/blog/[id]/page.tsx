import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id: Number(id) },
    include: { artist: { select: { username: true } } },
  });

  if (!post) notFound();

  return (
    <article>
      {/* Hero image — full bleed */}
      {post.imageUrl && (
        <div className="relative h-[50vh] w-full overflow-hidden sm:h-[65vh]">
          <Image
            src={post.imageUrl}
            alt={post.title || "Blog post"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className={post.imageUrl ? "-mt-24 relative z-10" : "pt-16 sm:pt-24"}>
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-neutral-600 transition-colors hover:text-[var(--color-accent)]"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
            back
          </Link>

          {/* Meta */}
          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[3px] text-neutral-600">
            {post.artist && <span>{post.artist.username}</span>}
            <span className="h-3 w-px bg-neutral-800" />
            <span>{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-[var(--color-bone)] sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="mt-4 text-lg text-neutral-500 sm:text-xl">
              {post.subtitle}
            </p>
          )}

          <div className="mt-8 accent-line w-16" />

          {/* Body */}
          <div className="mt-10 whitespace-pre-line text-base leading-[1.9] text-neutral-400 sm:text-lg sm:leading-[1.9]">
            {post.content}
          </div>

          {/* Bottom nav */}
          <div className="mt-16 mb-24 border-t border-white/5 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-neutral-600 transition-colors hover:text-[var(--color-accent)]"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
              all posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
