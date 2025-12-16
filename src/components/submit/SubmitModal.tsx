"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Status = "idle" | "loading" | "success" | "error";

type Team = {
  id: string;
  teamName: string;
};

export default function SubmitModal({
  open,
  onOpenChange,
}: SubmitModalProps) {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = React.useState(false);
  const [selectedTeamId, setSelectedTeamId] = React.useState("");
  const [karmaGapLink, setKarmaGapLink] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const canSubmit = selectedTeamId && karmaGapLink.trim().length > 0;

  // Fetch teams when modal opens
  React.useEffect(() => {
    if (open) {
      setLoadingTeams(true);
      fetch("/api/buildathon/teams")
        .then(async (res) => {
          if (!res.ok) return null;
          return (await res.json()) as { teams?: Team[] };
        })
        .then((data) => {
          setTeams(data?.teams || []);
        })
        .catch((err) => {
          console.error("Failed to fetch teams:", err);
          setTeams([]);
        })
        .finally(() => {
          setLoadingTeams(false);
        });
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      if (!selectedTeamId) {
        setStatus("error");
        setErrorMessage("Please select a team.");
        return;
      }

      if (!karmaGapLink.trim()) {
        setStatus("error");
        setErrorMessage("Karma Gap link is required.");
        return;
      }

      // Basic URL validation
      try {
        new URL(karmaGapLink);
      } catch {
        setStatus("error");
        setErrorMessage("Please enter a valid URL.");
        return;
      }

      const res = await fetch("/api/buildathon/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: selectedTeamId,
          karmaGapLink: karmaGapLink.trim(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setSelectedTeamId("");
        setKarmaGapLink("");
        onOpenChange(false);
        // Show success message
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        setStatus("error");
        try {
          const json = (await res.json()) as { error?: string };
          setErrorMessage(json?.error || "Error submitting. Please try again.");
        } catch {
          setErrorMessage("Error submitting. Please try again.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Project</DialogTitle>
          <DialogDescription>
            Submit your Karma Gap link for your registered team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <Field label="Select your team *">
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className={inputClassName}
              disabled={loadingTeams || status === "loading"}
              required
            >
              <option value="">
                {loadingTeams ? "Loading teams..." : "-- Select a team --"}
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.teamName}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Karma Gap Link *">
            <input
              type="url"
              required
              value={karmaGapLink}
              onChange={(e) => setKarmaGapLink(e.target.value)}
              className={inputClassName}
              placeholder="https://gap.karmahq.xyz/..."
              disabled={status === "loading"}
            />
            <p className="mt-1 text-xs text-black/60 dark:text-white/60">
              Link to your Karma Gap project
            </p>
          </Field>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={status === "loading" || !canSubmit}
              className="w-full rounded-full"
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>

            {status === "error" && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
                {errorMessage || "Error submitting. Please try again."}
              </div>
            )}

            {status === "success" && (
              <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
                Submission successful!
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

const inputClassName = cn(
  "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-foreground shadow-sm",
  "dark:border-white/15 dark:bg-black",
  "focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/25",
);
