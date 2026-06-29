import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { deleteArticle } from "@/lib/articles/store";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function DELETE(_request: Request, { params }: Props) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = await deleteArticle(slug);

  if (!deleted) {
    return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json({ success: true });
}
