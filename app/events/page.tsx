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
      <div className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          <span className="inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)]">
            Upcoming
          </span>
          <h1 className="mt-5 font-[var(--font-heading)] text-5xl font-bold text-white sm:text-7xl">
            Events
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Parties, shows, and gatherings across New York City.
          </p>
        </div>
      </div>

      {/* Events */}
      {events.length > 0 ? (
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-5 sm:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]"
              >
                {event.imageUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.title || "Event"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <h2 className="font-[var(--font-heading)] text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {event.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
                    {event.description}
                  </p>

                  {/* Guest list */}
                  <div className="mt-6">
                    <p className="font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                      Guest List
                    </p>
                    <div className="mt-2 flex">
                      <input
                        type="tel"
                        placeholder="Your number"
                        className="flex-1 rounded-l-full border border-[var(--color-border)] border-r-0 bg-[var(--color-surface)] px-5 py-3 text-sm text-white outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
                      />
                      <button className="shrink-0 rounded-r-full bg-[var(--color-accent)] px-6 py-3 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="font-[var(--font-heading)] text-lg font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
            No events yet. Stay tuned.
          </p>
        </div>
      )}
    </div>
  );
}
