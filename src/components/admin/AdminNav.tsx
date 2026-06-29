"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/articles", label: "Статьи" },
  { href: "/admin/articles/new", label: "Новая статья" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-black/[0.06] bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin/articles" className="text-lg font-bold text-[var(--color-text)]">
            Админка
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href
                    ? "rounded-full bg-accent-soft px-3 py-1.5 text-sm font-semibold text-[var(--color-steel)]"
                    : "rounded-full px-3 py-1.5 text-sm font-medium text-muted hover:text-[var(--color-text)]"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-muted hover:text-accent" target="_blank">
            Сайт ↗
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-muted ring-1 ring-black/[0.08] hover:bg-bg"
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}
