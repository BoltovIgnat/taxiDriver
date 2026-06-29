import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { YandexMetrika } from "@/components/analytics/YandexMetrika";
import { siteConfig } from "@/config/site";

export const metadata = {
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative z-[1] flex min-h-[100dvh] flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <FloatingCTA />
      <YandexMetrika />
    </>
  );
}
