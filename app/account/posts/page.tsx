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
        <p className="text-[var(--color-text-muted)]">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col gap-3 border-b border-[var(--color-border)] p-8 transition-colors hover:bg-[var(--color-surface-overlay)]"
        >
          <p className="font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-lg font-semibold text-white">{post.title}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{post.subtitle}</p>
          <div className="mt-2 flex gap-3">
            <Link
              href={`/account/posts/${post.id}/edit`}
              className="rounded-full bg-[var(--color-accent)] px-5 py-2 font-[var(--font-heading)] text-[12px] font-bold tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80"
            >
              Edit
            </Link>
            <button
              onClick={() => deletePost(post.id)}
              className="rounded-full border border-red-500/30 px-5 py-2 font-[var(--font-heading)] text-[12px] font-bold tracking-wide text-red-400 transition-all hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {posts.length === 0 && (
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-[var(--color-text-muted)]">
            No posts yet.{" "}
            <Link href="/account/posts/new" className="text-[var(--color-accent)] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
