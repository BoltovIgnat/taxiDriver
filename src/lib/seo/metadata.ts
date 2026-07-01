import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const OG_IMAGE_PATH = "/og-image.jpg";
export const FAVICON_PATH = "/favicon.svg";

const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — работа водителем такси`,
} as const;

/** Базовые OG/Twitter-поля для любой страницы */
export function withSocialMetadata({
  title,
  description,
  path,
  ogImage = OG_IMAGE_PATH,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const image =
    ogImage === OG_IMAGE_PATH
      ? OG_IMAGE
      : { url: ogImage, width: 1200, height: 630, alt: title };

  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: siteConfig.name,
      title,
      description,
      ...(path ? { url: path } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Дефолтные иконки и OG-картинка для корневого layout */
export function getRootSocialDefaults(): Pick<Metadata, "icons" | "openGraph" | "twitter"> {
  const defaultTitle = `${siteConfig.name} — работа водителем такси`;

  return {
    icons: {
      icon: [{ url: FAVICON_PATH, type: "image/svg+xml" }],
      shortcut: FAVICON_PATH,
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: siteConfig.name,
      title: defaultTitle,
      description: siteConfig.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: siteConfig.description,
      images: [OG_IMAGE_PATH],
    },
  };
}
