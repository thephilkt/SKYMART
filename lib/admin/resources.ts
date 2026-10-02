export const adminResourceKeys = [
  "profiles",
  "shops",
  "categories",
  "products",
  "product-variants",
  "product-images",
  "inventory",
] as const;

export type AdminResourceKey = (typeof adminResourceKeys)[number];
export type AdminFieldType = "text" | "number" | "select" | "textarea" | "boolean";
export type AdminRecord = Record<string, string | number | boolean> & { id: string };

export type AdminField = {
  key: string;
  label: string;
  type: AdminFieldType;
  options?: readonly string[];
  required?: boolean;
};

export type AdminResource = {
  key: AdminResourceKey;
  table: "profiles" | "shops" | "categories" | "products" | "product_variants" | "product_images" | "inventory_levels";
  label: string;
  singular: string;
  description: string;
  primaryField: string;
  columns: readonly string[];
  fields: readonly AdminField[];
  records: readonly AdminRecord[];
};

const statusOptions = ["ACTIVE", "DRAFT", "PENDING_REVIEW", "SUSPENDED", "ARCHIVED"] as const;

export const adminResources: Record<AdminResourceKey, AdminResource> = {
  profiles: {
    key: "profiles", table: "profiles", label: "ผู้ใช้งาน", singular: "ผู้ใช้งาน", description: "บัญชี บทบาท และสถานะการใช้งาน", primaryField: "display_name",
    columns: ["display_name", "email", "role", "status"],
    fields: [
      { key: "display_name", label: "ชื่อที่แสดง", type: "text", required: true },
      { key: "email", label: "อีเมล", type: "text", required: true },
      { key: "role", label: "บทบาท", type: "select", options: ["USER", "ADMIN"], required: true },
      { key: "status", label: "สถานะ", type: "select", options: ["ACTIVE", "SUSPENDED", "DEACTIVATED"], required: true },
    ],
    records: [
      { id: "usr-001", display_name: "พิมพ์ชนก วัฒนะ", email: "pim@example.com", role: "USER", status: "ACTIVE" },
      { id: "usr-002", display_name: "ธนกฤต สุขใจ", email: "thanakrit@example.com", role: "ADMIN", status: "ACTIVE" },
      { id: "usr-003", display_name: "ณัฐชา คงดี", email: "natcha@example.com", role: "USER", status: "SUSPENDED" },
    ],
  },
  shops: {
    key: "shops", table: "shops", label: "ร้านค้า", singular: "ร้านค้า", description: "ข้อมูลร้าน เจ้าของ และสถานะการตรวจสอบ", primaryField: "name",
    columns: ["name", "slug", "status"],
    fields: [
      { key: "name", label: "ชื่อร้าน", type: "text", required: true }, { key: "slug", label: "Slug", type: "text", required: true },
      { key: "status", label: "สถานะ", type: "select", options: ["ACTIVE", "DRAFT", "PENDING_REVIEW", "REJECTED", "SUSPENDED"], required: true },
    ],
    records: [
      { id: "shop-001", name: "Northstar Audio", slug: "northstar-audio", owner: "พิมพ์ชนก วัฒนะ", status: "ACTIVE" },
      { id: "shop-002", name: "Morrow Living", slug: "morrow-living", owner: "วรพล ใจดี", status: "PENDING_REVIEW" },
    ],
  },
  categories: {
    key: "categories", table: "categories", label: "หมวดหมู่", singular: "หมวดหมู่", description: "โครงสร้างหมวดหมู่ที่ใช้ในหน้าร้าน", primaryField: "name",
    columns: ["name", "slug", "sort_order", "is_active"],
    fields: [
      { key: "name", label: "ชื่อหมวดหมู่", type: "text", required: true }, { key: "slug", label: "Slug", type: "text", required: true },
      { key: "sort_order", label: "ลำดับ", type: "number", required: true }, { key: "is_active", label: "เปิดใช้งาน", type: "boolean" },
    ],
    records: [
      { id: "cat-001", name: "เครื่องเสียง", slug: "audio", sort_order: 1, is_active: true },
      { id: "cat-002", name: "บ้านและไลฟ์สไตล์", slug: "home", sort_order: 2, is_active: true },
      { id: "cat-003", name: "ท่องเที่ยว", slug: "travel", sort_order: 3, is_active: true },
    ],
  },
  products: {
    key: "products", table: "products", label: "สินค้า", singular: "สินค้า", description: "รายการสินค้า เนื้อหา และสถานะเผยแพร่", primaryField: "name",
    columns: ["name", "shop", "category", "status"],
    fields: [
      { key: "name", label: "ชื่อสินค้า", type: "text", required: true }, { key: "slug", label: "Slug", type: "text", required: true },
      { key: "shop", label: "ร้านค้า", type: "text", required: true }, { key: "category", label: "หมวดหมู่", type: "text", required: true },
      { key: "description", label: "รายละเอียด", type: "textarea" }, { key: "status", label: "สถานะ", type: "select", options: statusOptions, required: true },
    ],
    records: [
      { id: "p-001", name: "Aerotone Headphones", slug: "aerotone-headphones", shop: "Northstar Audio", category: "เครื่องเสียง", description: "หูฟังไร้สายตัดเสียงรบกวน", status: "ACTIVE" },
      { id: "p-002", name: "Morrow Espresso Mini", slug: "morrow-espresso-mini", shop: "Morrow Living", category: "บ้านและไลฟ์สไตล์", description: "เครื่องชงเอสเปรสโซขนาดกะทัดรัด", status: "DRAFT" },
    ],
  },
  "product-variants": {
    key: "product-variants", table: "product_variants", label: "ตัวเลือกสินค้า", singular: "ตัวเลือกสินค้า", description: "SKU ราคา สี และตัวเลือกสำหรับการขาย", primaryField: "sku",
    columns: ["sku", "product", "price", "is_active"],
    fields: [
      { key: "sku", label: "SKU", type: "text", required: true }, { key: "product", label: "สินค้า", type: "text", required: true },
      { key: "price", label: "ราคา (บาท)", type: "number", required: true }, { key: "color", label: "สี", type: "text" }, { key: "is_active", label: "เปิดขาย", type: "boolean" },
    ],
    records: [
      { id: "var-001", sku: "AERO-GRAPHITE", product: "Aerotone Headphones", price: 2990, color: "Graphite", is_active: true },
      { id: "var-002", sku: "AERO-SKY", product: "Aerotone Headphones", price: 2990, color: "Sky", is_active: true },
    ],
  },
  "product-images": {
    key: "product-images", table: "product_images", label: "รูปสินค้า", singular: "รูปสินค้า", description: "ไฟล์ภาพ ลำดับ และภาพหลักของสินค้า", primaryField: "storage_path",
    columns: ["product", "storage_path", "sort_order", "is_primary"],
    fields: [
      { key: "product", label: "สินค้า", type: "text", required: true }, { key: "storage_path", label: "Storage path", type: "text", required: true },
      { key: "alt_text", label: "คำอธิบายภาพ", type: "text" }, { key: "sort_order", label: "ลำดับ", type: "number" }, { key: "is_primary", label: "ภาพหลัก", type: "boolean" },
    ],
    records: [
      { id: "img-001", product: "Aerotone Headphones", storage_path: "products/headphone_2.jpg", alt_text: "หูฟังสี Graphite", sort_order: 1, is_primary: true },
      { id: "img-002", product: "Morrow Espresso Mini", storage_path: "products/espresso.jpg", alt_text: "เครื่องชงกาแฟสี Steel", sort_order: 1, is_primary: true },
    ],
  },
  inventory: {
    key: "inventory", table: "inventory_levels", label: "คลังสินค้า", singular: "สต็อกสินค้า", description: "จำนวนพร้อมขาย จำนวนจอง และจุดแจ้งเตือน", primaryField: "sku",
    columns: ["sku", "on_hand", "reserved", "reorder_point"],
    fields: [
      { key: "sku", label: "SKU", type: "text", required: true }, { key: "on_hand", label: "คงเหลือ", type: "number", required: true },
      { key: "reserved", label: "จำนวนจอง", type: "number", required: true }, { key: "reorder_point", label: "จุดสั่งซื้อเพิ่ม", type: "number", required: true },
    ],
    records: [
      { id: "stock-001", sku: "AERO-GRAPHITE", on_hand: 42, reserved: 4, reorder_point: 10 },
      { id: "stock-002", sku: "AERO-SKY", on_hand: 8, reserved: 3, reorder_point: 10 },
    ],
  },
};

export function isAdminResourceKey(value: string): value is AdminResourceKey {
  return adminResourceKeys.includes(value as AdminResourceKey);
}

export function emptyAdminRecord(resource: AdminResource): AdminRecord {
  return resource.fields.reduce<AdminRecord>((record, field) => {
    record[field.key] = field.type === "boolean" ? false : field.type === "number" ? 0 : "";
    return record;
  }, { id: "" });
}
