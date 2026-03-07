export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--color-surface)]">
      {/* Newsletter */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-neutral-600">
              Stay in the loop
            </p>
            <p className="mt-2 text-lg text-[var(--color-bone)]">
              Get updates on new posts, events, and mixes.
            </p>
          </div>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-white/10 border-r-0 bg-transparent px-4 py-3 text-sm text-[var(--color-bone)] placeholder-neutral-700 outline-none transition-colors focus:border-[var(--color-accent)]/50 sm:w-64"
            />
            <button className="shrink-0 border border-white/10 bg-white/5 px-6 py-3 text-[10px] uppercase tracking-[3px] text-neutral-400 transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white">
              join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <span className="text-[10px] tracking-[3px] text-neutral-700">
            &copy; THE KOLLECTIVE 2016 &mdash; 2026
          </span>
          <span className="text-[10px] tracking-[3px] text-neutral-700">
            NYC &bull; BY ALEX TONG
          </span>
        </div>
      </div>
    </footer>
  );
}
