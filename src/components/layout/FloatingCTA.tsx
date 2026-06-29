"use client";

import Link from "next/link";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
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
