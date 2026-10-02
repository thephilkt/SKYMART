import { cache } from "react";
import { categories as mockCategories, products as mockProducts } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import type { Category, Product } from "@/types";
import type { Database, Json } from "@/types/database";

type CatalogRow = Database["public"]["Views"]["public_product_catalog"]["Row"];

export type CatalogData = {
  products: Product[];
  categories: Category[];
  source: "supabase" | "mock";
};

function resolveImagePath(path: string | null) {
  if (!path) return "/products/headphone_2.jpg";
  if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://")) return path;

  const env = getSupabasePublicEnv();
  if (!env) return `/${path}`;
  return `${env.url}/storage/v1/object/public/product-images/${path}`;
}

function isJsonRecord(value: Json): value is { [key: string]: Json | undefined } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseColors(value: Json | null) {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!isJsonRecord(item)) return [];
    const name = item.name;
    const colorValue = item.value;
    return typeof name === "string" && typeof colorValue === "string"
      ? [{ name, value: colorValue }]
      : [];
  });
}

function parseSpecifications(value: Json | null) {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!isJsonRecord(item)) return [];
    const label = item.label;
    const specValue = item.value;
    return typeof label === "string" && typeof specValue === "string"
      ? [{ label, value: specValue }]
      : [];
  });
}

function mapProduct(row: CatalogRow): Product | null {
  if (!row.id || !row.slug || !row.name || !row.short_name || !row.category_slug || !row.shop_name) {
    return null;
  }

  const primaryImage = resolveImagePath(row.primary_image_path);
  const gallery = (row.gallery_paths ?? []).map(resolveImagePath);

  return {
    id: row.external_key ?? row.id,
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    description: row.description ?? "",
    price: Math.round((row.price_amount ?? 0) / 100),
    compareAtPrice: row.compare_at_amount ? Math.round(row.compare_at_amount / 100) : undefined,
    rating: Number(row.rating_average ?? 0),
    reviewCount: row.rating_count ?? 0,
    soldCount: row.sold_count ?? 0,
    image: primaryImage,
    gallery: gallery.length > 0 ? gallery : [primaryImage, primaryImage],
    categoryId: row.category_slug,
    seller: row.shop_name,
    sellerRating: Number(row.shop_rating ?? 0),
    delivery: "คาดว่าจะได้รับภายใน 2–4 วัน",
    stock: row.stock_available ?? 0,
    colors: parseColors(row.colors),
    specs: parseSpecifications(row.specifications),
  };
}

function mapCategories(rows: CatalogRow[]): Category[] {
  const unique = new Map<string, Category>();

  for (const row of rows) {
    if (!row.category_slug || !row.category_name || unique.has(row.category_slug)) continue;
    unique.set(row.category_slug, {
      id: row.category_slug,
      name: row.category_name,
      shortName: row.category_name,
      description: row.category_description ?? "",
      image: resolveImagePath(row.category_image_path),
    });
  }

  return [...unique.values()];
}

export const getCatalogData = cache(async (): Promise<CatalogData> => {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { products: mockProducts, categories: mockCategories, source: "mock" };

  const { data, error } = await supabase
    .from("public_product_catalog")
    .select("*")
    .order("sold_count", { ascending: false });

  if (error || !data?.length) {
    return { products: mockProducts, categories: mockCategories, source: "mock" };
  }

  const products = data.flatMap((row) => {
    const product = mapProduct(row);
    return product ? [product] : [];
  });

  if (!products.length) return { products: mockProducts, categories: mockCategories, source: "mock" };

  return {
    products,
    categories: mapCategories(data),
    source: "supabase",
  };
});

export async function getProductBySlug(slug: string) {
  const catalog = await getCatalogData();
  return catalog.products.find((product) => product.slug === slug);
}
