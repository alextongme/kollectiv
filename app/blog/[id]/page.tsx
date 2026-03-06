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
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white"
      >
        ← back to blog
      </Link>

      {post.imageUrl && (
        <div className="relative mt-8 h-[50vh] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={post.imageUrl}
            alt={post.title || "Blog post"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <h1 className="mt-10 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {post.title}
      </h1>

      <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">{post.subtitle}</p>

      <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
        {post.artist && <span>by {post.artist.username}</span>}
        <span>·</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-10 whitespace-pre-line text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
        {post.content}
      </div>
    </article>
  );
}
