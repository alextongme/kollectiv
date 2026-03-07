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
      <Input name="title" placeholder="Title" />
      <Input name="subtitle" placeholder="Subtitle" />
      <textarea
        name="content"
        placeholder="Content"
        rows={8}
        required
        className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
      />
      <Input name="imageUrl" placeholder="Image URL" />
      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-[var(--font-heading)] text-[13px] font-bold tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {saving ? "Publishing..." : "Publish"}
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
      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
    />
  );
}
