export default function AboutPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-24">
      <div className="max-w-3xl">
        <p className="text-3xl leading-relaxed sm:text-4xl">
          <Accent>The Kollective</Accent> is a global community of creative{" "}
          <Accent>artists</Accent>, with the intention of blogging about the
          unique fashion, music, and culture only found in{" "}
          <Accent>New York City</Accent>, to the rest of the{" "}
          <Accent>world</Accent>. We also throw <Accent>sick</Accent> parties
          in the NYC area.
        </p>
      </div>
    </div>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[var(--color-accent)] to-blue-600 bg-clip-text font-semibold text-transparent">
      {children}
    </span>
  );
}
