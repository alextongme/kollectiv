"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  imageUrl: string;
  username: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (session) {
      fetch("/api/account")
        .then((r) => r.json())
        .then(setProfile);
    }
  }, [session]);

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    await fetch("/api/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!profile) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-neutral-400">Loading profile...</p>
      </div>
    );
  }

  function update(field: keyof Profile, value: string) {
    setProfile((p) => (p ? { ...p, [field]: value } : p));
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <Label>username</Label>
        <p className="text-lg font-semibold">{profile.username}</p>
      </div>

      <Field
        label="first name"
        value={profile.firstName || ""}
        onChange={(v) => update("firstName", v)}
      />
      <Field
        label="last name"
        value={profile.lastName || ""}
        onChange={(v) => update("lastName", v)}
      />
      <Field
        label="email"
        value={profile.email || ""}
        onChange={(v) => update("email", v)}
      />

      <div>
        <Label>bio</Label>
        <textarea
          value={profile.bio || ""}
          onChange={(e) => update("bio", e.target.value)}
          rows={4}
          className="w-full max-w-lg resize-y rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:focus:border-neutral-400"
        />
      </div>

      <Field
        label="image url"
        value={profile.imageUrl || ""}
        onChange={(v) => update("imageUrl", v)}
      />

      <p className="text-xs text-neutral-400">
        Member since {new Date(profile.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={handleSave}
        disabled={saving}
        className="self-start rounded-full bg-neutral-900 dark:bg-neutral-100 px-6 py-2.5 text-sm tracking-wide text-white dark:text-neutral-900 transition-all hover:bg-[var(--color-accent)] disabled:opacity-50"
      >
        {saving ? "saving..." : saved ? "saved!" : "update"}
      </button>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-[11px] uppercase tracking-[2px] text-neutral-400 dark:text-neutral-500">
      {children}
    </label>
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
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 dark:focus:border-neutral-400"
      />
    </div>
  );
}
