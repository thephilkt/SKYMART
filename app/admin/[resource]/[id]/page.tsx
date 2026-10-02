import { notFound } from "next/navigation";
import { AdminFullPageForm } from "@/components/admin/admin-full-page-form";
import { adminResources, isAdminResourceKey } from "@/lib/admin/resources";

export default async function AdminRecordPage({ params }: PageProps<"/admin/[resource]/[id]">) {
  const { resource, id } = await params;
  if (!isAdminResourceKey(resource)) notFound();
  return <AdminFullPageForm recordId={id} resource={adminResources[resource]} />;
}
