import type { ReactNode } from "react";
import { StatusBadge } from "@/components/ui/primitives";
import type { Status } from "@/content/status";
import { cn } from "@/lib/cn";

/**
 * EngineeringCallout — one highlighted note: how AEAIP relates, a boundary
 * statement, or the page's single status disclaimer.
 */
export function EngineeringCallout({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: Status;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside aria-label={title} className={cn("rounded-sm border-l-2 border-accent bg-surface-accent px-5 py-5 sm:px-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">{title}</p>
        {status ? <StatusBadge status={status} /> : null}
      </div>
      <div className="mt-2 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">{children}</div>
    </aside>
  );
}
