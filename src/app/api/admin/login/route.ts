import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createSessionToken,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin/auth";

const loginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD не задан в переменных окружения" },
      { status: 503 },
    );
  }

  try {
    const body = loginSchema.parse(await request.json());
    if (!verifyAdminPassword(body.password)) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
    }

    const token = createSessionToken();
    if (!token) {
      return NextResponse.json({ error: "Ошибка создания сессии" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
  }
}
