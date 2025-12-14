import * as React from "react";

import { cn } from "@/lib/cn";

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6", className)} {...props} />;
}

export function Section({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"section">) {
  return (
    <section className={cn("py-16 sm:py-20", className)} {...props} />
  );
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  className,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <div className="text-sm font-medium tracking-wide text-[color:var(--celo-muted)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-title font-[200] tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-black/70 dark:text-white/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}


