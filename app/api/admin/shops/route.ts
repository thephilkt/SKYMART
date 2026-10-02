import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type ShopStatus = Database["public"]["Enums"]["shop_status"];
type ShopInput = { id?: string; name: string; slug: string; status: ShopStatus };

function errorResponse(error: unknown, status = 500) {
  const message = error instanceof Error ? error.message : "ดำเนินการกับร้านค้าไม่สำเร็จ";
  return Response.json({ error: message }, { status });
}

function assertLocalDevelopment(request: Request) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Direct Admin CRUD ถูกปิดใน production เพื่อความปลอดภัย");
  }
  const requestHost = new URL(request.url).hostname;
  if (!["localhost", "127.0.0.1"].includes(requestHost)) {
    throw new Error("อนุญาตให้เข้าถึง Admin API จากเครื่องนี้เท่านั้น");
  }
  const origin = request.headers.get("origin");
  if (origin && !["localhost", "127.0.0.1"].includes(new URL(origin).hostname)) {
    throw new Error("อนุญาตให้แก้ไขข้อมูลจาก localhost เท่านั้น");
  }
}

async function resolveDefaultOwnerId() {
  const supabase = createAdminSupabaseClient();
  const { data: admin } = await supabase.from("profiles").select("id").eq("role", "ADMIN").eq("status", "ACTIVE").limit(1).maybeSingle();
  if (admin) return admin.id;

  const { data: profile } = await supabase.from("profiles").select("id").eq("status", "ACTIVE").limit(1).maybeSingle();
  if (profile) return profile.id;

  const { data, error } = await supabase.auth.admin.createUser({
    email: "system-owner@skymart.local",
    password: `${crypto.randomUUID()}Aa1!`,
    email_confirm: true,
    user_metadata: { display_name: "SKYMART" },
  });
  if (error) throw error;
  return data.user.id;
}

export async function GET(request: Request) {
  try {
    assertLocalDevelopment(request);
    const supabase = createAdminSupabaseClient();
    const [{ data: shops, error }, { data: profiles, error: profileError }] = await Promise.all([
      supabase.from("shops").select("id,name,slug,owner_id,status").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id,display_name"),
    ]);
    if (error) throw error;
    if (profileError) throw profileError;
    const ownerNames = new Map((profiles ?? []).map((profile) => [profile.id, profile.display_name]));
    return Response.json((shops ?? []).map((shop) => ({
      id: shop.id,
      name: shop.name,
      slug: shop.slug,
      owner: ownerNames.get(shop.owner_id) ?? shop.owner_id,
      status: shop.status,
    })));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    assertLocalDevelopment(request);
    const input = await request.json() as ShopInput;
    const supabase = createAdminSupabaseClient();
    const ownerId = await resolveDefaultOwnerId();
    const { data, error } = await supabase.from("shops").insert({
      name: input.name.trim(), slug: input.slug.trim(), owner_id: ownerId, status: input.status,
    }).select("id").single();
    if (error) throw error;
    return Response.json({ ...input, id: data.id }, { status: 201 });
  } catch (error) {
    return errorResponse(error, 400);
  }
}

export async function PUT(request: Request) {
  try {
    assertLocalDevelopment(request);
    const input = await request.json() as ShopInput;
    if (!input.id) return Response.json({ error: "ไม่พบรหัสร้านค้า" }, { status: 400 });
    const supabase = createAdminSupabaseClient();
    const { error } = await supabase.from("shops").update({
      name: input.name.trim(), slug: input.slug.trim(), status: input.status,
    }).eq("id", input.id);
    if (error) throw error;
    return Response.json(input);
  } catch (error) {
    return errorResponse(error, 400);
  }
}

export async function DELETE(request: Request) {
  try {
    assertLocalDevelopment(request);
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return Response.json({ error: "ไม่พบรหัสร้านค้า" }, { status: 400 });
    const supabase = createAdminSupabaseClient();
    const { error } = await supabase.from("shops").delete().eq("id", id);
    if (error) throw error;
    return new Response(null, { status: 204 });
  } catch (error) {
    return errorResponse(error, 400);
  }
}
