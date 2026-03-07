"use client";

import { useState } from "react";

type Tab = "soundcloud" | "youtube";

export default function RadioPage() {
  const [tab, setTab] = useState<Tab>("soundcloud");

  return (
    <div className="min-h-[85vh]">
      {/* Hero */}
      <div className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)]">
              Live from NYC
            </span>
            <h1 className="mt-5 font-[var(--font-heading)] text-5xl font-bold leading-[1.1] text-white sm:text-7xl">
              The Kollective<br />Radio
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl">
              A radio show exploring the sounds, culture, and creative energy of
              New York City. Curated mixes, artist spotlights, and unreleased
              tracks.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://soundcloud.com/suimamusic/sets/the-kollective-all-volumes"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-accent)] px-6 py-3 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80"
              >
                SoundCloud
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLXRV0y9Yp4E1FHgH_QdGdC7xIxIdNZv4G"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--color-border)] px-6 py-3 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-muted)] transition-all hover:border-white/30 hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Player section */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        {/* Tab switcher */}
        <div className="mb-8 flex items-center gap-1 rounded-full bg-[var(--color-surface-raised)] p-1 w-fit border border-[var(--color-border)]">
          <button
            onClick={() => setTab("soundcloud")}
            className={`rounded-full px-5 py-2 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide transition-all ${
              tab === "soundcloud"
                ? "bg-[var(--color-accent)] text-[var(--color-surface)]"
                : "text-[var(--color-text-muted)] hover:text-white"
            }`}
          >
            SoundCloud
          </button>
          <button
            onClick={() => setTab("youtube")}
            className={`rounded-full px-5 py-2 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide transition-all ${
              tab === "youtube"
                ? "bg-[var(--color-accent)] text-[var(--color-surface)]"
                : "text-[var(--color-text-muted)] hover:text-white"
            }`}
          >
            YouTube
          </button>
        </div>

        {/* Embeds */}
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
          {tab === "soundcloud" ? (
            <iframe
              width="100%"
              height="500"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/suimamusic/sets/the-kollective-all-volumes&color=%23CDFF50&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
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
