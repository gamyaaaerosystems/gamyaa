import { AeaipLocalNav } from "@/components/aeaip/local-nav";
import { AEAIP_DEMO_HREF, AEAIP_HREF, AEAIP_STRATEGY_HREF, LEARN_PAGES } from "@/content/aeaip";

export default function AeaipLayout({ children }: LayoutProps<"/aerosystems/aeaip">) {
  return (
    <>
      <AeaipLocalNav
        overview={{ label: "Overview", href: AEAIP_HREF }}
        howItWorks={{ label: "How it works", href: `${AEAIP_HREF}#how-it-works` }}
        learn={LEARN_PAGES.map((p) => ({ label: p.nav, href: p.href }))}
        demo={{ label: "Demo", href: AEAIP_DEMO_HREF }}
        strategy={{ label: "Strategy", href: AEAIP_STRATEGY_HREF }}
      />
      {children}
    </>
  );
}
