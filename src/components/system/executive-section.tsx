import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * ExecutiveSection — open, border-free section for leadership-level pages: a kicker,
 * one large statement and a short body. The statement carries the message; detail
 * sits below or behind a disclosure.
 */
export function ExecutiveSection({
  id,
  kicker,
  statement,
  children,
  className,
  wide = false,
}: {
  id: string;
  kicker: string;
  statement: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Body spans the full width under the statement instead of a side column. */
  wide?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-ga-section={`exec_${id}`} className={cn("scroll-mt-28 py-20 md:py-28", className)}>
      <Container>
        <div className={cn("grid gap-8", !wide && "lg:grid-cols-12 lg:gap-12")}>
          <div className={cn(!wide && "lg:col-span-6")}>
            <p className="kicker mb-5">{kicker}</p>
            <h2 id={`${id}-title`} className="heading max-w-3xl text-[2rem] text-ink sm:text-[2.75rem]">
              {statement}
            </h2>
          </div>
          {children ? (
            <div className={cn("text-[1.0625rem] leading-relaxed text-ink-2", !wide && "lg:col-span-6 lg:pt-12")}>{children}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
