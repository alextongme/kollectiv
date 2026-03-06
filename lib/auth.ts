import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const artist = await prisma.artist.findUnique({
          where: { username: credentials.username },
        });

        if (!artist) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          artist.password
        );
        if (!valid) return null;

        return {
          id: String(artist.id),
          name: artist.username,
          email: artist.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.artistId = Number(user.id);
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).artistId = token.artistId;
        (session.user as any).username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
