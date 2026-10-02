"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CheckIcon, ShieldIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";

export function CheckoutForm() {
  const { detailedItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState("promptpay");
  const [submitting, setSubmitting] = useState(false);
  const shipping = subtotal >= 1500 ? 0 : 80;

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      clearCart();
      router.push("/checkout/success?order=SKY-261002-A7Q4");
    }, 900);
  }

  return (
    <form className="checkout-layout" onSubmit={submitOrder}>
      <div className="checkout-main">
        <section className="checkout-section">
          <div className="checkout-section-title"><span>1</span><div><h2>ที่อยู่จัดส่ง</h2><p>ใช้สำหรับจำลองหน้าจอเท่านั้น ข้อมูลจะไม่ถูกส่งออกจากเบราว์เซอร์</p></div></div>
          <div className="form-grid">
            <label><span>ชื่อผู้รับ</span><input autoComplete="name" defaultValue="ณัฐวุฒิ ใจดี" required /></label>
            <label><span>เบอร์โทรศัพท์</span><input autoComplete="tel" defaultValue="089 123 4567" inputMode="tel" required /></label>
            <label className="form-span"><span>ที่อยู่</span><input autoComplete="street-address" defaultValue="88 ถนนสุขุมวิท แขวงคลองตัน" required /></label>
            <label><span>จังหวัด</span><select defaultValue="กรุงเทพมหานคร"><option>กรุงเทพมหานคร</option><option>เชียงใหม่</option><option>ขอนแก่น</option></select></label>
            <label><span>รหัสไปรษณีย์</span><input autoComplete="postal-code" defaultValue="10110" inputMode="numeric" required /></label>
          </div>
        </section>
        <section className="checkout-section">
          <div className="checkout-section-title"><span>2</span><div><h2>วิธีจัดส่ง</h2><p>เลือกตามความเร็วที่ต้องการ</p></div></div>
          <label className="selection-row"><input defaultChecked name="shipping" type="radio" /><span><strong>จัดส่งมาตรฐาน</strong><small>ถึงภายใน 2–4 วัน</small></span><b>{shipping ? formatPrice(shipping) : "ฟรี"}</b></label>
          <label className="selection-row"><input name="shipping" type="radio" /><span><strong>จัดส่งวันถัดไป</strong><small>สั่งก่อน 14:00 น.</small></span><b>{formatPrice(120)}</b></label>
        </section>
        <section className="checkout-section">
          <div className="checkout-section-title"><span>3</span><div><h2>ช่องทางชำระเงิน</h2><p>UI จำลอง — ไม่มีการส่งข้อมูลหรือสร้างธุรกรรมจริง</p></div></div>
          <div className="payment-options">
            <label className={payment === "promptpay" ? "is-selected" : ""}><input checked={payment === "promptpay"} name="payment" onChange={() => setPayment("promptpay")} type="radio" /><span className="payment-mark qr-mark">QR</span><span><strong>QR PromptPay</strong><small>สแกนผ่านแอปธนาคาร</small></span><CheckIcon /></label>
            <label className={payment === "card" ? "is-selected" : ""}><input checked={payment === "card"} name="payment" onChange={() => setPayment("card")} type="radio" /><span className="payment-mark">••••</span><span><strong>บัตรเครดิตหรือเดบิต</strong><small>ระบบจริงจะใช้ Hosted payment page</small></span><CheckIcon /></label>
          </div>
        </section>
      </div>
      <aside className="checkout-summary">
        <h2>รายการของคุณ</h2>
        <div className="checkout-products">{detailedItems.map((item) => <div key={`${item.productId}-${item.color}`}><span className="checkout-thumb"><Image alt="" fill sizes="64px" src={item.product.image} /><i>{item.quantity}</i></span><span><strong>{item.product.shortName}</strong><small>{item.color}</small></span><b>{formatPrice(item.product.price * item.quantity)}</b></div>)}</div>
        <dl><div><dt>สินค้า</dt><dd>{formatPrice(subtotal)}</dd></div><div><dt>จัดส่ง</dt><dd>{shipping ? formatPrice(shipping) : "ฟรี"}</dd></div></dl>
        <div className="summary-total"><span>ยอดชำระ</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
        <button className="button button-primary button-full" disabled={submitting || !detailedItems.length} type="submit">{submitting ? "กำลังเตรียมคำสั่งซื้อ…" : "ยืนยันคำสั่งซื้อ"}</button>
        <p><ShieldIcon size={18} /> ปุ่มนี้จำลองการสั่งซื้อและไม่เรียก Payment Provider</p>
      </aside>
    </form>
  );
}
