import { notFound } from "next/navigation";
import { AdminResourceWorkspace } from "@/components/admin/admin-resource-workspace";
import { adminResources, isAdminResourceKey } from "@/lib/admin/resources";

export default async function AdminResourcePage({ params }: PageProps<"/admin/[resource]">) {
  const { resource } = await params;
  if (!isAdminResourceKey(resource)) notFound();
  return <AdminResourceWorkspace resource={adminResources[resource]} />;
}
