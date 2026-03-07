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
            &copy; THE KOLLECTIVE 2016 &mdash; 2026
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[var(--color-text-faint)]">
              NYC &bull; By Alex Tong
            </span>
            <a
              href="https://alextong.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-6 w-6 overflow-hidden rounded-full transition-opacity hover:opacity-80"
              aria-label="Alex Tong"
            >
              <img src="/images/count_circle.png" alt="Alex Tong" className="h-full w-full object-cover" />
            </a>
            <a
              href="https://github.com/alextongme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-faint)] transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
