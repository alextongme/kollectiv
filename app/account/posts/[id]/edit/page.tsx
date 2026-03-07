"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then(setPost);
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;
    setSaving(true);

    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    router.push("/account/posts");
  }

  if (!post) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
      <Link
        href="/account/posts"
        className="self-start text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
      >
        &larr; Back to posts
      </Link>

      <Field label="Title" value={post.title || ""} onChange={(v) => setPost({ ...post, title: v })} />
      <Field label="Subtitle" value={post.subtitle || ""} onChange={(v) => setPost({ ...post, subtitle: v })} />

      <div>
        <label className="mb-1.5 block font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
          Content
        </label>
        <textarea
          value={post.content || ""}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows={8}
          className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <Field label="Image URL" value={post.imageUrl || ""} onChange={(v) => setPost({ ...post, imageUrl: v })} />

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-[var(--font-heading)] text-[13px] font-bold tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Update"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
