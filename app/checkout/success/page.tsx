import Link from "next/link";
import { CheckIcon, TruckIcon } from "@/components/icons";

export default async function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order = "SKY-DEMO-0001" } = await searchParams;
  return <div className="success-page"><div className="success-icon"><CheckIcon size={40} /></div><p className="success-label">คำสั่งซื้อถูกบันทึกแล้ว</p><h1>เส้นทางต่อไป<br />คือหน้าประตูของคุณ</h1><p>หมายเลขคำสั่งซื้อ <strong>{order}</strong></p><div className="success-timeline"><span className="is-active"><i><CheckIcon size={15} /></i><b>รับคำสั่งซื้อ</b><small>วันนี้</small></span><span><i /><b>กำลังเตรียมสินค้า</b><small>ขั้นตอนถัดไป</small></span><span><i><TruckIcon size={15} /></i><b>ออกเดินทาง</b><small>รอเลขติดตาม</small></span></div><div className="success-actions"><Link className="button button-primary" href="/orders">ดูคำสั่งซื้อ</Link><Link className="button button-secondary" href="/">กลับหน้าแรก</Link></div><p className="demo-disclaimer">นี่คือหน้าจอจำลอง ไม่มีคำสั่งซื้อหรือการชำระเงินจริงเกิดขึ้น</p></div>;
}
