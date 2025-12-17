import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidEmail } from "@/lib/validation";

export const runtime = "nodejs";

type TeamMember = {
  memberName: string;
  memberEmail: string;
  memberGithub?: string;
  country?: string;
};

type RegisterPayload = {
  teamName: string;
  walletAddress: string;
  members: TeamMember[];
};

export async function POST(req: Request) {
  try {
    let body: RegisterPayload;
    try {
      body = (await req.json()) as RegisterPayload;
    } catch (err) {
      console.error("[POST] JSON parse error:", err);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const teamName = typeof body.teamName === "string" ? body.teamName.trim() : "";
    const walletAddress = typeof body.walletAddress === "string" ? body.walletAddress.trim() : "";
    const members = Array.isArray(body.members) ? body.members : [];

    if (!teamName) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 },
      );
    }

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 },
      );
    }

    // Validate EVM wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid EVM wallet address format" },
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
        memberEmail: typeof m.memberEmail === "string" ? m.memberEmail.trim() : "",
        memberGithub: typeof m.memberGithub === "string" ? m.memberGithub.trim() : "",
        country: typeof m.country === "string" ? m.country.trim() : "",
      }))
      .filter((m) => m.memberName);

    if (validMembers.length === 0) {
      return NextResponse.json(
        { error: "At least one team member with a name is required" },
        { status: 400 },
      );
    }

    // Check if all members have an email
    const membersWithoutEmail = validMembers.filter((m) => !m.memberEmail);
    if (membersWithoutEmail.length > 0) {
      return NextResponse.json(
        { error: "Email is required for all team members" },
        { status: 400 },
      );
    }

    // Validate email format for all members
    const invalidEmails = validMembers.filter((m) => !isValidEmail(m.memberEmail));
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: "Please provide valid email addresses for all team members (e.g., user@example.com)" },
        { status: 400 },
      );
    }

    // Check if all members have a country
    const membersWithoutCountry = validMembers.filter((m) => !m.country);
    if (membersWithoutCountry.length > 0) {
      return NextResponse.json(
        { error: "Country is required for all team members" },
        { status: 400 },
      );
    }

    // Create team with members
    try {
      const team = await prisma.team.create({
        data: {
          teamName,
          walletAddress,
          members: {
            create: validMembers.map((m) => ({
              memberName: m.memberName,
              memberEmail: m.memberEmail,
              memberGithub: m.memberGithub || null,
              country: m.country || null,
            })),
          },
        },
        include: {
          members: true,
        },
      });

      return NextResponse.json({ ok: true, teamId: team.id });
    } catch (dbError) {
      // Check for unique constraint violation on memberEmail
      if (dbError && typeof dbError === "object" && "code" in dbError && dbError.code === "P2002") {
        return NextResponse.json(
          { error: "One or more email addresses are already registered with another team" },
          { status: 400 },
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error("[POST] Database error:", error);
    console.error("[POST] Error stack:", error instanceof Error ? error.stack : "N/A");
    return NextResponse.json(
      { error: "Failed to save registration. Please try again." },
      { status: 500 },
    );
  }
}


