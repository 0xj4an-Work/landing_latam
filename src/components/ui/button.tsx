import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition",
        size === "md" && "h-11 px-4",
        size === "sm" && "h-9 px-3 shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-[var(--celo-yellow)] text-black hover:opacity-90",
        variant === "secondary" &&
          "border border-black/10 bg-white text-foreground hover:bg-black/[0.03] dark:border-[color:var(--celo-border)] dark:bg-black dark:hover:bg-white/[0.06]",
        variant === "ghost" &&
          "text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.06]",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition",
        size === "md" && "h-11 px-4",
        size === "sm" && "h-9 px-3 shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25",
        variant === "primary" &&
          "bg-[var(--celo-yellow)] text-black hover:opacity-90",
        variant === "secondary" &&
          "border border-black/10 bg-white text-foreground hover:bg-black/[0.03] dark:border-[color:var(--celo-border)] dark:bg-black dark:hover:bg-white/[0.06]",
        variant === "ghost" &&
          "text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.06]",
        className,
      )}
      {...props}
    />
  );
}


