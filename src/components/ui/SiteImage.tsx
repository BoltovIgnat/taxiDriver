"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SiteImageProps {
  src: string;
  fallback: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

const localExistsCache = new Map<string, boolean>();

function isExternal(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function isSvg(url: string) {
  return url.endsWith(".svg");
}

async function localImageExists(path: string): Promise<boolean> {
  if (localExistsCache.has(path)) {
    return localExistsCache.get(path)!;
  }

  try {
    const res = await fetch(path, { method: "HEAD" });
    const exists = res.ok;
    localExistsCache.set(path, exists);
    return exists;
  } catch {
    localExistsCache.set(path, false);
    return false;
  }
}

function NativeImage({
  src,
  alt,
  fill,
  priority,
  className,
  onError,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  onError?: () => void;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={onError}
      className={cn(
        fill ? "absolute inset-0 h-full w-full object-cover" : "h-full w-full object-cover",
        className,
      )}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function SiteImage({
  src,
  fallback,
  alt,
  fill,
  width,
  height,
  priority,
  className,
  sizes,
}: SiteImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      if (isExternal(src)) {
        if (!cancelled) setResolvedSrc(src);
        return;
      }

      const exists = await localImageExists(src);
      if (!cancelled) setResolvedSrc(exists ? src : fallback);
    }

    setResolvedSrc(null);
    resolve();

    return () => {
      cancelled = true;
    };
  }, [src, fallback]);

  const handleError = () => {
    setResolvedSrc((current) => {
      if (!current || current === fallback) return current;
      return fallback;
    });
  };

  if (!resolvedSrc) {
    return (
      <div
        className={cn(
          "animate-pulse bg-gradient-to-br from-[#1e293b] to-[#0f172a]",
          fill ? "absolute inset-0" : "h-full w-full",
          className,
        )}
        aria-hidden
      />
    );
  }

  if (isExternal(resolvedSrc) || isSvg(resolvedSrc)) {
    return (
      <NativeImage
        src={resolvedSrc}
        alt={alt}
        fill={fill}
        priority={priority}
        className={className}
        onError={handleError}
      />
    );
  }

  const imageProps = {
    src: resolvedSrc,
    alt,
    priority,
    sizes,
    onError: handleError,
    className: cn("object-cover", className),
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  return (
    <Image
      {...imageProps}
      width={width ?? 800}
      height={height ?? 600}
    />
  );
}
