import type { Metadata } from "next";

import { withSocialMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = withSocialMetadata({
  title: "Города — работа в такси по России",
  description:
    "25+ городов: Москва, Санкт-Петербург, Казань, Новосибирск и другие. Сравните доход, условия аренды и подключение водителей такси в вашем регионе.",
  path: "/goroda",
});

export default function GorodaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
