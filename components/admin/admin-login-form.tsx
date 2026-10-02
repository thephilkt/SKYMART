"use client";

import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface AdminLoginFormProps {
  initialError?: string;
}

export function AdminLoginForm({ initialError = "" }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError);
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) { setError("ยังไม่ได้ตั้งค่า Supabase ใน .env.local"); return; }
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message === "Invalid login credentials" ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : signInError.message);
      setBusy(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  };

  return (
    <main className="admin-login-page" id="main-content">
      <section className="admin-login-card">
        <div className="admin-login-mark"><LockKeyhole size={24} /></div>
        <div><div className="admin-login-brand"><span>SKY</span>MART Admin</div><h1>เข้าสู่ระบบหลังบ้าน</h1><p>ใช้บัญชี Supabase ที่กำหนด role เป็น ADMIN และมีสถานะ ACTIVE</p></div>
        <form onSubmit={(event) => { event.preventDefault(); void signIn(); }}>
          <label className="admin-field"><span>อีเมล</span><input autoComplete="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="admin-field"><span>รหัสผ่าน</span><input autoComplete="current-password" required type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <div className="admin-storage-error" role="alert">{error}</div>}
          <button className="admin-button admin-button-primary admin-login-submit" disabled={busy} type="submit"><LogIn size={18} />{busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}</button>
        </form>
      </section>
    </main>
  );
}
