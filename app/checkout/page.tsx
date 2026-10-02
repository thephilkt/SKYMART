import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return <div className="page-shell checkout-page"><div className="checkout-header"><div><Link href="/cart">← กลับไปตะกร้า</Link><h1>ตรวจสอบก่อนยืนยัน</h1></div><div className="checkout-progress"><span className="is-done">ตะกร้า</span><i /><span className="is-active">ข้อมูลและชำระเงิน</span><i /><span>สำเร็จ</span></div></div><CheckoutForm /></div>;
}
