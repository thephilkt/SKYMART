import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, HeartIcon, ShieldIcon, StarIcon, TruckIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { getCatalogData, getProductBySlug } from "@/lib/data/catalog";
import { formatPrice } from "@/lib/format";
import { products as mockProducts } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "ไม่พบสินค้า" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const { products } = await getCatalogData();
  const related = products.filter((item) => item.id !== product.id && item.categoryId === product.categoryId).concat(products.filter((item) => item.id !== product.id && item.categoryId !== product.categoryId)).slice(0, 3);

  return (
    <div className="product-page page-shell">
      <nav aria-label="เส้นทางนำทาง" className="breadcrumbs"><Link href="/">หน้าแรก</Link><span>/</span><Link href={`/search?category=${product.categoryId}`}>หมวดหมู่</Link><span>/</span><span>{product.shortName}</span></nav>
      <div className="product-hero">
        <div className="product-gallery">
          <div className="gallery-primary"><Image alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 58vw" src={product.image} /></div>
          <div className="gallery-secondary"><Image alt={`${product.name} มุมเพิ่มเติม`} fill sizes="(max-width: 900px) 100vw, 29vw" src={product.gallery[1]} /></div>
        </div>
        <div className="product-info">
          <div className="product-topline"><span>{product.seller}</span><button aria-label="เพิ่มในรายการโปรด" className="icon-button"><HeartIcon /></button></div>
          {product.badge && <p className="detail-badge">{product.badge}</p>}
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-rating-line"><span><StarIcon size={16} /> {product.rating}</span><span>{product.reviewCount} รีวิว</span><span>ขายแล้ว {product.soldCount.toLocaleString("th-TH")}</span></div>
          <div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div>
          <div className="delivery-note"><TruckIcon /><div><strong>จัดส่งฟรี</strong><span>{product.delivery}</span></div></div>
          <ProductPurchasePanel product={product} />
          <div className="safe-note"><ShieldIcon /><span>ระบบจะยืนยันยอดจากผู้ให้บริการชำระเงินก่อนเปลี่ยนสถานะคำสั่งซื้อ</span></div>
        </div>
      </div>

      <section className="product-specs" aria-labelledby="specs-title">
        <div><h2 id="specs-title">รายละเอียดที่ช่วยให้ตัดสินใจ</h2><p>ข้อมูลจำลองสำหรับทดสอบรูปแบบหน้าสินค้า</p></div>
        <dl>{product.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
      </section>

      <section className="seller-panel">
        <div className="seller-mark">{product.seller.slice(0, 2).toUpperCase()}</div>
        <div><span>จำหน่ายโดย</span><h2>{product.seller}</h2><p>คะแนนร้าน {product.sellerRating} · ตอบกลับภายในวันเดียว</p></div>
        <button className="button button-secondary">ดูหน้าร้าน</button>
      </section>

      <section className="related-products" aria-labelledby="related-title">
        <div className="section-heading split-heading"><h2 id="related-title">อาจเข้ากับสิ่งที่คุณกำลังหา</h2><Link href="/search">ดูทั้งหมด <ArrowIcon size={18} /></Link></div>
        <div className="product-grid product-grid-three">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </div>
  );
}
