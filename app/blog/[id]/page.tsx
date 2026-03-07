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
      {/* Hero image */}
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
            Back
          </Link>

          {/* Meta */}
          <div className="mt-8 flex items-center gap-3 text-[14px] text-[var(--color-text-muted)]">
            {post.artist && <span className="font-medium">{post.artist.username}</span>}
            <span className="h-4 w-px bg-[var(--color-border)]" />
            <span>{new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-bold leading-[1.15] text-white sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="mt-4 text-lg text-[var(--color-text-muted)] sm:text-xl">
              {post.subtitle}
            </p>
          )}

          <div className="mt-8 h-px w-16 bg-[var(--color-accent)]" />

          {/* Body */}
          <div className="mt-10 whitespace-pre-line text-[16px] leading-[1.9] text-[var(--color-text-muted)] sm:text-[17px]">
            {post.content}
          </div>

          {/* Bottom nav */}
          <div className="mt-16 mb-24 border-t border-[var(--color-border)] pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
