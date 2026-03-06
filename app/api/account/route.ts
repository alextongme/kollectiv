import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const artist = await prisma.artist.findUnique({
    where: { id: (session.user as any).artistId },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      bio: true,
      email: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  return NextResponse.json(artist);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const artist = await prisma.artist.update({
    where: { id: (session.user as any).artistId },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      bio: body.bio,
      email: body.email,
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json(artist);
}
