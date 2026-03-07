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
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8 sm:pt-24 sm:pb-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-[var(--color-accent)]">
              The Crew
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-bone)] sm:text-6xl">
              Artists
            </h1>
          </div>
          <p className="hidden text-[10px] uppercase tracking-[4px] text-neutral-700 sm:block">
            {artists.length} members
          </p>
        </div>
        <div className="mt-8 accent-line" />
      </div>

      {/* Artist grid */}
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="group relative aspect-square cursor-pointer overflow-hidden bg-[var(--color-surface-raised)]"
            >
              {artist.imageUrl ? (
                <Image
                  src={artist.imageUrl}
                  alt={artist.username}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span
                    className="text-7xl text-neutral-800 transition-colors duration-500 group-hover:text-[var(--color-accent)] sm:text-8xl"
                    style={{ fontFamily: "Signerica_Thin, cursive" }}
                  >
                    {artist.username[0]?.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-6">
                <p className="text-lg font-bold text-white sm:text-xl">
                  {artist.username}
                </p>
                {(artist.firstName || artist.lastName) && (
                  <p className="mt-0.5 text-[10px] uppercase tracking-[3px] text-neutral-400">
                    {[artist.firstName, artist.lastName].filter(Boolean).join(" ")}
                  </p>
                )}
                {artist.bio && (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                    {artist.bio}
                  </p>
                )}
              </div>

              {/* Always-visible name on mobile */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 group-hover:opacity-0 transition-opacity sm:hidden">
                <p className="text-xs font-medium text-white">{artist.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {artists.length === 0 && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-[10px] uppercase tracking-[6px] text-neutral-700">
            No artists yet.
          </p>
        </div>
      )}
    </div>
  );
}
