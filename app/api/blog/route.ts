import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    include: { artist: { select: { username: true, imageUrl: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      imageUrl: body.imageUrl,
      artistId: (session.user as any).artistId,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
