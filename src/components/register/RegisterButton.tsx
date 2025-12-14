"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import RegisterProjectModal from "@/components/register/RegisterProjectModal";
import { cn } from "@/lib/cn";

export default function RegisterButton({
  label = "Apply",
  variant = "secondary",
  size = "md",
  className,
}: {
  label?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn(className)}
        type="button"
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      {mounted ? <RegisterProjectModal open={open} onOpenChange={setOpen} /> : null}
    </>
  );
}


