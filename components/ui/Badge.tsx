import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "draft" | "sent" | "paid" | "overdue" | "default";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-sidebar text-muted border-border",
    draft: "bg-sidebar text-muted border-border",
    sent: "bg-warning/10 text-warning border-warning/20",
    paid: "bg-success/10 text-success border-success/20",
    overdue: "bg-danger/10 text-danger border-danger/20"
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors", variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
