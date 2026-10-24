import { AeaipLocalNav } from "@/components/aeaip/local-nav";
import { AEAIP_DEMO_HREF, AEAIP_HREF, AEAIP_STRATEGY_HREF, LEARN_PAGES } from "@/content/aeaip";

const ITEMS = [
  { label: "Overview", href: AEAIP_HREF },
  ...LEARN_PAGES.map((p) => ({ label: p.nav, href: p.href })),
  { label: "Demo", href: AEAIP_DEMO_HREF },
  { label: "Strategy", href: AEAIP_STRATEGY_HREF },
];

export default function AeaipLayout({ children }: LayoutProps<"/aerosystems/aeaip">) {
  return (
    <>
      <AeaipLocalNav items={ITEMS} />
      {children}
    </>
  );
}
