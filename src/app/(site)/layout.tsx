import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "remixicon/fonts/remixicon.css";

import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileMenuProvider } from "@/components/layout/MobileMenuContext";
import { siteConfig } from "@/config/site";
import { getRootSocialDefaults } from "@/lib/seo/metadata";
import { getServerSideURL } from "@/lib/getServerSideURL";

import "../globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  description: siteConfig.description,
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: "Таксопарк Партнёр — работа водителем такси",
    template: "%s | Таксопарк Партнёр",
  },
  ...getRootSocialDefaults(),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${onest.variable} font-sans antialiased`}>
        <MobileMenuProvider>
          <div className="relative z-[1] flex min-h-[100dvh] flex-col">
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <Footer />
          </div>
          <FloatingCTA />
          <YandexMetrika />
        </MobileMenuProvider>
      </body>
    </html>
  );
}
