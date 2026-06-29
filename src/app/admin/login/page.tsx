import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminAuthenticated } from "@/lib/admin/auth";

interface Props {
  searchParams: Promise<{ from?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/articles");
  }

  const { from } = await searchParams;
  const redirectTo = from?.startsWith("/admin") ? from : "/admin/articles";

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-12">
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
