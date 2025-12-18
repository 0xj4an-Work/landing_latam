import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type SubmitPayload = {
  teamId: string;
  karmaGapLink: string;
  trackOpenTrack: boolean;
  trackFarcasterMiniapp: boolean;
  trackSelf: boolean;
};

export async function POST(req: Request) {
  try {
    let body: SubmitPayload;
    try {
      body = (await req.json()) as SubmitPayload;
    } catch (err) {
      console.error("[SUBMIT] JSON parse error:", err);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const teamId = typeof body.teamId === "string" ? body.teamId.trim() : "";
    const karmaGapLink = typeof body.karmaGapLink === "string" ? body.karmaGapLink.trim() : "";
    const trackOpenTrack = typeof body.trackOpenTrack === "boolean" ? body.trackOpenTrack : false;
    const trackFarcasterMiniapp = typeof body.trackFarcasterMiniapp === "boolean" ? body.trackFarcasterMiniapp : false;
    const trackSelf = typeof body.trackSelf === "boolean" ? body.trackSelf : false;

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 },
      );
    }

    if (!karmaGapLink) {
      return NextResponse.json(
        { error: "Karma Gap link is required" },
        { status: 400 },
      );
    }

    // Validate at least one track is selected
    if (!trackOpenTrack && !trackFarcasterMiniapp && !trackSelf) {
      return NextResponse.json(
        { error: "Please select at least one track for your project" },
        { status: 400 },
      );
    }

    // Validate URL format
    try {
      new URL(karmaGapLink);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }

    // Check if team exists
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 },
      );
    }

    // Create or update submission
    const submission = await prisma.submission.upsert({
      where: { teamId },
      create: {
        teamId,
        karmaGapLink,
        trackOpenTrack,
        trackFarcasterMiniapp,
        trackSelf,
      },
      update: {
        karmaGapLink,
        trackOpenTrack,
        trackFarcasterMiniapp,
        trackSelf,
      },
    });

    return NextResponse.json({ ok: true, submissionId: submission.id });
  } catch (error) {
    console.error("[SUBMIT] Database error:", error);
    console.error("[SUBMIT] Error stack:", error instanceof Error ? error.stack : "N/A");
    return NextResponse.json(
      { error: "Failed to save submission. Please try again." },
      { status: 500 },
    );
  }
}
