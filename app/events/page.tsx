import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    include: { artist: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-4 sm:px-8 sm:pt-24 sm:pb-8">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-[var(--color-accent)]">
          Upcoming
        </p>
        <h1 className="mt-3 font-[var(--font-serif)] text-4xl text-[var(--color-bone)] sm:text-6xl">
          Parties
        </h1>
        <div className="mt-8 accent-line" />
      </div>

      {/* Events */}
      <div className="flex flex-col">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="group relative flex min-h-[80vh] items-center justify-center overflow-hidden sm:min-h-[90vh]"
          >
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                alt={event.title || "Event"}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                sizes="100vw"
              />
            )}
            {/* Dark overlays */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Event number */}
            <span className="absolute right-5 top-6 text-[10px] tabular-nums tracking-[4px] text-white/20 sm:right-8 sm:top-8 sm:text-sm">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
              <div className="max-w-2xl">
                <div className="h-px w-12 bg-[var(--color-accent)]" />
                <h2 className="mt-6 font-[var(--font-serif)] text-4xl leading-[1.1] text-white sm:text-6xl md:text-7xl">
                  {event.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
                  {event.description}
                </p>

                {/* Guest list signup */}
                <div className="mt-10 max-w-md">
                  <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[4px] text-white/30">
                    Guest list
                  </p>
                  <div className="mt-3 flex">
                    <input
                      type="tel"
                      placeholder="your number"
                      className="flex-1 border border-white/10 border-r-0 bg-white/5 px-5 py-3.5 text-sm text-white outline-none backdrop-blur-sm transition-colors placeholder:text-white/30 focus:border-[var(--color-accent)]/50"
                    />
                    <button className="shrink-0 bg-[var(--color-accent)] px-6 py-3.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[3px] text-white transition-colors hover:bg-[var(--color-accent-hover)]">
                      join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[6px] text-neutral-700">
            No events yet. Stay tuned.
          </p>
        </div>
      )}
    </div>
  );
}
