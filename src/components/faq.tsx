import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/cn";
import type { FaqItem } from "@/components/faq.types";

export type { FaqItem } from "@/components/faq.types";

export function Faq({ items }: { items: ReadonlyArray<FaqItem> }) {
  return (
    <div className="divide-y divide-black/10 rounded-xl border border-border bg-background/70 backdrop-blur dark:divide-white/10 dark:border-[color:var(--celo-border)] dark:bg-white/[0.03]">
      {items.map((item, idx) => (
        <details key={idx} className="group px-4">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium text-foreground outline-none",
              "focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/25",
            )}
          >
            <span>{item.question}</span>
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-[color:var(--celo-muted)] transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-4 text-sm leading-6 text-black/70 dark:text-white/70">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}


