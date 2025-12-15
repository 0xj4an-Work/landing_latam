import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Backwards-compatible endpoint name: "registrations" are Teams (+ members/projects).
    const registrations = await prisma.team.findMany({
      include: {
        members: true,
        projects: {
          include: {
            milestones: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}
