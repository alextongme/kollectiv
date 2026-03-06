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
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-neutral-400">Please log in to access your account.</p>
      </div>
    );
  }

  const links = [
    { href: "/account/profile", label: "artist profile" },
    { href: "/account/posts", label: "blog posts" },
    { href: "/account/posts/new", label: "new post" },
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 md:flex-row">
      <aside className="flex shrink-0 gap-2 overflow-x-auto md:w-48 md:flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-xl border px-5 py-3 text-sm tracking-wide transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:hover:border-neutral-400 dark:hover:text-white ${
              pathname === link.href
                ? "border-neutral-900 text-neutral-900 dark:border-neutral-400 dark:text-white"
                : "border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </aside>
      <div className="min-h-[500px] min-w-0 flex-1 overflow-y-auto rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
}
