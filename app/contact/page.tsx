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
    <div className="flex justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <p className="text-xl leading-relaxed sm:text-2xl">
          If you are a producer,{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-blue-600 bg-clip-text font-semibold text-transparent">
            unicorn rider
          </span>
          , musician, DJ, blogger, fashionista, party bringer, space traveler,
          silver surfer, or all of the above and would like to work with us,{" "}
          <span className="bg-gradient-to-r from-[var(--color-accent)] to-blue-600 bg-clip-text font-semibold text-transparent">
            please
          </span>{" "}
          send us a message.
        </p>

        {sent ? (
          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-8 text-center text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
            Thanks for reaching out! We&apos;ll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                name="firstName"
                placeholder="first name"
                required
                className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-neutral-400"
              />
              <input
                name="lastName"
                placeholder="last name"
                required
                className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-neutral-400"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-neutral-400"
            />
            <textarea
              name="message"
              placeholder="message"
              required
              rows={6}
              className="resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-neutral-400"
            />
            <button
              type="submit"
              className="self-start rounded-full bg-neutral-900 px-8 py-3 text-sm tracking-widest text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent)] hover:shadow-lg dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-[var(--color-accent)] dark:hover:text-white"
            >
              submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
