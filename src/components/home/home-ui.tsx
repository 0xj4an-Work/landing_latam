import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background/70 shadow-sm backdrop-blur",
        "dark:border-[color:var(--celo-border)] dark:bg-white/[0.03]",
        className,
      )}
      {...props}
    />
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs font-medium text-black/60 dark:text-white/60">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </Card>
  );
}

export function ChecklistItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-4 w-4 rounded-full border border-black/20 bg-black/5 dark:border-white/20 dark:bg-white/10" />
      <div className="text-black/70 dark:text-white/70">{children}</div>
    </div>
  );
}

export function RuleItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 text-foreground/80">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--celo-yellow)]" />
      <span className="flex-1">{children}</span>
    </div>
  );
}

export function PrizeCard({
  place,
  title,
  subtitle,
}: {
  place: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Card className="p-6">
      <div className="text-xs font-semibold text-black/60 dark:text-white/60">
        {place} place
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-black/70 dark:text-white/70">
        {subtitle}
      </div>
    </Card>
  );
}

export function MobileNav({
  links,
  className,
}: {
  links: ReadonlyArray<{ href: string; label: string }>;
  className?: string;
}) {
  return (
    <details className={cn("relative md:hidden", className)}>
      <summary
        className={cn(
          "inline-flex h-9 cursor-pointer list-none items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          "dark:border-[color:var(--celo-border)] dark:bg-black dark:hover:bg-white/[0.06] dark:focus-visible:ring-white/25",
        )}
        aria-label="Open navigation menu"
      >
        Menu
      </summary>
      <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-border bg-background p-1 text-sm shadow-lg dark:border-[color:var(--celo-border)] dark:bg-black">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="block rounded px-2 py-2 text-black outline-none hover:bg-black/[0.06] focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white dark:hover:bg-white/[0.08] dark:focus-visible:ring-white/25"
          >
            {l.label}
          </a>
        ))}
      </div>
    </details>
  );
}

