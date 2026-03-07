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
        <p className="text-[var(--color-text-muted)]">Loading profile...</p>
      </div>
    );
  }

  function update(field: keyof Profile, value: string) {
    setProfile((p) => (p ? { ...p, [field]: value } : p));
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <Label>Username</Label>
        <p className="text-lg font-semibold text-white">{profile.username}</p>
      </div>

      <Field label="First Name" value={profile.firstName || ""} onChange={(v) => update("firstName", v)} />
      <Field label="Last Name" value={profile.lastName || ""} onChange={(v) => update("lastName", v)} />
      <Field label="Email" value={profile.email || ""} onChange={(v) => update("email", v)} />

      <div>
        <Label>Bio</Label>
        <textarea
          value={profile.bio || ""}
          onChange={(e) => update("bio", e.target.value)}
          rows={4}
          className="w-full max-w-lg resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <Field label="Image URL" value={profile.imageUrl || ""} onChange={(v) => update("imageUrl", v)} />

      <p className="text-[13px] text-[var(--color-text-faint)]">
        Member since {new Date(profile.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={handleSave}
        disabled={saving}
        className="self-start rounded-full bg-[var(--color-accent)] px-6 py-2.5 font-[var(--font-heading)] text-[13px] font-bold tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Update"}
      </button>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
      {children}
    </label>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
