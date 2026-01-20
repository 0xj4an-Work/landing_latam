import Link from "next/link";
import LogoutButton from "../../components/admin/LogoutButton";

import { prisma } from "@/lib/prisma";
import { Container } from "@/components/section";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButtons";
import { CountryStats } from "@/components/admin/CountryStats";
import { ExportEmailsButton } from "@/components/admin/ExportEmailsButton";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MemberRow = {
  id: string;
  memberName: string;
  memberEmail: string;
  memberGithub: string | null;
  country: string | null;
};

type SubmissionRow = {
  id: string;
  karmaGapLink: string;
  trackOpenTrack: boolean;
  trackFarcasterMiniapp: boolean;
  trackSelf: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TeamWithRelations = {
  id: string;
  createdAt: Date;
  teamName: string;
  walletAddress: string;
  members: MemberRow[];
  submission: SubmissionRow | null;
};

const db = prisma as unknown as {
  team: {
    findMany: (args: unknown) => Promise<TeamWithRelations[]>;
  };
};

function formatDate(date: Date) {
  try {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

async function getTeams() {
  try {
    const teams = await db.team.findMany({
      include: {
        members: true,
        submission: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

function checkLatamCriteria(members: MemberRow[]): {
  meetsLatam: boolean;
  latamCount: number;
  totalCount: number;
  percentage: number;
} {
  const totalCount = members.length;
  const latamCount = members.filter(
    (m) => m.country && m.country !== "Non Latin America Country"
  ).length;
  const percentage = totalCount > 0 ? (latamCount / totalCount) * 100 : 0;
  const meetsLatam = percentage > 50;

  return { meetsLatam, latamCount, totalCount, percentage };
}

export default async function AdminPage() {
  const teams = await getTeams();

  // Get all members for country statistics
  const allMembers = teams.flatMap((team) => team.members);

  // Calculate stats
  const teamsWithSubmission = teams.filter((t) => t.submission !== null).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-black/5 bg-background dark:border-white/10">
        <Container className="flex h-16 items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <ExportEmailsButton />
            <LogoutButton />
            <Link
              href="/"
              className="text-sm text-black/70 hover:text-foreground dark:text-white/70"
            >
              ← Back to home
            </Link>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Registered Teams</h2>
            <div className="mt-2 flex gap-4 text-sm text-black/70 dark:text-white/70">
              <p>Total teams: {teams.length}</p>
              <p>•</p>
              <p>Submitted: {teamsWithSubmission}</p>
            </div>
          </div>

          {allMembers.length > 0 && (
            <div className="mb-6">
              <CountryStats members={allMembers} />
            </div>
          )}

          {teams.length === 0 ? (
            <div className="rounded-lg border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm text-black/60 dark:text-white/60">
                No teams registered yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {teams.map((team: TeamWithRelations) => {
                const latamStatus = checkLatamCriteria(team.members);
                return (
                  <div
                    key={team.id}
                    className="overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="border-b border-black/10 bg-black/[0.02] px-6 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">
                              {team.teamName}
                            </h3>
                            <span
                              className={[
                                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                                latamStatus.meetsLatam
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
                              ].join(" ")}
                            >
                              {latamStatus.meetsLatam ? "✓" : "⚠"}
                              {latamStatus.percentage.toFixed(0)}% LATAM
                            </span>
                            {team.submission && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                                ✓ Submitted
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                            Registered on{" "}
                            {new Date(team.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                            {" • "}
                            {latamStatus.latamCount} of {latamStatus.totalCount}{" "}
                            members from LATAM
                          </p>
                        </div>
                        <AdminDeleteButton
                          id={team.id}
                          label={team.teamName}
                          kind="team"
                        />
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-semibold">
                          Wallet Address
                        </h4>
                        <div className="rounded-md border border-black/10 bg-black/[0.02] p-3 font-mono text-sm dark:border-white/10 dark:bg-white/[0.02]">
                          {team.walletAddress}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-semibold">
                          Team Members ({team.members.length})
                        </h4>
                        <div className="space-y-2">
                          {team.members.map((member) => (
                            <div
                              key={member.id}
                              className="flex flex-col gap-1 text-sm"
                            >
                              <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                                <span>•</span>
                                <span className="font-medium">{member.memberName}</span>
                                {member.memberGithub && (
                                  <a
                                    href={`https://github.com/${member.memberGithub}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                  >
                                    @{member.memberGithub}
                                  </a>
                                )}
                                {member.country && (
                                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-black/70 dark:bg-white/10 dark:text-white/70">
                                    {member.country}
                                  </span>
                                )}
                              </div>
                              <div className="ml-4 text-xs text-black/60 dark:text-white/60">
                                {member.memberEmail}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {team.submission && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold">
                            Submission
                          </h4>
                          <div className="rounded-md border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-xs text-black/60 dark:text-white/60">
                                Submitted on {formatDate(team.submission.createdAt)}
                              </span>
                              {team.submission.updatedAt.getTime() !==
                                team.submission.createdAt.getTime() && (
                                <span className="text-xs text-black/60 dark:text-white/60">
                                  Updated {formatDate(team.submission.updatedAt)}
                                </span>
                              )}
                            </div>
                            <a
                              href={team.submission.karmaGapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {team.submission.karmaGapLink}
                            </a>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {team.submission.trackOpenTrack && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-300">
                                  Open Track
                                </span>
                              )}
                              {team.submission.trackFarcasterMiniapp && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                                  MiniApps (Farcaster/MiniPay)
                                </span>
                              )}
                              {team.submission.trackSelf && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-2.5 py-0.5 text-xs font-medium text-pink-700 dark:text-pink-300">
                                  Self.xyz
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
