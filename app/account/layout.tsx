"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Please log in to access your account.</p>
      </div>
    );
  }

  const links = [
    { href: "/account/profile", label: "Artist Profile" },
    { href: "/account/posts", label: "Blog Posts" },
    { href: "/account/posts/new", label: "New Post" },
  ];

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row">
      <aside className="flex shrink-0 gap-2 overflow-x-auto md:w-48 md:flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-lg border px-4 py-2.5 font-[var(--font-heading)] text-[13px] font-medium tracking-wide transition-colors ${
              pathname === link.href
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/30 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </aside>
      <div className="min-h-[500px] min-w-0 flex-1 overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        {children}
      </div>
    </div>
  );
}
