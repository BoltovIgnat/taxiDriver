import type { LeadPayload } from "@/types";

export async function sendToAmoCRM(payload: LeadPayload): Promise<boolean> {
  const subdomain = process.env.AMOCRM_SUBDOMAIN;
  const token = process.env.AMOCRM_ACCESS_TOKEN;
  if (!subdomain || !token) return false;

  try {
    const res = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: `Заявка: ${payload.name}`,
          _embedded: {
            contacts: [
              {
                name: payload.name,
                custom_fields_values: [
                  {
                    field_code: "PHONE",
                    values: [{ value: payload.phone }],
                  },
                ],
              },
            ],
          },
        },
      ]),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendToBitrix24(payload: LeadPayload): Promise<boolean> {
  const webhook = process.env.BITRIX24_WEBHOOK_URL;
  if (!webhook) return false;

  try {
    const res = await fetch(`${webhook}/crm.lead.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка водитель: ${payload.name}`,
          NAME: payload.name,
          PHONE: [{ VALUE: payload.phone, VALUE_TYPE: "WORK" }],
          COMMENTS: [
            payload.city && `Город: ${payload.city}`,
            payload.carType && `Авто: ${payload.carType === "own" ? "своё" : "аренда"}`,
            payload.calculatedIncome && `Расчётный доход: ${payload.calculatedIncome} ₽/мес`,
            payload.page && `Страница: ${payload.page}`,
          ]
            .filter(Boolean)
            .join("\n"),
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendToTelegram(payload: LeadPayload): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = [
    "🚕 Новая заявка водитель",
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    payload.city && `Город: ${payload.city}`,
    payload.carType && `Авто: ${payload.carType === "own" ? "своё" : "аренда"}`,
    payload.calculatedIncome && `Доход: ~${payload.calculatedIncome} ₽/мес`,
    payload.page && `Страница: ${payload.page}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; channel: string }> {
  const provider = process.env.CRM_PROVIDER ?? "telegram";

  if (provider === "amocrm") {
    const ok = await sendToAmoCRM(payload);
    if (ok) return { ok: true, channel: "amocrm" };
  }

  if (provider === "bitrix24") {
    const ok = await sendToBitrix24(payload);
    if (ok) return { ok: true, channel: "bitrix24" };
  }

  const telegramOk = await sendToTelegram(payload);
  if (telegramOk) return { ok: true, channel: "telegram" };

  console.log("[LEAD]", JSON.stringify(payload));
  return { ok: true, channel: "console" };
}
