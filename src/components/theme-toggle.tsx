"use client";

import * as React from "react";
import { CheckIcon, DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const detailsRef = React.useRef<HTMLDetailsElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  function choose(nextTheme: "light" | "dark" | "system") {
    setTheme(nextTheme);
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details ref={detailsRef} className={cn("relative", className)}>
      <summary
        className={cn(
          // Match the `Menu` button (MobileNav) styling for consistency in the header
          "inline-flex h-9 cursor-pointer list-none items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
          "dark:border-[color:var(--celo-border)] dark:bg-black dark:hover:bg-white/[0.06] dark:focus-visible:ring-white/25",
        )}
        aria-label="Toggle theme"
      >
        {mounted ? (
          <>
            {theme === "dark" ? (
              <MoonIcon className="mr-2 h-4 w-4" />
            ) : theme === "light" ? (
              <SunIcon className="mr-2 h-4 w-4" />
            ) : (
              <DesktopIcon className="mr-2 h-4 w-4" />
            )}
            Theme
          </>
        ) : (
          <>
            <DesktopIcon className="mr-2 h-4 w-4" />
            Theme
          </>
        )}
      </summary>

      <div className="absolute right-0 mt-2 min-w-44 overflow-hidden rounded-md border border-border bg-background p-1 text-sm shadow-lg dark:border-[color:var(--celo-border)] dark:bg-black">
        <ThemeItem
          checked={mounted && theme === "light"}
          onSelect={() => choose("light")}
          icon={<SunIcon className="h-4 w-4" />}
        >
          Light
        </ThemeItem>
        <ThemeItem
          checked={mounted && theme === "dark"}
          onSelect={() => choose("dark")}
          icon={<MoonIcon className="h-4 w-4" />}
        >
          Dark
        </ThemeItem>
        <ThemeItem
          checked={mounted && theme === "system"}
          onSelect={() => choose("system")}
          icon={<DesktopIcon className="h-4 w-4" />}
        >
          System
        </ThemeItem>
      </div>
    </details>
  );
}

function ThemeItem({
  checked,
  onSelect,
  icon,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative flex w-full cursor-default select-none items-center gap-2 rounded px-2 py-1.5 text-black outline-none focus:bg-black/[0.06] dark:text-white dark:focus:bg-white/[0.08]"
    >
      {icon}
      <span className="flex-1 text-left">{children}</span>
      {checked ? <CheckIcon className="h-4 w-4" /> : <span className="h-4 w-4" />}
    </button>
  );
}


