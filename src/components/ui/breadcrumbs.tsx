import Link from "next/link";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./primitives";

/** Visible breadcrumb trail + matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-subtle">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 ? (
                  <span aria-hidden className="text-steel">
                    /
                  </span>
                ) : null}
                {last ? (
                  <span aria-current="page" className="text-ink-2">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="inline-flex min-h-6 items-center hover:text-ink">
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
