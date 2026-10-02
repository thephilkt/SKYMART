import Link from "next/link";
import { ArrowIcon, HeartIcon, ShieldIcon, UserIcon } from "@/components/icons";

export default function AccountPage() {
  return <div className="page-shell account-page"><div className="account-identity"><div className="account-avatar">ณ</div><div><span>บัญชีตัวอย่าง</span><h1>สวัสดี, ณัฐวุฒิ</h1><p>ข้อมูลในหน้านี้อยู่ใน UI เท่านั้นและยังไม่ได้เชื่อม Supabase</p></div></div><div className="account-menu"><Link href="/orders"><span><span className="menu-icon"><ArrowIcon /></span><span><strong>คำสั่งซื้อ</strong><small>ติดตามและดูประวัติ</small></span></span><ArrowIcon /></Link><Link href="/search"><span><span className="menu-icon"><HeartIcon /></span><span><strong>รายการโปรด</strong><small>เก็บสินค้าไว้ดูภายหลัง</small></span></span><ArrowIcon /></Link><Link href="#"><span><span className="menu-icon"><UserIcon /></span><span><strong>ข้อมูลส่วนตัวและที่อยู่</strong><small>เตรียมไว้สำหรับ Checkout</small></span></span><ArrowIcon /></Link><Link href="#"><span><span className="menu-icon"><ShieldIcon /></span><span><strong>ความปลอดภัย</strong><small>การเข้าสู่ระบบและอุปกรณ์</small></span></span><ArrowIcon /></Link></div></div>;
}
