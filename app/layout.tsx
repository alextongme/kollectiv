import type { Metadata } from "next";
import { Inconsolata, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "The Kollective — NYC Music & Culture",
  description:
    "A global community of creative artists blogging about fashion, music, and culture from New York City.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inconsolata.variable} ${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <body className="font-[var(--font-sans)]">
        <ThemeProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>

          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
