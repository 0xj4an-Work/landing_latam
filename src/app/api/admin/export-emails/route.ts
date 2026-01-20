import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  // Verify admin authentication
  const isAdmin = await verifyAdminSession(request);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all team members with their team information
    const teams = await prisma.team.findMany({
      include: {
        members: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Create CSV content
    const csvHeaders = [
      "Team Name",
      "Member Name",
      "Email",
      "GitHub",
      "Country",
      "Registration Date",
    ];

    const csvRows = teams.flatMap((team) =>
      team.members.map((member) => [
        team.teamName,
        member.memberName,
        member.memberEmail,
        member.memberGithub || "",
        member.country || "",
        new Date(team.createdAt).toISOString().split("T")[0],
      ])
    );

    // Build CSV string
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="buildathon-emails-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting emails:", error);
    return NextResponse.json(
      { error: "Failed to export emails" },
      { status: 500 }
    );
  }
}
