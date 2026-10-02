"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AdminSignOut() {
  const router = useRouter();
  return <button className="admin-sign-out" onClick={async () => { const supabase = createBrowserSupabaseClient(); await supabase?.auth.signOut(); router.replace("/admin-login"); router.refresh(); }} type="button"><LogOut size={16} />ออกจากระบบ</button>;
}
