import { AeroFooter } from "@/components/site/footer";
import { AeroHeader } from "@/components/site/header";
import { JsonLd } from "@/components/ui/primitives";
import { aeroOrganizationLd } from "@/lib/seo";

export default function AeroLayout({ children }: LayoutProps<"/aerosystems">) {
  return (
    <>
      <AeroHeader />
      <main id="main-aero" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <AeroFooter />
      <JsonLd data={aeroOrganizationLd()} />
    </>
  );
}
