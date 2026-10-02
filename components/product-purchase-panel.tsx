"use client";

import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem(product.id, color, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="purchase-panel">
      <div className="variant-group">
        <div className="variant-heading"><span>สี</span><strong>{color}</strong></div>
        <div className="swatches">
          {product.colors.map((option) => (
            <button
              aria-label={`เลือกสี ${option.name}`}
              aria-pressed={color === option.name}
              key={option.name}
              onClick={() => setColor(option.name)}
              style={{ "--swatch": option.value } as React.CSSProperties}
            ><span /></button>
          ))}
        </div>
      </div>
      <div className="purchase-row">
        <div className="quantity-stepper" aria-label="เลือกจำนวน">
          <button aria-label="ลดจำนวน" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}><MinusIcon /></button>
          <span>{quantity}</span>
          <button aria-label="เพิ่มจำนวน" disabled={quantity >= Math.min(product.stock, 9)} onClick={() => setQuantity(quantity + 1)}><PlusIcon /></button>
        </div>
        <div className="purchase-total"><span>รวม</span><strong>{formatPrice(product.price * quantity)}</strong></div>
      </div>
      <button className={`button button-primary button-full purchase-button ${added ? "is-success" : ""}`} onClick={handleAdd}>
        {added ? <><CheckIcon /> เพิ่มลงตะกร้าแล้ว</> : "เพิ่มลงตะกร้า"}
      </button>
      <p className="purchase-note">ชำระเงินในขั้นตอนถัดไป · ยังไม่มีการตัดยอดในหน้านี้</p>
    </div>
  );
}
