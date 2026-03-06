"use client";

import { useState } from "react";

type Tab = "soundcloud" | "youtube";

export default function RadioPage() {
  const [tab, setTab] = useState<Tab>("soundcloud");

  return (
    <div className="min-h-[80vh] bg-neutral-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-blue-600/10" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[6px] text-neutral-500">
            live from nyc
          </p>
          <h1
            className="mt-4 text-5xl sm:text-7xl"
            style={{ fontFamily: "Signerica_Thin, cursive" }}
          >
            the kollective
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-neutral-400">
            A radio show exploring the sounds, culture, and creative energy of
            New York City. Curated mixes, artist spotlights, and unreleased
            tracks.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://soundcloud.com/suimamusic/sets/the-kollective-all-volumes"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-2.5 text-sm tracking-wide text-neutral-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              soundcloud
            </a>
            <a
              href="https://www.youtube.com/playlist?list=PLXRV0y9Yp4E1FHgH_QdGdC7xIxIdNZv4G"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-2.5 text-sm tracking-wide text-white transition-all hover:-translate-y-0.5 hover:border-white/40"
            >
              youtube
            </a>
          </div>
        </div>
      </div>

      {/* Player section */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Tab switcher */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => setTab("soundcloud")}
            className={`text-xs uppercase tracking-[4px] transition-colors ${
              tab === "soundcloud"
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-400"
            }`}
          >
            soundcloud
          </button>
          <span className="text-neutral-700">|</span>
          <button
            onClick={() => setTab("youtube")}
            className={`text-xs uppercase tracking-[4px] transition-colors ${
              tab === "youtube"
                ? "text-white"
                : "text-neutral-600 hover:text-neutral-400"
            }`}
          >
            youtube
          </button>
        </div>

        {/* Embeds */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {tab === "soundcloud" ? (
            <iframe
              width="100%"
              height="500"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/suimamusic/sets/the-kollective-all-volumes&color=%23e91e8c&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              className="block"
            />
          ) : (
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/videoseries?list=PLXRV0y9Yp4E1FHgH_QdGdC7xIxIdNZv4G"
              title="the kollective — youtube"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="block"
            />
          )}
        </div>
      </div>
    </div>
  );
}
