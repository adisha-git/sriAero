import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { Providers } from "@/components/layout/Providers";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { localBusinessSchema } from "@/lib/seo";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  // Small labels only, so don't let it compete with the heading font for early bandwidth.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aircraft Detailing Calgary | Mobile Jet Detailing in Alberta | SriAero",
    template: "%s | SriAero",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  formatDetection: { telephone: false },
  openGraph: { locale: "en_CA", siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0B1B2B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
      // The preloader script sets data-preloaded on <html> before hydration.
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col pb-[76px] sm:pb-0">
        <a
          href="#main"
          className="sr-only z-[110] rounded-full bg-amber px-5 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCallBar />
        </Providers>
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
