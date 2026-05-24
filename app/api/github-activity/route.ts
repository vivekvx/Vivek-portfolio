import { NextResponse } from "next/server";

import { fetchGitHubSnapshot } from "@/lib/github";

export async function GET() {
  try {
    const snapshot = await fetchGitHubSnapshot();
    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "github_unavailable" }, { status: 503 });
  }
}
