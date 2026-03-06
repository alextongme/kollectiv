import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // TODO: integrate with an email service (Resend, SendGrid, etc.)
  console.log("Contact form submission:", body);

  return NextResponse.json({ ok: true });
}
