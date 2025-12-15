import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type TeamMember = {
  memberName: string;
  memberGithub?: string;
};

type RegisterPayload = {
  teamName: string;
  members: TeamMember[];
};

export async function POST(req: Request) {
  let body: RegisterPayload;
  try {
    body = (await req.json()) as RegisterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const teamName = typeof body.teamName === "string" ? body.teamName.trim() : "";
  const members = Array.isArray(body.members) ? body.members : [];

  if (!teamName) {
    return NextResponse.json(
      { error: "Team name is required" },
      { status: 400 },
    );
  }

  if (members.length === 0) {
    return NextResponse.json(
      { error: "At least one team member is required" },
      { status: 400 },
    );
  }

  // Validate and clean member data
  const validMembers = members
    .map((m) => ({
      memberName: typeof m.memberName === "string" ? m.memberName.trim() : "",
      memberGithub: typeof m.memberGithub === "string" ? m.memberGithub.trim() : "",
    }))
    .filter((m) => m.memberName);

  if (validMembers.length === 0) {
    return NextResponse.json(
      { error: "At least one team member with a name is required" },
      { status: 400 },
    );
  }

  // Create team with members
  try {
    const team = await prisma.team.create({
      data: {
        teamName,
        members: {
          create: validMembers.map((m) => ({
            memberName: m.memberName,
            memberGithub: m.memberGithub || null,
          })),
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ ok: true, teamId: team.id });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save registration. Please try again." },
      { status: 500 },
    );
  }
}


