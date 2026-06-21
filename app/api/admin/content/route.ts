import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  DEFAULT_CONTENT,
  getContent,
  saveContent,
  type Content,
} from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }
  return NextResponse.json(await getContent());
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  let incoming: Partial<Content>;
  try {
    incoming = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Merge each section over defaults so a missing key never wipes the site.
  const merged: Content = {
    site: { ...DEFAULT_CONTENT.site, ...incoming.site },
    home: { ...DEFAULT_CONTENT.home, ...incoming.home },
    about: { ...DEFAULT_CONTENT.about, ...incoming.about },
    courses: { ...DEFAULT_CONTENT.courses, ...incoming.courses },
    insights: { ...DEFAULT_CONTENT.insights, ...incoming.insights },
    contact: { ...DEFAULT_CONTENT.contact, ...incoming.contact },
  };

  try {
    await saveContent(merged);
  } catch {
    return NextResponse.json(
      { error: "Could not write content. Is the filesystem writable?" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
