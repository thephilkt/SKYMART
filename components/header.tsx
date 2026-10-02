"use client";

import Link from "next/link";
import { useState } from "react";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";

export function Header() {
  const { itemCount, setCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button aria-expanded={menuOpen} aria-label="เปิดเมนู" className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </button>
        <Link aria-label="SKYMART หน้าแรก" className="brand" href="/">
          SKY<span>MART</span>
        </Link>
        <nav aria-label="เมนูหลัก" className={menuOpen ? "is-open" : ""}>
          <Link href="/search">สินค้าทั้งหมด</Link>
          <Link href="/#categories">หมวดหมู่</Link>
          <Link href="/orders">คำสั่งซื้อ</Link>
        </nav>
        <form action="/search" className="header-search" role="search">
          <SearchIcon size={18} />
          <input aria-label="ค้นหาสินค้า" name="q" placeholder="ค้นหาสินค้าที่ใช่" />
        </form>
        <div className="header-actions">
          <Link aria-label="บัญชีของฉัน" className="icon-button header-account" href="/account"><UserIcon /></Link>
          <button aria-label={`เปิดตะกร้า มีสินค้า ${itemCount} ชิ้น`} className="cart-button" onClick={() => setCartOpen(true)}>
            <BagIcon />
            <span className="cart-label">ตะกร้า</span>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
