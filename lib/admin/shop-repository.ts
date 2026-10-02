"use client";

import type { AdminRecord } from "@/lib/admin/resources";

async function parseResponse(response: Response) {
  if (response.ok) return;
  const body: unknown = await response.json();
  const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
    ? body.error
    : "เชื่อมต่อ Supabase ไม่สำเร็จ";
  throw new Error(message);
}

export async function listAdminShops(): Promise<AdminRecord[]> {
  const response = await fetch("/api/admin/shops", { cache: "no-store" });
  await parseResponse(response);
  return await response.json() as AdminRecord[];
}

export async function saveAdminShop(record: AdminRecord): Promise<AdminRecord> {
  const response = await fetch("/api/admin/shops", {
    method: record.id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  await parseResponse(response);
  return await response.json() as AdminRecord;
}

export async function deleteAdminShop(id: string) {
  const response = await fetch(`/api/admin/shops?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  await parseResponse(response);
}
