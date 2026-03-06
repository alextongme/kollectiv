import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    include: { artist: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col">
      {events.map((event) => (
        <div key={event.id} className="relative flex min-h-[85vh] items-center justify-center">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.title || "Event"}
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 to-black/40" />

          <div className="relative z-10 mx-auto w-full max-w-3xl px-6">
            <div className="rounded-3xl border border-white/10 bg-black/50 p-10 backdrop-blur-xl sm:p-16">
              <h2 className="text-4xl font-bold text-[var(--color-accent)] sm:text-6xl">
                {event.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80 sm:text-2xl">
                {event.description}
              </p>
              <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/50">
                Sign up for the guest list with your phone number below:
              </p>
              <div className="mt-4 flex max-w-md">
                <input
                  type="tel"
                  placeholder="your number"
                  className="flex-1 rounded-l-xl border-none bg-white/95 px-5 py-3.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
                <button className="rounded-r-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[var(--color-accent-hover)]">
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {events.length === 0 && (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-neutral-400">No events yet. Stay tuned.</p>
        </div>
      )}
    </div>
  );
}
