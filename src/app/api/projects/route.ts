import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamIdRaw = searchParams.get("teamId");
    // Treat missing/placeholder values as "no filter" to keep the UI resilient.
    const teamId =
      teamIdRaw &&
      teamIdRaw !== "undefined" &&
      teamIdRaw !== "null"
        ? teamIdRaw
        : null;

    const projects = await prisma.project.findMany({
      where: teamId ? { teamId } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { projects },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectName, githubRepo, teamId } = body;

    if (!projectName || !teamId) {
      return NextResponse.json(
        { error: "Project name and team ID are required" },
        { status: 400 },
      );
    }

    if (!githubRepo) {
      return NextResponse.json(
        { error: "GitHub repository is required" },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        githubRepo,
        teamId,
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 },
      );
    }

    // Be robust even if DB-level cascades are not in place yet.
    await prisma.$transaction([
      prisma.milestone.deleteMany({ where: { projectId } }),
      prisma.project.delete({ where: { id: projectId } }),
    ]);

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
