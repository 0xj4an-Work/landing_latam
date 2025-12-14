"use client";

type Registration = {
  id: string;
  createdAt: Date;
  teamName: string;
  teamMembers: string;
  githubRepo: string | null;
  karmaGapLink: string | null;
};

export function ExportButton({
  registrations,
}: {
  registrations: Registration[];
}) {
  const handleExport = () => {
    const csv = [
      ["Date", "Team Name", "Team Members", "GitHub Repo", "Karma Gap Link"],
      ...registrations.map((reg) => [
        new Date(reg.createdAt).toISOString(),
        reg.teamName,
        reg.teamMembers,
        reg.githubRepo || "",
        reg.karmaGapLink || "",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
    >
      Export to CSV
    </button>
  );
}
