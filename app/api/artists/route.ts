import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const artists = await prisma.artist.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      bio: true,
    },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(artists);
}
