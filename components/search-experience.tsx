"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import type { Category, Product } from "@/types";

type SearchExperienceProps = {
  categories: Category[];
  products: Product[];
  initialQuery?: string;
  initialCategory?: string;
};

export function SearchExperience({ categories, products, initialQuery = "", initialCategory = "" }: SearchExperienceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("recommended");
  const [inStock, setInStock] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !normalized || `${product.name} ${product.shortName} ${product.seller}`.toLowerCase().includes(normalized);
      const matchesCategory = !category || product.categoryId === category;
      return matchesQuery && matchesCategory && (!inStock || product.stock > 0);
    });
    return [...filtered].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.soldCount - a.soldCount);
  }, [products, query, category, sort, inStock]);

  return (
    <div className="search-page page-shell">
      <div className="search-title"><h1>ค้นหาใน SKYMART</h1><p>เห็นตัวเลือกเท่าที่จำเป็น แล้วค่อยเจาะรายละเอียดเมื่อพร้อม</p></div>
      <div className="search-command">
        <SearchIcon />
        <input aria-label="คำค้นหา" onChange={(event) => setQuery(event.target.value)} placeholder="สินค้า แบรนด์ หรือร้านค้า" value={query} />
        <span>{results.length} รายการ</span>
      </div>
      <div className="search-layout">
        <aside className="filters" aria-label="ตัวกรองสินค้า">
          <div className="filter-group"><h2>หมวดหมู่</h2><button className={!category ? "is-active" : ""} onClick={() => setCategory("")}>ทั้งหมด <span>{products.length}</span></button>{categories.map((item) => <button className={category === item.id ? "is-active" : ""} key={item.id} onClick={() => setCategory(item.id)}>{item.shortName}<span>{products.filter((product) => product.categoryId === item.id).length}</span></button>)}</div>
          <label className="toggle-row"><input checked={inStock} onChange={(event) => setInStock(event.target.checked)} type="checkbox" /><span>เฉพาะสินค้ามีสต็อก</span></label>
        </aside>
        <section className="results" aria-live="polite">
          <div className="results-toolbar"><p>{query ? <>ผลลัพธ์สำหรับ <strong>“{query}”</strong></> : "สินค้าทั้งหมด"}</p><label>เรียงตาม<select onChange={(event) => setSort(event.target.value)} value={sort}><option value="recommended">แนะนำ</option><option value="rating">คะแนนสูงสุด</option><option value="price-low">ราคาต่ำ–สูง</option><option value="price-high">ราคาสูง–ต่ำ</option></select></label></div>
          {results.length ? <div className="product-grid results-grid">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="no-results"><span className="empty-orbit" /><h2>ยังไม่พบสิ่งที่ตรงกัน</h2><p>ลองใช้คำที่สั้นลง หรือเลือกดูจากหมวดหมู่ทั้งหมด</p><button className="button button-secondary" onClick={() => { setQuery(""); setCategory(""); }}>ล้างตัวกรอง</button></div>}
        </section>
      </div>
    </div>
  );
}
