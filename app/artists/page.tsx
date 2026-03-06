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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="group flex cursor-pointer flex-col items-center transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 transition-all group-hover:border-[var(--color-accent)] group-hover:shadow-lg group-hover:shadow-pink-500/10 dark:border-neutral-800 dark:bg-neutral-800">
              {artist.imageUrl ? (
                <Image
                  src={artist.imageUrl}
                  alt={artist.username}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl text-neutral-300 dark:text-neutral-600">
                  {artist.username[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <p className="mt-3 text-sm tracking-wide text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
              {artist.username}
            </p>
            {(artist.firstName || artist.lastName) && (
              <p className="text-xs text-neutral-400">
                {[artist.firstName, artist.lastName].filter(Boolean).join(" ")}
              </p>
            )}
          </div>
        ))}
      </div>

      {artists.length === 0 && (
        <p className="py-20 text-center text-neutral-400">
          No artists yet.
        </p>
      )}
    </div>
  );
}
