"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { AdminRecord } from "@/lib/admin/resources";
import type { Database } from "@/types/database";

type ProductStatus = Database["public"]["Enums"]["product_status"];

function text(record: AdminRecord, key: string) {
  return String(record[key] ?? "").trim();
}

export async function listAdminProducts(): Promise<AdminRecord[]> {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) throw new Error("ยังไม่ได้ตั้งค่า Supabase");

  const [{ data: products, error }, { data: shops }, { data: categories }] = await Promise.all([
    supabase.from("products").select("id,name,slug,description,status,shop_id,category_id").is("deleted_at", null).order("created_at", { ascending: false }),
    supabase.from("shops").select("id,name"),
    supabase.from("categories").select("id,name"),
  ]);
  if (error) throw error;
  const shopNames = new Map((shops ?? []).map((shop) => [shop.id, shop.name]));
  const categoryNames = new Map((categories ?? []).map((category) => [category.id, category.name]));

  return (products ?? []).map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    status: product.status,
    shop: shopNames.get(product.shop_id) ?? product.shop_id,
    category: categoryNames.get(product.category_id) ?? product.category_id,
  }));
}

async function resolveReference(table: "shops" | "categories", value: string) {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) throw new Error("ยังไม่ได้ตั้งค่า Supabase");
  const byId = await supabase.from(table).select("id").eq("id", value).maybeSingle();
  if (byId.data) return byId.data.id;
  const byName = await supabase.from(table).select("id").eq("name", value).maybeSingle();
  if (byName.error) throw byName.error;
  if (!byName.data) throw new Error(`ไม่พบ${table === "shops" ? "ร้านค้า" : "หมวดหมู่"} “${value}” ใน Supabase`);
  return byName.data.id;
}

export async function saveAdminProduct(record: AdminRecord): Promise<AdminRecord> {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) throw new Error("ยังไม่ได้ตั้งค่า Supabase");
  const [shopId, categoryId] = await Promise.all([
    resolveReference("shops", text(record, "shop")),
    resolveReference("categories", text(record, "category")),
  ]);
  const payload: Database["public"]["Tables"]["products"]["Insert"] = {
    shop_id: shopId,
    category_id: categoryId,
    name: text(record, "name"),
    short_name: text(record, "name"),
    slug: text(record, "slug"),
    description: text(record, "description"),
    status: text(record, "status") as ProductStatus,
    published_at: text(record, "status") === "ACTIVE" ? new Date().toISOString() : null,
  };

  const query = record.id
    ? supabase.from("products").update(payload).eq("id", record.id).select("id").single()
    : supabase.from("products").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) throw error;
  return { ...record, id: data.id };
}

export async function deleteAdminProduct(id: string) {
  const supabase = createBrowserSupabaseClient();
  if (!supabase) throw new Error("ยังไม่ได้ตั้งค่า Supabase");
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
