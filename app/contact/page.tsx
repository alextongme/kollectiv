"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSent(true);
    form.reset();
  }

  return (
    <div className="min-h-[85vh]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — intro */}
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-[var(--color-accent)]">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-bone)] sm:text-5xl">
              Let&apos;s work.
            </h1>
            <div className="mt-8 accent-line w-16" />
            <p className="mt-8 text-lg leading-[1.8] text-neutral-500 sm:text-xl">
              If you are a producer,{" "}
              <span className="text-[var(--color-accent)]">unicorn rider</span>,
              musician, DJ, blogger, fashionista, party bringer, space traveler,
              silver surfer, or all of the above and would like to work with us,{" "}
              <span className="text-[var(--color-bone)]">send us a message</span>.
            </p>

            {/* Info blocks */}
            <div className="mt-12 space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[4px] text-neutral-700">
                  Location
                </p>
                <p className="mt-1 text-sm text-neutral-400">New York City</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[4px] text-neutral-700">
                  Social
                </p>
                <div className="mt-2 flex gap-4">
                  <a href="https://github.com/alextongme" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[3px] text-neutral-600 transition-colors hover:text-[var(--color-accent)]">
                    GitHub
                  </a>
                  <a href="https://open.spotify.com/artist/4lBI0UKOxwdfOk4iORLmBP" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[3px] text-neutral-600 transition-colors hover:text-[var(--color-accent)]">
                    Spotify
                  </a>
                  <a href="https://soundcloud.com/suimamusic" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[3px] text-neutral-600 transition-colors hover:text-[var(--color-accent)]">
                    SoundCloud
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col justify-center">
            {sent ? (
              <div className="border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-8 sm:p-10">
                <p className="text-[10px] uppercase tracking-[6px] text-[var(--color-accent)]">
                  Message sent
                </p>
                <p className="mt-3 text-lg text-[var(--color-bone)]">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[3px] text-neutral-700">
                      First name
                    </label>
                    <input
                      name="firstName"
                      required
                      className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-bone)] outline-none transition-colors placeholder:text-neutral-800 focus:border-[var(--color-accent)]/50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[3px] text-neutral-700">
                      Last name
                    </label>
                    <input
                      name="lastName"
                      required
                      className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-bone)] outline-none transition-colors placeholder:text-neutral-800 focus:border-[var(--color-accent)]/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[3px] text-neutral-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-bone)] outline-none transition-colors placeholder:text-neutral-800 focus:border-[var(--color-accent)]/50"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[3px] text-neutral-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full resize-y border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-bone)] outline-none transition-colors placeholder:text-neutral-800 focus:border-[var(--color-accent)]/50"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start border border-[var(--color-accent)]/30 px-8 py-3 text-[10px] uppercase tracking-[4px] text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
                >
                  send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
