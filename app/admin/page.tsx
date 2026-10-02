import Link from "next/link";
import { ArrowUpRight, Boxes, PackageCheck, ShieldCheck, Store, UsersRound } from "lucide-react";
import { adminResources } from "@/lib/admin/resources";

export default function AdminDashboardPage() {
  return (
    <section className="admin-dashboard">
      <div className="admin-page-heading"><div><h1>ภาพรวมระบบ</h1><p>ตรวจสอบสิ่งสำคัญและเข้าสู่การจัดการข้อมูลได้จากจุดเดียว</p></div><span className="admin-live-state"><i />ข้อมูลตัวอย่างสำหรับ UI</span></div>
      <div className="admin-metric-strip">
        <article><UsersRound size={20} /><span>ผู้ใช้งาน</span><strong>3</strong><small>2 บัญชีใช้งานอยู่</small></article>
        <article><Store size={20} /><span>ร้านค้า</span><strong>2</strong><small>1 ร้านรอตรวจสอบ</small></article>
        <article><PackageCheck size={20} /><span>สินค้า</span><strong>6</strong><small>4 รายการเผยแพร่แล้ว</small></article>
        <article><Boxes size={20} /><span>สต็อกต่ำ</span><strong>1</strong><small>ควรตรวจสอบวันนี้</small></article>
      </div>
      <div className="admin-dashboard-grid">
        <section className="admin-module-list"><header><div><h2>ข้อมูลทั้งหมด</h2><p>เข้าถึง CRUD ของทุกตารางใน Catalog MVP</p></div><ShieldCheck size={22} /></header>
          {Object.values(adminResources).map((resource) => <Link href={`/admin/${resource.key}`} key={resource.key}><div><strong>{resource.label}</strong><span>{resource.description}</span></div><div><b>{resource.records.length}</b><ArrowUpRight size={18} /></div></Link>)}
        </section>
        <aside className="admin-attention"><h2>ต้องตรวจสอบ</h2><div><span className="admin-attention-mark">01</span><p><strong>ร้านค้ารออนุมัติ</strong><small>Morrow Living ส่งข้อมูลครบแล้ว</small></p></div><div><span className="admin-attention-mark">02</span><p><strong>สต็อกต่ำกว่ากำหนด</strong><small>AERO-SKY เหลือพร้อมขาย 5 ชิ้น</small></p></div><Link href="/admin/inventory">ไปที่คลังสินค้า<ArrowUpRight size={17} /></Link></aside>
      </div>
    </section>
  );
}
