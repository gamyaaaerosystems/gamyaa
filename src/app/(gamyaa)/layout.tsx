import { ParentFooter } from "@/components/site/footer";
import { ParentHeader } from "@/components/site/header";

export default function ParentLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ParentHeader />
      <main id="main-gamyaa" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <ParentFooter />
    </>
  );
}
