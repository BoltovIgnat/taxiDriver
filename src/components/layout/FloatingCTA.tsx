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

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;

    const checkOverlap = () => {
      frame = 0;
      const buttonRect = root.getBoundingClientRect();
      const overlaps = HIDE_ZONES.some((selector) => {
        const zone = document.querySelector(selector);
        if (!zone) return false;
        return rectsOverlap(buttonRect, zone.getBoundingClientRect());
      });
      setHidden(overlaps);
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
