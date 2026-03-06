import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { artist: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl sm:flex-row dark:border-neutral-800 dark:bg-neutral-900"
          >
            {post.imageUrl && (
              <div className="relative h-56 w-full shrink-0 overflow-hidden bg-neutral-100 sm:h-auto sm:w-[55%] dark:bg-neutral-800">
                <Image
                  src={post.imageUrl}
                  alt={post.title || "Blog post"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 55vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-10">
              <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {post.subtitle}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-1.5 text-xs tracking-widest text-white transition-colors group-hover:bg-[var(--color-accent)] dark:bg-neutral-100 dark:text-neutral-900 dark:group-hover:bg-[var(--color-accent)] dark:group-hover:text-white">
                  read more
                </span>
                {post.artist && (
                  <span className="text-xs text-neutral-400">
                    by {post.artist.username}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="py-20 text-center text-neutral-400">
            No posts yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
