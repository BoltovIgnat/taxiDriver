"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { reachGoal } from "@/lib/analytics/yandex-metrika";
import { formatPhoneInput, isValidRuPhone } from "@/lib/phone";
import type { CarType } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Введите имя (минимум 2 символа)"),
  phone: z.string().refine(isValidRuPhone, "Введите корректный номер телефона"),
  city: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Необходимо согласие на обработку данных" }) }),
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { city: city ?? "" },
  });

  const phoneField = register("phone");

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
        setStatus("success");
        reachGoal("form_submit", { city: cityValue, carType, page: window.location.pathname });
        window.setTimeout(() => {
          window.location.href = "/spasibo";
        }, 600);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
      data-floating-cta-hide
      noValidate
    >
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}>
        <div>
          <label htmlFor="lead-name" className="sr-only">
            Ваше имя
          </label>
          <input
            id="lead-name"
            {...register("name")}
            placeholder="Ваше имя *"
            className="input-field"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
          />
          {errors.name && (
            <p id="lead-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lead-phone" className="sr-only">
            Телефон
          </label>
          <input
            id="lead-phone"
            {...phoneField}
            type="tel"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__ *"
            className="input-field"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            onChange={(event) => {
              event.target.value = formatPhoneInput(event.target.value);
              phoneField.onChange(event);
            }}
          />
          {errors.phone && (
            <p id="lead-phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className={compact ? "sm:col-span-2" : undefined}>
          <label htmlFor="lead-city" className="sr-only">
            Город
          </label>
          <input
            id="lead-city"
            {...register("city")}
            placeholder="Город (необязательно)"
            className="input-field"
            autoComplete="address-level2"
          />
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 rounded"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          Согласен на{" "}
          <Link href="/privacy" className="text-accent underline underline-offset-2">
            обработку персональных данных
          </Link>{" "}
          *
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-red-600" role="alert">
          {errors.consent.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="btn-primary w-full !rounded-full sm:w-auto"
      >
        {status === "loading" ? "Отправка..." : status === "success" ? "Заявка отправлена" : "Стать водителем"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-700" role="status">
          Спасибо! Перенаправляем на страницу подтверждения…
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          Ошибка отправки. Попробуйте ещё раз или позвоните нам.
        </p>
      )}
    </form>
  );
}
