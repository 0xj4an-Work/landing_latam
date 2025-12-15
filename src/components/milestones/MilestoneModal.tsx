"use client";

import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import type { MilestoneType } from "@/app/home-content";

interface Project {
  id: string;
  projectName: string;
  githubRepo?: string | null;
  teamId?: string;
}

interface Team {
  id: string;
  teamName: string;
}

interface MilestoneSubmission {
  contractAddress?: string;
  karmaGapLink?: string;
  farcasterLink?: string;
  slidesLink?: string;
  pitchDeckLink?: string;
}

type SubmissionApiItem = {
  milestoneType: string;
  contractAddress?: string | null;
  karmaGapLink?: string | null;
  farcasterLink?: string | null;
  slidesLink?: string | null;
  pitchDeckLink?: string | null;
};

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: {
    step: string;
    type: MilestoneType;
  };
}

export function MilestoneModal({
  isOpen,
  onClose,
  milestone,
}: MilestoneModalProps) {
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectSubmissions, setProjectSubmissions] = useState<Record<string, MilestoneSubmission>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    contractAddress: "",
    karmaGapLink: "",
    farcasterLink: "",
    slidesLink: "",
    pitchDeckLink: "",
  });

  // Registration milestone state
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [projectName, setProjectName] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/teams", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = (await response.json()) as { teams?: Team[] };
      setTeams(data.teams || []);
    } catch (err) {
      setError("Failed to load teams. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProjects = useCallback(async (teamId?: string) => {
    setIsLoading(true);
    setError("");
    try {
      const url = teamId
        ? `/api/projects?teamId=${encodeURIComponent(teamId)}`
        : "/api/projects";
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        let details = "";
        try {
          const json = (await response.json()) as { error?: string };
          if (json?.error) details = ` (${json.error})`;
        } catch {
          // ignore
        }
        throw new Error(`Failed to fetch projects: ${response.status}${details}`);
      }
      const data = (await response.json()) as { projects?: Project[] };
      setProjects(data.projects || []);
    } catch (err) {
      setError("Failed to load projects. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMilestoneData = useCallback(async (projectId: string) => {
    try {
      const response = await fetch(`/api/milestones?projectId=${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch milestone data");
      const data = (await response.json()) as { submissions?: SubmissionApiItem[] };

      const submissionMap: Record<string, MilestoneSubmission> = {};
      data.submissions?.forEach((sub) => {
        submissionMap[sub.milestoneType] = {
          contractAddress: sub.contractAddress || "",
          karmaGapLink: sub.karmaGapLink || "",
          farcasterLink: sub.farcasterLink || "",
          slidesLink: sub.slidesLink || "",
          pitchDeckLink: sub.pitchDeckLink || "",
        };
      });

      setProjectSubmissions(submissionMap);
    } catch (err) {
      console.error("Failed to fetch milestone data:", err);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // For ALL milestones, team selection is the first step.
      // - registration: select team, then create project
      // - others: select team, then select project and submit
      fetchTeams();
    }
  }, [isOpen, fetchTeams]);

  useEffect(() => {
    if (selectedProject) {
      fetchMilestoneData(selectedProject);
    }
  }, [selectedProject, fetchMilestoneData]);

  useEffect(() => {
    if (selectedTeam && milestone.type !== "registration") {
      setSelectedProject("");
      fetchProjects(selectedTeam);
    }
  }, [selectedTeam, milestone.type, fetchProjects]);

  const renderTeamSelector = () => (
    <div>
      <label className="mb-2 block text-sm font-medium">Select Your Team *</label>
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
        required
        disabled={isSubmitting}
      >
        <option value="">Select a team...</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.teamName}
          </option>
        ))}
      </select>
    </div>
  );

  const renderProjectSelector = () => (
    <div>
      <label className="mb-2 block text-sm font-medium">Select Project *</label>
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
        required
        disabled={isSubmitting || !selectedTeam}
      >
        <option value="">{selectedTeam ? "Select a project..." : "Select a team first..."}</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </div>
  );

  const renderNoTeamsNotice = () => (
    <div className="space-y-4">
      <p className="text-sm text-black/70 dark:text-white/70">
        You need to complete pre-registration first to create a team.
      </p>
      <Button
        type="button"
        onClick={() => {
          window.location.href = "#apply";
          onClose();
        }}
        className="w-full"
      >
        Go to Pre-Registration Form
      </Button>
    </div>
  );

  const renderNonRegistrationGate = (content: React.ReactNode) => {
    if (isLoading && teams.length === 0) {
      return <p className="text-sm text-black/70 dark:text-white/70">Loading teams...</p>;
    }
    if (teams.length === 0) return renderNoTeamsNotice();
    if (isLoading) {
      return <p className="text-sm text-black/70 dark:text-white/70">Loading projects...</p>;
    }
    return <>{content}</>;
  };

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingProject(true);
    setError("");

    try {
      // Create the project
      const projectResponse = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          githubRepo,
          teamId: selectedTeam,
        }),
      });

      if (!projectResponse.ok) {
        const data = (await projectResponse.json()) as { error?: string };
        throw new Error(data.error || "Failed to create project");
      }

      const projectData = (await projectResponse.json()) as { project: { id: string } };

      // Submit the REGISTRATION milestone
      const milestoneResponse = await fetch("/api/milestones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: projectData.project.id,
          milestoneType: "registration",
        }),
      });

      if (!milestoneResponse.ok) {
        throw new Error("Failed to submit registration milestone");
      }

      // Success - reset form and close modal
      setProjectName("");
      setGithubRepo("");
      setSelectedTeam("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project. Please try again.");
      console.error(err);
    } finally {
      setIsCreatingProject(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: selectedProject,
          milestoneType: milestone.type,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit milestone");
      }

      onClose();
      setFormData({
        contractAddress: "",
        karmaGapLink: "",
        farcasterLink: "",
        slidesLink: "",
        pitchDeckLink: "",
      });
      setSelectedProject("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (milestone.type) {
      case "registration":
        return (
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-black/70 dark:text-white/70">Loading teams...</p>
            ) : teams.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-black/70 dark:text-white/70">
                  You need to complete pre-registration first to create a team.
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    window.location.href = "#apply";
                    onClose();
                  }}
                  className="w-full"
                >
                  Go to Pre-Registration Form
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCreateProject}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Your Team *
                    </label>
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                      required
                      disabled={isCreatingProject}
                    >
                      <option value="">Select a team...</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.teamName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedTeam && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="My Awesome Project"
                          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                          required
                          disabled={isCreatingProject}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          GitHub Repository *
                        </label>
                        <input
                          type="url"
                          value={githubRepo}
                          onChange={(e) => setGithubRepo(e.target.value)}
                          placeholder="https://github.com/username/project"
                          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                          required
                          disabled={isCreatingProject}
                        />
                        <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                          Rule: GitHub repos should have no code before the buildathon start date (2026-01-19). Only README, LICENSE, and .gitignore files are allowed.
                        </p>
                      </div>

                      {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      )}

                      <Button type="submit" className="w-full" disabled={isCreatingProject}>
                        {isCreatingProject ? "Creating Project..." : "Create Project & Register"}
                      </Button>
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        );

      case "testnet":
        return (
          <div className="space-y-4">
            {renderNonRegistrationGate(
              <>
                {renderTeamSelector()}
                {renderProjectSelector()}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Testnet Contract Address
                  </label>
                  <input
                    type="text"
                    value={formData.contractAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, contractAddress: e.target.value })
                    }
                    placeholder="0x..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Testnet Deployment"}
                </Button>
              </>,
            )}
          </div>
        );

      case "karma-gap":
        return (
          <div className="space-y-4">
            {renderNonRegistrationGate(
              <>
                {renderTeamSelector()}
                {renderProjectSelector()}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Karma Gap Project Link
                  </label>
                  <input
                    type="url"
                    value={formData.karmaGapLink}
                    onChange={(e) =>
                      setFormData({ ...formData, karmaGapLink: e.target.value })
                    }
                    placeholder="https://gap.karmahq.xyz/..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Karma Gap Project"}
                </Button>
              </>,
            )}
          </div>
        );

      case "mainnet":
        return (
          <div className="space-y-4">
            {renderNonRegistrationGate(
              <>
                {renderTeamSelector()}
                {renderProjectSelector()}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mainnet Contract Address
                  </label>
                  <input
                    type="text"
                    value={formData.contractAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, contractAddress: e.target.value })
                    }
                    placeholder="0x..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Mainnet Deployment"}
                </Button>
              </>,
            )}
          </div>
        );

      case "farcaster":
        return (
          <div className="space-y-4">
            {renderNonRegistrationGate(
              <>
                {renderTeamSelector()}
                {renderProjectSelector()}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Farcaster Miniapp Link
                  </label>
                  <input
                    type="url"
                    value={formData.farcasterLink}
                    onChange={(e) =>
                      setFormData({ ...formData, farcasterLink: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-xs text-black/60 dark:text-white/60">
                  Optional milestone - only submit if applicable to your project
                </p>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Farcaster Integration"}
                </Button>
              </>,
            )}
          </div>
        );

      case "final-submission":
        return (
          <div className="space-y-4">
            {renderNonRegistrationGate(
              <>
                {renderTeamSelector()}
                {renderProjectSelector()}

                {selectedProject && projectSubmissions && (
                  <div className="rounded-lg border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                    <h4 className="text-sm font-semibold mb-2">Project Details</h4>
                    <div className="space-y-1 text-xs text-black/70 dark:text-white/70">
                      {projectSubmissions.TESTNET?.contractAddress && (
                        <p>
                          <strong>Testnet:</strong> {projectSubmissions.TESTNET.contractAddress}
                        </p>
                      )}
                      {projectSubmissions.MAINNET?.contractAddress && (
                        <p>
                          <strong>Mainnet:</strong> {projectSubmissions.MAINNET.contractAddress}
                        </p>
                      )}
                      {projectSubmissions.KARMA_GAP?.karmaGapLink && (
                        <p>
                          <strong>Karma Gap:</strong> {projectSubmissions.KARMA_GAP.karmaGapLink}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slides Link
                  </label>
                  <input
                    type="url"
                    value={formData.slidesLink}
                    onChange={(e) =>
                      setFormData({ ...formData, slidesLink: e.target.value })
                    }
                    placeholder="https://docs.google.com/presentation/..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pitch Deck Link
                  </label>
                  <input
                    type="url"
                    value={formData.pitchDeckLink}
                    onChange={(e) =>
                      setFormData({ ...formData, pitchDeckLink: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-black"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Final Project"}
                </Button>
              </>,
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-black/10 bg-background p-6 shadow-xl dark:border-white/10">
          <Dialog.Title className="text-lg font-semibold">
            {milestone.step}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-black/70 dark:text-white/70">
            Submit your progress for this milestone
          </Dialog.Description>

          <div className="mt-6">
            {milestone.type === "registration" ? (
              renderForm()
            ) : (
              <form onSubmit={handleSubmit}>{renderForm()}</form>
            )}
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-md p-2 text-black/50 hover:bg-black/5 hover:text-black dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
