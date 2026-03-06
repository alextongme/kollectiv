"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = Object.fromEntries(new FormData(e.currentTarget));

    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/account/posts");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8">
      <Input name="title" placeholder="title" />
      <Input name="subtitle" placeholder="subtitle" />
      <textarea
        name="content"
        placeholder="content"
        rows={8}
        required
        className="w-full resize-y rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:focus:border-neutral-400"
      />
      <Input name="imageUrl" placeholder="image url" />
      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-neutral-900 dark:bg-neutral-100 px-6 py-2.5 text-sm tracking-wide text-white dark:text-neutral-900 transition-all hover:bg-[var(--color-accent)] disabled:opacity-50"
      >
        {saving ? "publishing..." : "publish"}
      </button>
    </form>
  );
}

function Input({ name, placeholder }: { name: string; placeholder: string }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      required={name !== "imageUrl"}
      className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:focus:border-neutral-400"
    />
  );
}
