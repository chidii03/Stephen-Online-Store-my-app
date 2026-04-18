import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  // This runs SERVER-SIDE — password never exposed to browser
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}