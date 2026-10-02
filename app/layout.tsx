import type { Metadata } from "next";
import "@fontsource-variable/anuphan";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: { default: "SKYMART — ของที่ใช่กำลังมาถึง", template: "%s | SKYMART" },
  description: "Marketplace ที่ช่วยให้ค้นหา เปรียบเทียบ และเลือกซื้อสินค้าได้อย่างชัดเจน",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหา</a>
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
