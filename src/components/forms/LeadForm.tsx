"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { reachGoal } from "@/lib/analytics/yandex-metrika";
import type { CarType } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный телефон"),
  city: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Необходимо согласие" }) }),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  city?: string;
  carType?: CarType;
  calculatedIncome?: number;
  compact?: boolean;
  className?: string;
}

export function LeadForm({ city, carType, calculatedIncome, compact, className = "" }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { city: city ?? "" },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    const cityValue = data.city?.trim() || city || undefined;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          consent: data.consent,
          city: cityValue,
          carType,
          calculatedIncome,
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (res.ok) {
        reachGoal("form_submit", { city: cityValue, carType, page: window.location.pathname });
        window.location.href = "/spasibo";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}>
        <div>
          <input
            {...register("name")}
            placeholder="Ваше имя"
            className="input-field"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className="input-field"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div className={compact ? "sm:col-span-2" : undefined}>
          <input
            {...register("city")}
            placeholder="Город (необязательно)"
            className="input-field"
            autoComplete="address-level2"
          />
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" {...register("consent")} className="mt-1 rounded" />
        <span>
          Согласен на{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-2">
            обработку персональных данных
          </Link>
        </span>
      </label>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full !rounded-full sm:w-auto">
        {status === "loading" ? "Отправка..." : "Стать водителем"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">Ошибка отправки. Попробуйте ещё раз или перезвоните нам.</p>
      )}
    </form>
  );
}
