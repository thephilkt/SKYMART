import { notFound } from "next/navigation";
import { AdminFullPageForm } from "@/components/admin/admin-full-page-form";
import { adminResources, isAdminResourceKey } from "@/lib/admin/resources";

export default async function AdminNewRecordPage({ params }: PageProps<"/admin/[resource]/new">) {
  const { resource } = await params;
  if (!isAdminResourceKey(resource)) notFound();
  return <AdminFullPageForm resource={adminResources[resource]} />;
}
