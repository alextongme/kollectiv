export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Newsletter */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase tracking-wide text-white">
              Stay in the loop
            </h3>
            <p className="mt-2 text-[15px] text-[var(--color-text-muted)]">
              Get updates on new posts, events, and mixes.
            </p>
          </div>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-l-full border border-[var(--color-border)] border-r-0 bg-[var(--color-surface-raised)] px-5 py-3 text-sm text-white placeholder-[var(--color-text-faint)] outline-none transition-colors focus:border-[var(--color-accent)] sm:w-64"
            />
            <button className="shrink-0 rounded-r-full bg-[var(--color-accent)] px-6 py-3 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <span className="text-[13px] text-[var(--color-text-faint)]">
            &copy; The Kollective 2016 &mdash; 2026
          </span>
          <span className="text-[13px] text-[var(--color-text-faint)]">
            NYC &bull; By Alex Tong
          </span>
        </div>
      </div>
    </footer>
  );
}
