"use client";

import type { ComponentPropsWithoutRef } from "react";

import Squares from "@/components/home/Squares";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function SquaresButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <a
      className={cn(
        buttonClasses({ variant, size }),
        "relative overflow-hidden",
        variant === "primary"
          ? "[--grid-border-color:rgba(0,0,0,0.10)] [--grid-hover-color:rgba(0,0,0,0.07)]"
          : "[--grid-border-color:rgba(0,0,0,0.10)] [--grid-hover-color:rgba(0,0,0,0.07)] dark:[--grid-border-color:rgba(255,255,255,0.18)] dark:[--grid-hover-color:rgba(255,255,255,0.11)]",
        className,
      )}
      {...props}
    >
      <Squares
        interaction="element"
        direction="diagonal"
        speed={0.1}
        squareSize={18}
        className="opacity-25 dark:opacity-40"
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}


