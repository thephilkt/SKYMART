import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "เข้าสู่ระบบหลังบ้าน" };

export default function AdminLoginPage() {
  redirect("/admin");
}
