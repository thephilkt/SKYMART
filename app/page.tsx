import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductRunway } from "@/components/product-runway";
import { getCatalogData } from "@/lib/data/catalog";

export default async function HomePage() {
  const { categories, products } = await getCatalogData();
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <ProductRunway products={featuredProducts} />

      <section className="category-route" id="categories" aria-labelledby="category-title">
        <div className="section-heading route-heading">
          <h2 id="category-title">เลือกเส้นทางที่ตรงกับวันนี้</h2>
          <p>เริ่มจากสิ่งที่ต้องการ แล้วค่อยสำรวจตัวเลือกที่เข้ากัน</p>
        </div>
        <div className="category-list">
          {categories.map((category, index) => (
            <Link className="category-row" href={`/search?category=${category.id}`} key={category.id}>
              <span className="category-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="category-photo"><Image alt="" fill sizes="180px" src={category.image} /></span>
              <span className="category-copy"><strong>{category.shortName}</strong><span>{category.name}</span></span>
              <span className="category-description">{category.description}</span>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className="product-discovery" aria-labelledby="discovery-title">
        <div className="section-heading split-heading">
          <h2 id="discovery-title">สินค้าที่น่าหยุดดู</h2>
          <Link href="/search">ดูสินค้าทั้งหมด <ArrowIcon size={18} /></Link>
        </div>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="trust-strip" aria-label="ความมั่นใจในการซื้อ">
        <div><TruckIcon /><span><strong>เห็นวันส่งก่อนจ่าย</strong>ไม่มีค่าใช้จ่ายที่มาทีหลัง</span></div>
        <div><ShieldIcon /><span><strong>ชำระเงินอย่างเป็นระบบ</strong>สถานะทุกขั้นตรวจสอบได้</span></div>
        <div><CheckIcon /><span><strong>ข้อมูลสำคัญอยู่ครบ</strong>ราคา ร้านค้า สต็อก และรีวิว</span></div>
      </section>
    </>
  );
}
