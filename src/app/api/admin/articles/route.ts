import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createArticle, getArticles } from "@/lib/articles/store";
import { estimateReadTime, slugify, todayISO } from "@/lib/articles/utils";

const articleSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  description: z.string().min(10, "Минимум 10 символов"),
  content: z.string().min(50, "Минимум 50 символов"),
  slug: z.string().optional(),
  date: z.string().optional(),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articles = await getArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = articleSchema.parse(await request.json());
    const slug = body.slug?.trim() || slugify(body.title);

    if (!slug) {
      return NextResponse.json({ error: "Не удалось сформировать URL статьи" }, { status: 400 });
    }

    const article = await createArticle({
      slug,
      title: body.title.trim(),
      description: body.description.trim(),
      content: body.content.trim(),
      date: body.date || todayISO(),
      readTime: estimateReadTime(body.content),
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message ?? "Ошибка валидации" },
        { status: 400 },
      );
    }
    if (error instanceof Error && error.message.includes("уже существует")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Не удалось сохранить статью" }, { status: 500 });
  }
}
