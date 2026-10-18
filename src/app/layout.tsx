import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { AnalyticsListener } from "@/components/analytics/analytics-listener";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { LogoSprite } from "@/components/brand/logo";
import { PRIMARY_ORIGIN } from "@/lib/site";
import { DEFAULT_THEME, THEME_COLOR, THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_ORIGIN),
  title: {
    default: "GAMYAA | Aerospace, Defence, Space & Deep Tech",
    template: "%s | GAMYAA",
  },
  description:
    "GAMYAA builds and supports engineering technologies across aerospace, defence, space, manufacturing intelligence and deep tech.",
  applicationName: "GAMYAA",
  authors: [{ name: "GAMYAA", url: PRIMARY_ORIGIN }],
  creator: "GAMYAA",
  publisher: "GAMYAA",
  formatDetection: { telephone: false, email: false, address: false },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Dark is the default theme; the pre-paint script updates this for light/system.
  themeColor: THEME_COLOR.dark,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${inter.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <LogoSprite />
        {children}
        <AnalyticsListener />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
