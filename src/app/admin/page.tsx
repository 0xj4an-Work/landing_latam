import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { Container } from "@/components/section";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButtons";
import { Prisma } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TeamWithRelations = Prisma.TeamGetPayload<{
  include: {
    members: true;
    projects: {
      include: {
        milestones: true;
      };
    };
  };
}>;

async function getTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: true,
        projects: {
          include: {
            milestones: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return teams as TeamWithRelations[];
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

export default async function AdminPage() {
  const teams = await getTeams();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-black/5 bg-background dark:border-white/10">
        <Container className="flex h-16 items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <Link
            href="/"
            className="text-sm text-black/70 hover:text-foreground dark:text-white/70"
          >
            ← Back to home
          </Link>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Registered Teams</h2>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Total teams: {teams.length}
            </p>
          </div>

          {teams.length === 0 ? (
            <div className="rounded-lg border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm text-black/60 dark:text-white/60">
                No teams registered yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {teams.map((team: TeamWithRelations) => (
                <div
                  key={team.id}
                  className="overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="border-b border-black/10 bg-black/[0.02] px-6 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{team.teamName}</h3>
                        <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                          Registered on {new Date(team.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <AdminDeleteButton id={team.id} label={team.teamName} kind="team" />
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-semibold">
                        Team Members ({team.members.length})
                      </h4>
                      <div className="space-y-1">
                        {team.members.map((member: TeamWithRelations["members"][number]) => (
                          <div
                            key={member.id}
                            className="flex items-center gap-2 text-sm text-black/80 dark:text-white/80"
                          >
                            <span>•</span>
                            <span>{member.memberName}</span>
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
                          </div>
                        ))}
                      </div>
                    </div>

                    {team.projects.length > 0 && (
                      <div>
                        <h4 className="mb-2 text-sm font-semibold">
                          Projects ({team.projects.length})
                        </h4>
                        <div className="space-y-2">
                          {team.projects.map((project: TeamWithRelations["projects"][number]) => (
                            <div
                              key={project.id}
                              className="rounded-md border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{project.projectName}</p>
                                  {project.githubRepo && (
                                    <a
                                      href={project.githubRepo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-1 text-xs text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                      {project.githubRepo}
                                    </a>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-black/60 dark:text-white/60">
                                    {project.milestones.length} milestone{project.milestones.length !== 1 ? "s" : ""}
                                  </span>
                                  <AdminDeleteButton
                                    id={project.id}
                                    label={project.projectName}
                                    kind="project"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
