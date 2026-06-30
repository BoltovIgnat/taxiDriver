"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const HIDE_ZONES = ["#trust-stats-strip", "[data-floating-cta-hide]"];

function rectsOverlap(a: DOMRect, b: DOMRect, padding = 12): boolean {
  return !(
    a.right + padding < b.left ||
    a.left - padding > b.right ||
    a.bottom + padding < b.top ||
    a.top - padding > b.bottom
  );
}

export function FloatingCTA() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [desktopAligned, setDesktopAligned] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;

    const alignUnderHeaderCta = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const headerCta = document.getElementById("header-cta");

      if (!isDesktop || !headerCta) {
        root.style.top = "";
        root.style.right = "";
        root.style.left = "";
        setDesktopAligned(false);
        return;
      }

      const rect = headerCta.getBoundingClientRect();
      root.style.top = `${rect.bottom + 8}px`;
      root.style.right = `${window.innerWidth - rect.right}px`;
      root.style.left = "auto";
      setDesktopAligned(true);
    };

    const checkOverlap = () => {
      frame = 0;
      alignUnderHeaderCta();

      const buttonRect = root.getBoundingClientRect();
      const zoneOverlap = HIDE_ZONES.some((selector) => {
        const zone = document.querySelector(selector);
        if (!zone) return false;
        return rectsOverlap(buttonRect, zone.getBoundingClientRect());
      });

      setHidden(zoneOverlap);
    };

    const scheduleCheck = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(checkOverlap);
    };

    scheduleCheck();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-all duration-300 ease-premium sm:bottom-6 sm:right-6",
        desktopAligned && "bottom-auto sm:bottom-auto",
        hidden && "pointer-events-none translate-y-3 scale-95 opacity-0",
      )}
    >
      <Link
        href="/#calculator"
        className="btn-primary inline-flex items-center gap-2 shadow-float !px-5 !py-3.5 text-sm"
      >
        Стать водителем
        <i className="ri-steering-2-line text-lg" aria-hidden />
      </Link>
    </div>
  );
}
