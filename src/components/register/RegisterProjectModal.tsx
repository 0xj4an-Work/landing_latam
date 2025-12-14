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
import SuccessModal from "@/components/register/SuccessModal";
import { cn } from "@/lib/cn";

interface RegisterProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function RegisterProjectModal({
  open,
  onOpenChange,
}: RegisterProjectModalProps) {
  const [formData, setFormData] = React.useState({
    teamName: "",
    teamMembers: "",
    githubRepo: "",
    karmaGapLink: "",
  });
  const [status, setStatus] = React.useState<Status>("idle");
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/buildathon/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          teamName: "",
          teamMembers: "",
          githubRepo: "",
          karmaGapLink: "",
        });
        onOpenChange(false);
        setShowSuccessModal(true);
        setStatus("idle");
      } else {
        setStatus("error");
        try {
          const json = (await res.json()) as { error?: string };
          setErrorMessage(json?.error || "Error registering. Please try again.");
        } catch {
          setErrorMessage("Error registering. Please try again.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply / Register</DialogTitle>
            <DialogDescription>
              Register your team. You can update project links later.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <Field label="Team name *">
              <input
                type="text"
                required
                value={formData.teamName}
                onChange={(e) =>
                  setFormData({ ...formData, teamName: e.target.value })
                }
                className={inputClassName}
                placeholder="My awesome project"
              />
            </Field>

            <Field label="Team members *">
              <input
                type="text"
                required
                value={formData.teamMembers}
                onChange={(e) =>
                  setFormData({ ...formData, teamMembers: e.target.value })
                }
                className={inputClassName}
                placeholder="e.g. Juan Pérez, María García, Carlos López"
              />
            </Field>

            <Field label="GitHub repo (optional)">
              <input
                type="url"
                value={formData.githubRepo}
                onChange={(e) =>
                  setFormData({ ...formData, githubRepo: e.target.value })
                }
                className={inputClassName}
                placeholder="https://github.com/user/project"
              />
              <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                Rule: GitHub repos should have no code before the buildathon start date (2026-01-19). Only README, LICENSE, and .gitignore files are allowed.
              </p>
            </Field>

            <Field label="Karma Gap link (optional for registration)">
              <input
                type="url"
                value={formData.karmaGapLink}
                onChange={(e) =>
                  setFormData({ ...formData, karmaGapLink: e.target.value })
                }
                className={inputClassName}
                placeholder="https://karmagap.com/..."
              />
              <p className="mt-2 text-xs text-black/60 dark:text-white/60">
                For submission: include a live public demo URL and ensure your project is deployed on Celo Mainnet.
              </p>
            </Field>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full"
            >
              {status === "loading" ? "Registering..." : "Register"}
            </Button>

            {status === "error" ? (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
                {errorMessage || "Error registering. Please try again."}
              </div>
            ) : null}
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal open={showSuccessModal} onOpenChange={setShowSuccessModal} />
    </>
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
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

const inputClassName = cn(
  "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-foreground shadow-sm",
  "dark:border-white/15 dark:bg-black",
  "focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/25",
);


