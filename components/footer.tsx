export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm tracking-wide text-neutral-400">
            newsletter signup
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="email address"
              className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-neutral-400"
            />
            <button className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm tracking-wide text-white transition-all hover:bg-[var(--color-accent)] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-[var(--color-accent)] dark:hover:text-white">
              ok
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <span className="text-xs tracking-wide text-neutral-400">
            © The Kollective 2016 — 2026
          </span>
          <span className="text-xs tracking-wide text-neutral-400">
            by alex tong
          </span>
        </div>
      </div>
    </footer>
  );
}
