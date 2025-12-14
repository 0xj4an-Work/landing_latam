import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const registrations = await prisma.buildathonRegistration.findMany({
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
