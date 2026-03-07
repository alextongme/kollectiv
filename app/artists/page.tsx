import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      bio: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-[85vh]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)]">
                The Crew
              </span>
              <h1 className="mt-5 font-[var(--font-heading)] text-5xl font-bold text-white sm:text-7xl">
                Artists
              </h1>
            </div>
            <p className="hidden font-[var(--font-heading)] text-[14px] font-bold uppercase tracking-wide text-[var(--color-text-faint)] sm:block">
              {artists.length} members
            </p>
          </div>
        </div>
      </div>

      {/* Artist grid */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]"
            >
              {artist.imageUrl ? (
                <Image
                  src={artist.imageUrl}
                  alt={artist.username}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.4]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-[var(--font-heading)] text-6xl font-bold text-[var(--color-text-faint)] transition-colors group-hover:text-[var(--color-accent)] sm:text-7xl">
                    {artist.username[0]?.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="force-white absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                <p className="font-[var(--font-heading)] text-lg font-bold text-white">
                  {artist.username}
                </p>
                {(artist.firstName || artist.lastName) && (
                  <p className="mt-1 text-[13px] text-white/60">
                    {[artist.firstName, artist.lastName].filter(Boolean).join(" ")}
                  </p>
                )}
                {artist.bio && (
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/50">
                    {artist.bio}
                  </p>
                )}
              </div>

              {/* Always-visible name on mobile */}
              <div className="force-white absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity group-hover:opacity-0 sm:hidden">
                <p className="font-[var(--font-heading)] text-[13px] font-bold text-white">{artist.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {artists.length === 0 && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="font-[var(--font-heading)] text-lg font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
            No artists yet.
          </p>
        </div>
      )}
    </div>
  );
}
