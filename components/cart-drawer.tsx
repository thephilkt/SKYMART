"use client";

import Image from "next/image";
import Link from "next/link";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart-provider";

export function CartDrawer() {
  const { detailedItems, subtotal, isCartOpen, setCartOpen, updateQuantity } = useCart();

  return (
    <>
      <button
        aria-label="ปิดตะกร้าสินค้า"
        className={`drawer-backdrop ${isCartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
        tabIndex={isCartOpen ? 0 : -1}
      />
      <aside aria-hidden={!isCartOpen} aria-label="ตะกร้าสินค้า" className={`cart-drawer ${isCartOpen ? "is-open" : ""}`}>
        <div className="drawer-heading">
          <div>
            <p>ตะกร้าของคุณ</p>
            <span>{detailedItems.length ? `${detailedItems.length} รายการ` : "ยังไม่มีสินค้า"}</span>
          </div>
          <button aria-label="ปิดตะกร้า" className="icon-button" onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-items">
          {detailedItems.length === 0 ? (
            <div className="drawer-empty">
              <span className="empty-orbit" />
              <h2>รางสินค้ายังว่างอยู่</h2>
              <p>เลือกสิ่งที่ใช่ แล้วเราจะเก็บไว้ตรงนี้ให้คุณ</p>
              <button className="button button-dark" onClick={() => setCartOpen(false)}>เลือกซื้อสินค้า</button>
            </div>
          ) : detailedItems.map((item) => (
            <article className="drawer-item" key={`${item.productId}-${item.color}`}>
              <Image alt="" height={96} src={item.product.image} width={96} />
              <div>
                <h3>{item.product.shortName}</h3>
                <p>{item.color}</p>
                <div className="drawer-item-bottom">
                  <div className="compact-stepper" aria-label="จำนวนสินค้า">
                    <button aria-label="ลดจำนวน" onClick={() => updateQuantity(item.productId, item.color, Math.max(1, item.quantity - 1))}><MinusIcon size={15} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label="เพิ่มจำนวน" onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}><PlusIcon size={15} /></button>
                  </div>
                  <strong>{formatPrice(item.product.price * item.quantity)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        {detailedItems.length > 0 && (
          <div className="drawer-summary">
            <div><span>ยอดรวมสินค้า</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>ค่าจัดส่งจะแสดงอย่างชัดเจนก่อนชำระเงิน</p>
            <Link className="button button-primary button-full" href="/cart" onClick={() => setCartOpen(false)}>ไปที่ตะกร้า</Link>
          </div>
        )}
      </aside>
    </>
  );
}
