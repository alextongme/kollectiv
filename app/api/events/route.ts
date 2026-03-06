import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({
    include: { artist: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(events);
}
