export default function AboutPage() {
  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)]/5 blur-[150px]" />
      <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl items-center px-5 py-24 sm:min-h-[85vh] sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — label + decorative */}
          <div className="flex flex-col justify-center">
            <p className="animate-fade-up font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-[var(--color-accent)]">
              About
            </p>
            <div className="animate-fade-up delay-1 mt-6">
              <span
                className="block text-6xl text-[var(--color-bone)] sm:text-8xl lg:text-9xl"
                style={{ fontFamily: "Signerica_Thin, cursive" }}
              >
                The
              </span>
              <span
                className="block text-6xl text-[var(--color-bone)] sm:text-8xl lg:text-9xl"
                style={{ fontFamily: "Signerica_Thin, cursive" }}
              >
                Kollective
              </span>
            </div>
            <div className="animate-fade-up delay-2 mt-8">
              <div className="accent-line w-24" />
            </div>
            <p className="animate-fade-up delay-3 mt-6 font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-neutral-600">
              Est. 2016 &mdash; New York City
            </p>
          </div>

          {/* Right — manifesto text */}
          <div className="flex flex-col justify-center">
            <p className="animate-fade-up delay-2 text-xl leading-[1.8] text-neutral-400 sm:text-2xl sm:leading-[1.8]">
              <Accent>The Kollective</Accent> is a global community of creative{" "}
              <Accent>artists</Accent>, with the intention of blogging about the
              unique fashion, music, and culture only found in{" "}
              <Accent>New York City</Accent>, to the rest of the{" "}
              <Accent>world</Accent>.
            </p>
            <p className="animate-fade-up delay-4 mt-8 text-xl leading-[1.8] text-neutral-400 sm:text-2xl sm:leading-[1.8]">
              We also throw <Accent>sick</Accent> parties in the NYC area.
            </p>
            <div className="animate-fade-up delay-5 mt-10 flex items-center gap-6">
              <a
                href="/contact"
                className="border border-[var(--color-accent)]/30 px-6 py-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[4px] text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
              >
                Get in touch
              </a>
              <a
                href="/artists"
                className="font-[var(--font-mono)] text-[10px] uppercase tracking-[4px] text-neutral-600 transition-colors hover:text-[var(--color-bone)]"
              >
                Meet the crew &rarr;
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
    <span className="text-[var(--color-bone)] font-medium">
      {children}
    </span>
  );
}
