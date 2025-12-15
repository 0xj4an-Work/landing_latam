import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        teamName: true,
      },
    });

    return NextResponse.json(
      { teams },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 },
      );
    }

    // Be robust even if DB-level cascades are not in place yet.
    await prisma.$transaction([
      prisma.milestone.deleteMany({ where: { project: { teamId } } }),
      prisma.project.deleteMany({ where: { teamId } }),
      prisma.teamMember.deleteMany({ where: { teamId } }),
      prisma.team.delete({ where: { id: teamId } }),
    ]);

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 },
    );
  }
}
