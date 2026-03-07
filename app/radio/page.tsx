"use client";

import { useState } from "react";

type Tab = "soundcloud" | "youtube";

export default function RadioPage() {
  const [tab, setTab] = useState<Tab>("soundcloud");

  return (
    <div className="min-h-[85vh]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* Background glow */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <p className="animate-fade-up text-[10px] uppercase tracking-[6px] text-[var(--color-accent)]">
                Live from NYC
              </p>
              <h1 className="animate-fade-up delay-1 mt-4">
                <span
                  className="block text-5xl text-[var(--color-bone)] sm:text-7xl"
                  style={{ fontFamily: "Signerica_Thin, cursive" }}
                >
                  the kollective
                </span>
              </h1>
              <div className="animate-fade-up delay-2 mt-4 accent-line w-16" />
              <p className="animate-fade-up delay-2 mt-6 text-base leading-relaxed text-neutral-500 sm:text-lg">
                A radio show exploring the sounds, culture, and creative energy of
                New York City. Curated mixes, artist spotlights, and unreleased
                tracks.
              </p>
              <div className="animate-fade-up delay-3 mt-8 flex items-center gap-3">
                <a
                  href="https://soundcloud.com/suimamusic/sets/the-kollective-all-volumes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-5 py-2.5 text-[10px] uppercase tracking-[3px] text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
                >
                  soundcloud
                </a>
                <a
                  href="https://www.youtube.com/playlist?list=PLXRV0y9Yp4E1FHgH_QdGdC7xIxIdNZv4G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 px-5 py-2.5 text-[10px] uppercase tracking-[3px] text-neutral-500 transition-all hover:border-white/20 hover:text-[var(--color-bone)]"
                >
                  youtube
                </a>
              </div>
            </div>

            {/* Right — decorative */}
            <div className="hidden items-center justify-center lg:flex">
              <div className="relative">
                <div className="h-64 w-64 rounded-full border border-white/5" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-8 rounded-full border border-[var(--color-accent)]/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_30px_var(--color-accent)]" />
                </div>
                {/* Rotating ring */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-t border-[var(--color-accent)]/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player section */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {/* Tab switcher */}
        <div className="mb-8 flex items-center gap-6">
          <button
            onClick={() => setTab("soundcloud")}
            className={`text-[10px] uppercase tracking-[4px] transition-colors duration-300 ${
              tab === "soundcloud"
                ? "text-[var(--color-accent)]"
                : "text-neutral-700 hover:text-neutral-400"
            }`}
          >
            soundcloud
          </button>
          <span className="h-3 w-px bg-neutral-800" />
          <button
            onClick={() => setTab("youtube")}
            className={`text-[10px] uppercase tracking-[4px] transition-colors duration-300 ${
              tab === "youtube"
                ? "text-[var(--color-accent)]"
                : "text-neutral-700 hover:text-neutral-400"
            }`}
          >
            youtube
          </button>
        </div>

        {/* Embeds */}
        <div className="overflow-hidden border border-white/5 bg-[var(--color-surface-raised)]">
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
