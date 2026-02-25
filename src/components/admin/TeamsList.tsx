"use client";

import { useState, useMemo } from "react";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButtons";

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
  trackV0: boolean;
  createdAt: string;
  updatedAt: string;
};

type TeamWithRelations = {
  id: string;
  createdAt: string;
  teamName: string;
  walletAddress: string;
  members: MemberRow[];
  submission: SubmissionRow | null;
};

type SubmissionFilter = "all" | "submitted" | "not_submitted";

function formatDate(date: string) {
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

export function TeamsList({ teams }: { teams: TeamWithRelations[] }) {
  const [submissionFilter, setSubmissionFilter] = useState<SubmissionFilter>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  // Get unique countries from all team members
  const countries = useMemo(() => {
    const countrySet = new Set<string>();
    teams.forEach((team) => {
      team.members.forEach((member) => {
        if (member.country) {
          countrySet.add(member.country);
        }
      });
    });
    return Array.from(countrySet).sort();
  }, [teams]);

  // Count teams by country (team has at least one member from that country)
  const countryTeamCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    countries.forEach((country) => {
      counts[country] = teams.filter((team) =>
        team.members.some((m) => m.country === country)
      ).length;
    });
    return counts;
  }, [teams, countries]);

  const submittedCount = teams.filter((t) => t.submission !== null).length;
  const notSubmittedCount = teams.filter((t) => t.submission === null).length;

  const filteredTeams = teams.filter((team) => {
    // Submission filter
    if (submissionFilter === "submitted" && team.submission === null) return false;
    if (submissionFilter === "not_submitted" && team.submission !== null) return false;

    // Country filter (team has at least one member from selected country)
    if (countryFilter !== "all") {
      const hasCountryMember = team.members.some((m) => m.country === countryFilter);
      if (!hasCountryMember) return false;
    }

    return true;
  });

  return (
    <>
      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        {/* Submission Status Filter */}
        <div>
          <div className="text-sm font-medium text-black/60 dark:text-white/60 mb-3">
            Filter by submission status
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSubmissionFilter("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                submissionFilter === "all"
                  ? "bg-foreground text-background"
                  : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
              }`}
            >
              All ({teams.length})
            </button>
            <button
              onClick={() => setSubmissionFilter("submitted")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                submissionFilter === "submitted"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 dark:text-blue-300"
              }`}
            >
              Submitted ({submittedCount})
            </button>
            <button
              onClick={() => setSubmissionFilter("not_submitted")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                submissionFilter === "not_submitted"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
              }`}
            >
              Not Submitted ({notSubmittedCount})
            </button>
          </div>
        </div>

        {/* Country Filter */}
        <div>
          <div className="text-sm font-medium text-black/60 dark:text-white/60 mb-3">
            Filter by country
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCountryFilter("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                countryFilter === "all"
                  ? "bg-foreground text-background"
                  : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
              }`}
            >
              All Countries
            </button>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setCountryFilter(country)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  countryFilter === country
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300"
                }`}
              >
                {country} ({countryTeamCounts[country]})
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {(submissionFilter !== "all" || countryFilter !== "all") && (
          <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
            <span>Showing {filteredTeams.length} teams</span>
            <button
              onClick={() => {
                setSubmissionFilter("all");
                setCountryFilter("all");
              }}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {filteredTeams.length === 0 ? (
        <div className="rounded-lg border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-sm text-black/60 dark:text-white/60">
            {submissionFilter === "all"
              ? "No teams registered yet"
              : submissionFilter === "submitted"
              ? "No teams have submitted yet"
              : "All teams have submitted"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTeams.map((team) => {
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
                        {team.submission ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                            ✓ Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                            ⏳ Not submitted
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                        Registered on{" "}
                        {new Date(team.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
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
                            <span className="font-medium">
                              {member.memberName}
                            </span>
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
                      <h4 className="mb-2 text-sm font-semibold">Submission</h4>
                      <div className="rounded-md border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs text-black/60 dark:text-white/60">
                            Submitted on {formatDate(team.submission.createdAt)}
                          </span>
                          {team.submission.updatedAt !==
                            team.submission.createdAt && (
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
                              Human.Tech
                            </span>
                          )}
                          {team.submission.trackV0 && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                              v0
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
    </>
  );
}
