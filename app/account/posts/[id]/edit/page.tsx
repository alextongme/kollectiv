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
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
      <Link
        href="/account/posts"
        className="self-start text-sm text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        ← back to posts
      </Link>

      <Field
        label="title"
        value={post.title || ""}
        onChange={(v) => setPost({ ...post, title: v })}
      />
      <Field
        label="subtitle"
        value={post.subtitle || ""}
        onChange={(v) => setPost({ ...post, subtitle: v })}
      />

      <div>
        <label className="mb-1 block text-[11px] uppercase tracking-[2px] text-neutral-400 dark:text-neutral-500">
          content
        </label>
        <textarea
          value={post.content || ""}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows={8}
          className="w-full resize-y rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:focus:border-neutral-400"
        />
      </div>

      <Field
        label="image url"
        value={post.imageUrl || ""}
        onChange={(v) => setPost({ ...post, imageUrl: v })}
      />

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-neutral-900 dark:bg-neutral-100 px-6 py-2.5 text-sm tracking-wide text-white dark:text-neutral-900 transition-all hover:bg-[var(--color-accent)] disabled:opacity-50"
      >
        {saving ? "saving..." : "update"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] uppercase tracking-[2px] text-neutral-400 dark:text-neutral-500">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:focus:border-neutral-400"
      />
    </div>
  );
}
