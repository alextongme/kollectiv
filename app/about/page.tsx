export default function AboutPage() {
  return (
    <div className="min-h-[85vh]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <span className="animate-fade-up inline-block w-fit rounded-full bg-[var(--color-accent)] px-3 py-1 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)]">
              About
            </span>
            <h1 className="animate-fade-up delay-1 mt-6 font-[var(--font-heading)] text-5xl font-bold leading-[1.1] text-white sm:text-7xl lg:text-8xl">
              The<br />Kollective
            </h1>
            <p className="animate-fade-up delay-2 mt-6 font-[var(--font-heading)] text-[15px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
              Est. 2016 &mdash; New York City
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center">
            <p className="animate-fade-up delay-2 text-xl leading-[1.8] text-[var(--color-text-muted)] sm:text-2xl">
              <Accent>THE KOLLECTIVE</Accent> is a global community of creative{" "}
              <Accent>artists</Accent>, with the intention of blogging about the
              unique fashion, music, and culture only found in{" "}
              <Accent>New York City</Accent>, to the rest of the{" "}
              <Accent>world</Accent>.
            </p>
            <p className="animate-fade-up delay-3 mt-8 text-xl leading-[1.8] text-[var(--color-text-muted)] sm:text-2xl">
              We also throw <Accent>sick</Accent> parties in the NYC area.
            </p>
            <div className="animate-fade-up delay-4 mt-10 flex items-center gap-4">
              <a
                href="/contact"
                className="rounded-full bg-[var(--color-accent)] px-6 py-3 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80"
              >
                Get in Touch
              </a>
              <a
                href="/artists"
                className="rounded-full border border-[var(--color-border)] px-6 py-3 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-muted)] transition-all hover:border-white/30 hover:text-white"
              >
                Meet the Crew &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-white">
      {children}
    </span>
  );
}
