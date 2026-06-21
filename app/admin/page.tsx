import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";
import AdminEditor from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin · Eight Bridges",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }
  const content = await getContent();
  return <AdminEditor initial={content} />;
}
