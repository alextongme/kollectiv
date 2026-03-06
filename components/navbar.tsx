"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useTheme } from "./theme-provider";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, toggle } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    setShowLogin(false);
    setUsername("");
    setPassword("");
  }

  const navLinks = [
    { href: "/", label: "blog" },
    { href: "/about", label: "about" },
    { href: "/artists", label: "artists" },
    { href: "/events", label: "parties" },
    { href: "/radio", label: "radio" },
    { href: "/contact", label: "contact" },
  ];

  return (
    <>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        {/* Grain overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

        {/* Accent line at top */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="flex h-48 items-center justify-between">
            {/* Logo — left-aligned, large, dramatic */}
            <Link
              href="/"
              className="group relative"
            >
              <span
                className="block text-7xl text-neutral-900 transition-all duration-500 group-hover:text-[var(--color-accent)] dark:text-neutral-100 sm:text-8xl"
                style={{ fontFamily: "Signerica_Thin, cursive" }}
              >
                The Kollective
              </span>
              {/* Accent underslash */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-12 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Right side — stacked location + social */}
            <div className="hidden flex-col items-end gap-3 sm:flex">
              <span className="text-[10px] font-medium tracking-[8px] text-neutral-400 dark:text-neutral-500">
                NEW YORK CITY
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/alextongme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 transition-all duration-300 hover:text-[var(--color-accent)] dark:text-neutral-600 dark:hover:text-[var(--color-accent)]"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a
                  href="https://open.spotify.com/artist/4lBI0UKOxwdfOk4iORLmBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 transition-all duration-300 hover:text-[var(--color-accent)] dark:text-neutral-600 dark:hover:text-[var(--color-accent)]"
                  aria-label="Spotify"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                </a>
                <a
                  href="https://suimamusic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 transition-all duration-300 hover:text-[var(--color-accent)] dark:text-neutral-600 dark:hover:text-[var(--color-accent)]"
                  aria-label="Suima Music"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                </a>
                <span className="h-3 w-px bg-neutral-200 dark:bg-neutral-700" />
                <button
                  onClick={() => setShowPlayer((v) => !v)}
                  className="text-neutral-300 transition-all duration-300 hover:text-[var(--color-accent)] dark:text-neutral-600 dark:hover:text-[var(--color-accent)]"
                  aria-label="SoundCloud"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.055.045.094.104.094s.09-.038.104-.094l.21-1.319-.21-1.334c-.014-.055-.044-.094-.09-.094m1.83-1.229c-.06 0-.105.044-.12.104l-.21 2.563.225 2.458c.009.06.06.104.12.104.051 0 .104-.044.12-.104l.254-2.474-.254-2.548c-.016-.06-.066-.104-.12-.104m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.135.149.135.075 0 .135-.06.15-.135l.24-2.529-.24-2.64c-.015-.09-.075-.15-.15-.15m1.065.44c-.09 0-.15.075-.165.165l-.195 2.17.195 2.49c.015.09.075.164.165.164.089 0 .149-.074.164-.164l.225-2.49-.225-2.17c-.015-.09-.074-.164-.164-.164m1.035-.404c-.104 0-.176.086-.193.18l-.164 2.573.18 2.489c.015.104.09.18.18.18.104 0 .18-.076.194-.18l.209-2.489-.209-2.573c-.015-.104-.09-.18-.194-.18m1.065-.584c-.118 0-.194.09-.21.195l-.165 3.173.165 2.459c.016.12.09.209.21.209.104 0 .194-.09.21-.209l.193-2.459-.21-3.173c-.016-.12-.09-.195-.21-.195m1.049-.45c-.12 0-.209.105-.225.225l-.15 3.608.15 2.414c.016.12.105.225.225.225.119 0 .21-.105.225-.225l.18-2.414-.164-3.608c-.016-.12-.105-.225-.226-.225m1.125-.449c-.135 0-.24.105-.24.24l-.15 4.05.15 2.4c.016.135.105.24.24.24s.225-.105.24-.24l.165-2.4-.165-4.05c-.015-.135-.105-.24-.24-.24m1.065-.39c-.149 0-.255.12-.27.27l-.12 4.41.135 2.384c.015.15.12.27.27.27.135 0 .255-.12.255-.27l.15-2.384-.15-4.41c-.015-.15-.12-.27-.27-.27m1.17-.135c-.165 0-.284.135-.3.3l-.106 4.5.12 2.37c.015.149.135.285.3.285.149 0 .27-.12.284-.285l.135-2.37-.135-4.5c-.014-.164-.135-.3-.3-.3m1.065.135c-.165 0-.3.135-.314.3l-.09 4.364.104 2.37c.015.164.15.3.3.3.165 0 .285-.135.3-.3l.12-2.37-.12-4.364c-.015-.165-.135-.3-.3-.3m1.155-.27c-.18 0-.33.15-.33.33l-.09 4.635.104 2.34c.016.18.15.33.33.33.165 0 .315-.15.315-.33l.12-2.34-.12-4.635c-.015-.18-.15-.33-.33-.33m1.064.39c-.18 0-.33.15-.345.33l-.06 4.245.075 2.325c.015.18.165.33.345.33.18 0 .33-.15.33-.33l.09-2.325-.09-4.245c-.015-.18-.15-.33-.345-.33m1.186-.615c-.045-.015-.09-.015-.135-.015-.195 0-.36.165-.375.36l-.06 4.875.075 2.325c0 .195.165.36.36.36.18 0 .345-.165.36-.36l.09-2.325-.09-4.875c-.015-.21-.165-.36-.375-.36m1.064.585c-.21 0-.375.165-.39.375l-.06 4.29.075 2.295c.015.21.18.375.39.375.195 0 .375-.165.375-.375l.09-2.295-.09-4.29c-.015-.21-.18-.375-.39-.375m1.186-.42c-.21 0-.39.18-.405.39l-.044 4.695.06 2.28c.015.21.195.39.405.39.195 0 .375-.18.39-.39l.075-2.28-.075-4.695c-.015-.21-.195-.39-.405-.39m1.351-1.59c-.12-.045-.255-.075-.39-.075-.21 0-.405.045-.585.135-.165.09-.315.225-.39.39-.06.12-.075.24-.09.375l-.034 5.34.06 2.265c0 .27.225.48.48.48.255 0 .465-.21.48-.48l.075-2.265-.075-5.34c0-.12-.015-.21-.06-.3-.06-.135-.165-.255-.3-.33l-.001-.001m1.141 1.11c-.3 0-.539.24-.539.54v5.16l.06 2.25c0 .3.24.54.54.54.285 0 .525-.24.525-.54l.076-2.25-.076-5.16c-.015-.3-.24-.54-.54-.54m1.125-.03c-.3 0-.54.255-.54.555l-.03 5.19.045 2.22c.015.3.255.54.54.54.3 0 .54-.24.555-.54l.06-2.22-.06-5.19c-.015-.3-.255-.555-.555-.555m2.176.93c-.135-.6-.63-1.05-1.245-1.05-.18 0-.345.04-.51.105-.21.09-.36.255-.45.42-.09.12-.12.285-.12.435l-.001.001v5.34c.016.3.255.525.555.54h4.32c1.11 0 2.01-.9 2.01-2.01 0-1.095-.9-2.01-2.01-2.01-.36 0-.69.105-.976.285"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="nav-bar sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/95">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
          {/* Nav links */}
          <div className="flex items-center">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link group relative px-4 py-3 text-[11px] uppercase tracking-[3px] text-neutral-400 transition-all duration-300 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            {session && (
              <Link
                href="/account"
                className="ml-3 border border-[var(--color-accent)] px-4 py-1 text-[10px] uppercase tracking-[3px] text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white"
              >
                account
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile social icons */}
            <div className="flex items-center gap-2 sm:hidden">
              <a href="https://github.com/alextongme" target="_blank" rel="noopener noreferrer" className="text-neutral-300 transition-colors hover:text-[var(--color-accent)] dark:text-neutral-600" aria-label="GitHub">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <button onClick={() => setShowPlayer((v) => !v)} className="text-neutral-300 transition-colors hover:text-[var(--color-accent)] dark:text-neutral-600" aria-label="SoundCloud">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.055.045.094.104.094s.09-.038.104-.094l.21-1.319-.21-1.334c-.014-.055-.044-.094-.09-.094m1.83-1.229c-.06 0-.105.044-.12.104l-.21 2.563.225 2.458c.009.06.06.104.12.104.051 0 .104-.044.12-.104l.254-2.474-.254-2.548c-.016-.06-.066-.104-.12-.104m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.135.149.135.075 0 .135-.06.15-.135l.24-2.529-.24-2.64c-.015-.09-.075-.15-.15-.15m1.065.44c-.09 0-.15.075-.165.165l-.195 2.17.195 2.49c.015.09.075.164.165.164.089 0 .149-.074.164-.164l.225-2.49-.225-2.17c-.015-.09-.074-.164-.164-.164m1.035-.404c-.104 0-.176.086-.193.18l-.164 2.573.18 2.489c.015.104.09.18.18.18.104 0 .18-.076.194-.18l.209-2.489-.209-2.573c-.015-.104-.09-.18-.194-.18m1.065-.584c-.118 0-.194.09-.21.195l-.165 3.173.165 2.459c.016.12.09.209.21.209.104 0 .194-.09.21-.209l.193-2.459-.21-3.173c-.016-.12-.09-.195-.21-.195m1.049-.45c-.12 0-.209.105-.225.225l-.15 3.608.15 2.414c.016.12.105.225.225.225.119 0 .21-.105.225-.225l.18-2.414-.164-3.608c-.016-.12-.105-.225-.226-.225m1.125-.449c-.135 0-.24.105-.24.24l-.15 4.05.15 2.4c.016.135.105.24.24.24s.225-.105.24-.24l.165-2.4-.165-4.05c-.015-.135-.105-.24-.24-.24m1.065-.39c-.149 0-.255.12-.27.27l-.12 4.41.135 2.384c.015.15.12.27.27.27.135 0 .255-.12.255-.27l.15-2.384-.15-4.41c-.015-.15-.12-.27-.27-.27m1.17-.135c-.165 0-.284.135-.3.3l-.106 4.5.12 2.37c.015.149.135.285.3.285.149 0 .27-.12.284-.285l.135-2.37-.135-4.5c-.014-.164-.135-.3-.3-.3m1.065.135c-.165 0-.3.135-.314.3l-.09 4.364.104 2.37c.015.164.15.3.3.3.165 0 .285-.135.3-.3l.12-2.37-.12-4.364c-.015-.165-.135-.3-.3-.3m1.155-.27c-.18 0-.33.15-.33.33l-.09 4.635.104 2.34c.016.18.15.33.33.33.165 0 .315-.15.315-.33l.12-2.34-.12-4.635c-.015-.18-.15-.33-.33-.33m1.064.39c-.18 0-.33.15-.345.33l-.06 4.245.075 2.325c.015.18.165.33.345.33.18 0 .33-.15.33-.33l.09-2.325-.09-4.245c-.015-.18-.15-.33-.345-.33m1.186-.615c-.045-.015-.09-.015-.135-.015-.195 0-.36.165-.375.36l-.06 4.875.075 2.325c0 .195.165.36.36.36.18 0 .345-.165.36-.36l.09-2.325-.09-4.875c-.015-.21-.165-.36-.375-.36m1.064.585c-.21 0-.375.165-.39.375l-.06 4.29.075 2.295c.015.21.18.375.39.375.195 0 .375-.165.375-.375l.09-2.295-.09-4.29c-.015-.21-.18-.375-.39-.375m1.186-.42c-.21 0-.39.18-.405.39l-.044 4.695.06 2.28c.015.21.195.39.405.39.195 0 .375-.18.39-.39l.075-2.28-.075-4.695c-.015-.21-.195-.39-.405-.39m1.351-1.59c-.12-.045-.255-.075-.39-.075-.21 0-.405.045-.585.135-.165.09-.315.225-.39.39-.06.12-.075.24-.09.375l-.034 5.34.06 2.265c0 .27.225.48.48.48.255 0 .465-.21.48-.48l.075-2.265-.075-5.34c0-.12-.015-.21-.06-.3-.06-.135-.165-.255-.3-.33l-.001-.001m1.141 1.11c-.3 0-.539.24-.539.54v5.16l.06 2.25c0 .3.24.54.54.54.285 0 .525-.24.525-.54l.076-2.25-.076-5.16c-.015-.3-.24-.54-.54-.54m1.125-.03c-.3 0-.54.255-.54.555l-.03 5.19.045 2.22c.015.3.255.54.54.54.3 0 .54-.24.555-.54l.06-2.22-.06-5.19c-.015-.3-.255-.555-.555-.555m2.176.93c-.135-.6-.63-1.05-1.245-1.05-.18 0-.345.04-.51.105-.21.09-.36.255-.45.42-.09.12-.12.285-.12.435l-.001.001v5.34c.016.3.255.525.555.54h4.32c1.11 0 2.01-.9 2.01-2.01 0-1.095-.9-2.01-2.01-2.01-.36 0-.69.105-.976.285"/></svg>
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="rounded-full p-2 text-neutral-300 transition-all duration-300 hover:text-[var(--color-accent)] dark:text-neutral-600 dark:hover:text-[var(--color-accent)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            <span className="h-3 w-px bg-neutral-200 dark:bg-neutral-700" />

            <button
              onClick={() =>
                session ? signOut() : setShowLogin((v) => !v)
              }
              className="text-[11px] uppercase tracking-[3px] text-neutral-400 transition-all duration-300 hover:text-[var(--color-accent)] dark:text-neutral-500 dark:hover:text-[var(--color-accent)]"
            >
              {session ? "logout" : "login"}
            </button>
          </div>
        </div>

        {/* SoundCloud player */}
        {showPlayer && (
          <div className="border-t border-neutral-100 dark:border-neutral-800">
            <div className="mx-auto max-w-6xl px-6 py-3">
              <iframe
                width="100%"
                height="350"
                scrolling="yes"
                frameBorder="no"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/suimamusic&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
              />
            </div>
          </div>
        )}
      </nav>

      {/* Login overlay */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowLogin(false)}
          />
          <div className="relative w-full max-w-sm border border-neutral-800 bg-neutral-950 p-10 shadow-2xl shadow-black/50">
            {/* Accent line */}
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4 text-neutral-600 transition-colors hover:text-white"
            >
              ✕
            </button>
            <h2 className="mb-8 text-[11px] uppercase tracking-[6px] text-neutral-400">
              sign in
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-b border-neutral-800 bg-transparent px-0 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b border-neutral-800 bg-transparent px-0 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 border border-[var(--color-accent)] py-3 text-[11px] uppercase tracking-[4px] text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-50"
              >
                {loading ? "..." : "enter"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
