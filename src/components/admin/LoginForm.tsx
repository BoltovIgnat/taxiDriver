"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BezelCard } from "@/components/ui/BezelCard";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Ошибка входа");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Не удалось подключиться к серверу");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BezelCard padding="lg" className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Вход в админку</h1>
      <p className="mt-2 text-sm text-muted">Управление статьями блога</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-steel">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          ← На сайт
        </Link>
      </p>
    </BezelCard>
  );
}
