"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ExportField = {
  id: string;
  label: string;
  enabled: boolean;
};

const DEFAULT_FIELDS: ExportField[] = [
  { id: "teamName", label: "Team Name", enabled: true },
  { id: "memberName", label: "Member Name", enabled: true },
  { id: "memberEmail", label: "Email", enabled: true },
  { id: "memberGithub", label: "GitHub Username", enabled: true },
  { id: "country", label: "Country", enabled: true },
  { id: "walletAddress", label: "Wallet Address", enabled: false },
  { id: "registrationDate", label: "Registration Date", enabled: true },
  { id: "hasSubmission", label: "Has Submission", enabled: false },
  { id: "karmaGapLink", label: "Karma Gap Link", enabled: false },
  { id: "tracks", label: "Selected Tracks", enabled: false },
];

export function ExportEmailsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [fields, setFields] = useState<ExportField[]>(DEFAULT_FIELDS);

  const toggleField = (fieldId: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  const selectAll = () => {
    setFields((prev) => prev.map((field) => ({ ...field, enabled: true })));
  };

  const deselectAll = () => {
    setFields((prev) => prev.map((field) => ({ ...field, enabled: false })));
  };

  const handleExport = async () => {
    const selectedFields = fields.filter((f) => f.enabled).map((f) => f.id);

    if (selectedFields.length === 0) {
      alert("Please select at least one field to export");
      return;
    }

    setIsExporting(true);
    try {
      const response = await fetch("/api/admin/export-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: selectedFields }),
      });

      if (!response.ok) {
        throw new Error("Failed to export emails");
      }

      // Get the blob data
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `buildathon-export-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Close dialog after successful export
      setIsOpen(false);
    } catch (error) {
      console.error("Error exporting emails:", error);
      alert("Failed to export emails. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Export to CSV
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Data to CSV</DialogTitle>
            <DialogDescription>
              Select the fields you want to include in the export
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="mb-4 flex gap-2">
              <button
                onClick={selectAll}
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Select All
              </button>
              <span className="text-xs text-black/40 dark:text-white/40">•</span>
              <button
                onClick={deselectAll}
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Deselect All
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {fields.map((field) => (
                <label
                  key={field.id}
                  className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-3 cursor-pointer hover:bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                >
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={() => toggleField(field.id)}
                    className="h-4 w-4 rounded border-black/20 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-white/20"
                  />
                  <span className="text-sm text-foreground">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              disabled={isExporting}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-black/[0.02] disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
