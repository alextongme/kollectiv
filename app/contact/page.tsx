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
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div>
            <span className="inline-block rounded-full bg-[var(--color-accent)] px-3 py-1 font-[var(--font-heading)] text-[12px] font-bold uppercase tracking-wide text-[var(--color-surface)]">
              Contact
            </span>
            <h1 className="mt-5 font-[var(--font-heading)] text-4xl font-bold text-white sm:text-6xl">
              Let&apos;s work.
            </h1>
            <p className="mt-6 text-lg leading-[1.8] text-[var(--color-text-muted)] sm:text-xl">
              If you are a producer,{" "}
              <span className="text-[var(--color-accent)]">unicorn rider</span>,
              musician, DJ, blogger, fashionista, party bringer, space traveler,
              silver surfer, or all of the above and would like to work with us,{" "}
              <span className="text-white">send us a message</span>.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                  Location
                </p>
                <p className="mt-1 text-[15px] text-[var(--color-text-muted)]">New York City</p>
              </div>
              <div>
                <p className="font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                  Social
                </p>
                <div className="mt-2 flex gap-4">
                  <a href="https://github.com/alextongme" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">
                    GitHub
                  </a>
                  <a href="https://open.spotify.com/artist/4lBI0UKOxwdfOk4iORLmBP" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">
                    Spotify
                  </a>
                  <a href="https://soundcloud.com/suimamusic" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">
                    SoundCloud
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col justify-center">
            {sent ? (
              <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-8 sm:p-10">
                <p className="font-[var(--font-heading)] text-lg font-bold uppercase tracking-wide text-[var(--color-accent)]">
                  Message Sent
                </p>
                <p className="mt-3 text-lg text-white">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      required
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      required
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-faint)]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)]"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start rounded-full bg-[var(--color-accent)] px-8 py-3 font-[var(--font-heading)] text-[13px] font-bold uppercase tracking-wide text-[var(--color-surface)] transition-opacity hover:opacity-80"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
