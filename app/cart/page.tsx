"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, MinusIcon, PlusIcon, ShieldIcon, TrashIcon, TruckIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { detailedItems, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = subtotal >= 1500 ? 0 : 80;

  if (!detailedItems.length) {
    return <div className="state-page"><span className="empty-orbit" /><h1>ตะกร้ากำลังรอของที่ใช่</h1><p>เมื่อเพิ่มสินค้า รายละเอียดราคา ร้านค้า และการจัดส่งจะรวมอยู่ที่นี่</p><Link className="button button-primary" href="/search">เริ่มเลือกสินค้า</Link></div>;
  }

  const shops = [...new Set(detailedItems.map((item) => item.product.seller))];

  return (
    <div className="page-shell cart-page">
      <div className="page-title"><div><h1>ตะกร้าของคุณ</h1><p>{detailedItems.length} รายการจาก {shops.length} ร้านค้า</p></div><span>ตรวจสอบทุกอย่างก่อนเดินทางต่อ</span></div>
      <div className="cart-layout">
        <div className="cart-groups">
          {shops.map((shop) => (
            <section className="cart-group" key={shop}>
              <div className="cart-shop"><span className="shop-signal" /><strong>{shop}</strong><Link href="/search">ดูร้านค้า</Link></div>
              {detailedItems.filter((item) => item.product.seller === shop).map((item) => (
                <article className="cart-line" key={`${item.productId}-${item.color}`}>
                  <Link className="cart-line-image" href={`/product/${item.product.slug}`}><Image alt={item.product.name} fill sizes="140px" src={item.product.image} /></Link>
                  <div className="cart-line-copy">
                    <Link href={`/product/${item.product.slug}`}><h2>{item.product.name}</h2></Link>
                    <p>สี {item.color}</p>
                    <span className="line-delivery"><TruckIcon size={17} /> {item.product.delivery}</span>
                  </div>
                  <div className="cart-line-actions">
                    <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                    <div className="quantity-stepper compact">
                      <button aria-label="ลดจำนวน" disabled={item.quantity === 1} onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}><MinusIcon size={17} /></button>
                      <span>{item.quantity}</span>
                      <button aria-label="เพิ่มจำนวน" onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}><PlusIcon size={17} /></button>
                    </div>
                    <button aria-label={`ลบ ${item.product.name}`} className="remove-button" onClick={() => removeItem(item.productId, item.color)}><TrashIcon size={18} /> ลบ</button>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>

        <aside className="order-summary">
          <h2>สรุปคำสั่งซื้อ</h2>
          <dl><div><dt>ยอดรวมสินค้า</dt><dd>{formatPrice(subtotal)}</dd></div><div><dt>ค่าจัดส่ง</dt><dd>{shipping ? formatPrice(shipping) : "ฟรี"}</dd></div></dl>
          <div className="coupon-field"><label htmlFor="coupon">คูปอง</label><div><input id="coupon" placeholder="กรอกรหัสคูปอง" /><button>ใช้</button></div><span>ข้อมูลจำลอง — ยังไม่เชื่อมระบบคูปอง</span></div>
          <div className="summary-total"><span>ยอดสุทธิ</span><strong>{formatPrice(subtotal + shipping)}</strong></div>
          <Link className="button button-primary button-full" href="/checkout">ดำเนินการชำระเงิน <ArrowIcon size={18} /></Link>
          <p className="summary-assurance"><ShieldIcon size={18} /> คุณจะได้ตรวจสอบที่อยู่และยอดทั้งหมดอีกครั้ง</p>
        </aside>
      </div>
    </div>
  );
}
