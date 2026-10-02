"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowIcon, CheckIcon, SearchIcon, StarIcon, TruckIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export function ProductRunway({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const { addItem } = useCart();
  const active = products[activeIndex];

  function addActive() {
    addItem(active.id, active.colors[0]?.name);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = products.length - 1;
    let next = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    setActiveIndex(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section className="runway-section" aria-labelledby="runway-title">
      <div className="runway-intro">
        <h1 id="runway-title">เริ่มช้อป<br />ได้เลย !!!</h1>
        <form action="/search" className="runway-search" role="search">
          <SearchIcon />
          <input aria-label="ค้นหาสินค้า" name="q" placeholder="วันนี้กำลังมองหาอะไร?" />
          <button aria-label="ค้นหา" type="submit"><ArrowIcon /></button>
        </form>
      </div>

      <div className="runway-shell">
        <div className="route-labels" aria-hidden="true">
          <span>เครื่องเสียง</span><span>บ้าน</span><span>เดินทาง</span><span>สไตล์</span>
        </div>
        <div className="runway-track" role="tablist" aria-label="สินค้าแนะนำ">
          {products.map((product, index) => (
            <button
              aria-label={`ดู ${product.name}`}
              aria-controls="active-product-panel"
              aria-selected={activeIndex === index}
              className={`runway-stop ${activeIndex === index ? "is-active" : ""}`}
              id={`product-tab-${index}`}
              key={product.id}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => selectFromKeyboard(event, index)}
              ref={(element) => { tabsRef.current[index] = element; }}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
            >
              <span className="stop-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="stop-stage">
                <span className="stop-plinth" />
                <span className="stop-image"><Image alt="" fill sizes="(max-width: 700px) 80px, 24vw" src={product.image} /></span>
              </span>
              <span className="stop-name">{product.shortName}</span>
            </button>
          ))}
        </div>

        <div className="buying-dock" aria-live="polite" id="active-product-panel" role="tabpanel" aria-labelledby={`product-tab-${activeIndex}`}>
          <div className="dock-status"><span className="signal-dot" /> พร้อมจัดส่ง · เหลือ {active.stock} ชิ้น</div>
          <div className="dock-main">
            <div>
              <span className="dock-seller">{active.seller}</span>
              <h2>{active.name}</h2>
              <div className="dock-rating"><StarIcon size={15} /> {active.rating} <span>({active.reviewCount} รีวิว)</span></div>
            </div>
            <strong className="dock-price">{formatPrice(active.price)}</strong>
          </div>
          <div className="dock-actions">
            <div className="dock-delivery"><TruckIcon /><span>จัดส่งฟรี<br /><small>{active.delivery}</small></span></div>
            <Link className="button button-secondary" href={`/product/${active.slug}`}>ดูรายละเอียด</Link>
            <button className={`button button-primary ${added ? "is-success" : ""}`} onClick={addActive}>
              {added ? <><CheckIcon /> เพิ่มแล้ว</> : "เพิ่มลงตะกร้า"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
