"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  subtitle: string;
  createdAt: string;
}

export default function AccountPostsPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch("/api/blog")
        .then((r) => r.json())
        .then((data) => {
          const artistId = (session.user as any).artistId;
          setPosts(data.filter((p: any) => p.artistId === artistId));
          setLoading(false);
        });
    }
  }, [session]);

  async function deletePost(id: number) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-neutral-400">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col gap-3 border-b border-neutral-100 dark:border-neutral-800 p-8 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <p className="text-[11px] uppercase tracking-[2px] text-neutral-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{post.subtitle}</p>
          <div className="mt-2 flex gap-3">
            <Link
              href={`/account/posts/${post.id}/edit`}
              className="rounded-full bg-neutral-900 dark:bg-neutral-100 px-5 py-2 text-xs tracking-wide text-white dark:text-neutral-900 transition-all hover:bg-[var(--color-accent)]"
            >
              edit
            </Link>
            <button
              onClick={() => deletePost(post.id)}
              className="rounded-full border border-red-300 dark:border-red-700 px-5 py-2 text-xs tracking-wide text-red-500 dark:text-red-400 transition-all hover:bg-red-500 hover:text-white"
            >
              delete
            </button>
          </div>
        </div>
      ))}

      {posts.length === 0 && (
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-neutral-400">
            No posts yet.{" "}
            <Link
              href="/account/posts/new"
              className="text-[var(--color-accent)] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
