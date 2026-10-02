"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartIcon, StarIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-card-image" href={`/product/${product.slug}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Image alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" src={product.image} />
      </Link>
      <button aria-label={`เพิ่ม ${product.name} ลงรายการโปรด`} className="product-heart"><HeartIcon size={19} /></button>
      <div className="product-card-copy">
        <p className="product-seller">{product.seller}</p>
        <Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <div className="product-meta"><span><StarIcon size={14} /> {product.rating}</span><span>ขายแล้ว {product.soldCount.toLocaleString("th-TH")}</span></div>
        <div className="product-card-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div>
      </div>
    </article>
  );
}
