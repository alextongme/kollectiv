"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, toggle } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", mobileOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

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
      {/* Fixed nav bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="group relative z-10" onClick={() => setMobileOpen(false)}>
            <span
              className="block text-3xl text-[var(--color-bone)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-4xl"
              style={{ fontFamily: "Signerica_Thin, cursive" }}
            >
              The Kollective
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 text-[10px] uppercase tracking-[3px] text-neutral-500 transition-colors duration-300 hover:text-[var(--color-bone)]"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}

            {session && (
              <Link
                href="/account"
                className="ml-2 border border-[var(--color-accent)]/30 px-3 py-1 text-[9px] uppercase tracking-[3px] text-[var(--color-accent)] transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
              >
                account
              </Link>
            )}

            {/* Divider */}
            <span className="mx-2 h-3 w-px bg-neutral-800" />

            {/* Social */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/alextongme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors duration-300 hover:text-[var(--color-accent)]"
                aria-label="GitHub"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://open.spotify.com/artist/4lBI0UKOxwdfOk4iORLmBP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors duration-300 hover:text-[var(--color-accent)]"
                aria-label="Spotify"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
              <button
                onClick={() => setShowPlayer((v) => !v)}
                className={`transition-colors duration-300 ${showPlayer ? "text-[var(--color-accent)]" : "text-neutral-600 hover:text-[var(--color-accent)]"}`}
                aria-label="SoundCloud"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </button>
            </div>

            <span className="mx-2 h-3 w-px bg-neutral-800" />

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-1.5 text-neutral-600 transition-colors duration-300 hover:text-[var(--color-accent)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            {/* Login/Logout */}
            <button
              onClick={() => session ? signOut() : setShowLogin(true)}
              className="text-[10px] uppercase tracking-[3px] text-neutral-600 transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              {session ? "logout" : "login"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-[var(--color-bone)] transition-all duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-[var(--color-bone)] transition-all duration-300 ${mobileOpen ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* SoundCloud player dropdown */}
        {showPlayer && (
          <div className="border-t border-white/5 bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/suimamusic&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=false&amp;color=%23e91e8c"
                className="block rounded"
              />
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[var(--color-surface)]">
          <div className="h-16" />
          <div className="flex flex-1 flex-col items-start justify-center px-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="animate-slide-right group py-3 text-4xl font-light tracking-tight text-[var(--color-bone)] transition-colors hover:text-[var(--color-accent)]"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span className="mr-3 text-sm text-neutral-700">0{i + 1}</span>
                {link.label}
              </Link>
            ))}

            {session && (
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="animate-slide-right mt-4 border border-[var(--color-accent)]/30 px-5 py-2 text-sm uppercase tracking-[4px] text-[var(--color-accent)]"
                style={{ animationDelay: `${navLinks.length * 0.06}s` }}
              >
                account
              </Link>
            )}

            <div className="animate-fade-in mt-12 flex items-center gap-4" style={{ animationDelay: "0.5s" }}>
              <a href="https://github.com/alextongme" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[var(--color-accent)]" aria-label="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://open.spotify.com/artist/4lBI0UKOxwdfOk4iORLmBP" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[var(--color-accent)]" aria-label="Spotify">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
              <button
                onClick={() => { setShowPlayer((v) => !v); setMobileOpen(false); }}
                className="text-neutral-600 hover:text-[var(--color-accent)]"
                aria-label="SoundCloud"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </button>
            </div>

            <div className="animate-fade-in mt-8 flex items-center gap-4" style={{ animationDelay: "0.6s" }}>
              <button
                onClick={toggle}
                className="text-[10px] uppercase tracking-[3px] text-neutral-600 hover:text-[var(--color-accent)]"
              >
                {theme === "dark" ? "light mode" : "dark mode"}
              </button>
              <span className="text-neutral-800">|</span>
              <button
                onClick={() => { session ? signOut() : setShowLogin(true); setMobileOpen(false); }}
                className="text-[10px] uppercase tracking-[3px] text-neutral-600 hover:text-[var(--color-accent)]"
              >
                {session ? "logout" : "login"}
              </button>
            </div>
          </div>

          {/* Bottom location tag */}
          <div className="animate-fade-in px-8 pb-10" style={{ animationDelay: "0.7s" }}>
            <p className="text-[9px] uppercase tracking-[6px] text-neutral-700">
              New York City
            </p>
          </div>
        </div>
      )}

      {/* Login overlay */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowLogin(false)}
          />
          <div className="relative w-full max-w-sm border border-white/5 bg-[var(--color-surface-raised)] p-10 shadow-2xl">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/50 to-transparent" />
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4 text-neutral-600 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="mb-8 text-[10px] uppercase tracking-[6px] text-neutral-500">
              sign in
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-b border-neutral-800 bg-transparent px-0 py-3 text-sm text-[var(--color-bone)] placeholder-neutral-700 outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b border-neutral-800 bg-transparent px-0 py-3 text-sm text-[var(--color-bone)] placeholder-neutral-700 outline-none transition-colors focus:border-[var(--color-accent)]"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 border border-[var(--color-accent)]/50 py-3 text-[10px] uppercase tracking-[4px] text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-50"
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
