import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand brand-light" href="/">SKY<span>MART</span></Link>
          <p>ของที่ใช่ เดินทางมาหาคุณอย่างชัดเจนและเป็นระบบ</p>
        </div>
        <div className="footer-links">
          <div><strong>เลือกซื้อ</strong><Link href="/search">สินค้าทั้งหมด</Link><Link href="/#categories">หมวดหมู่</Link><Link href="/orders">ติดตามคำสั่งซื้อ</Link></div>
          <div><strong>ช่วยเหลือ</strong><Link href="/help">ศูนย์ช่วยเหลือ</Link><Link href="/help#delivery">การจัดส่ง</Link><Link href="/help#returns">การคืนสินค้า</Link></div>
          <div><strong>เกี่ยวกับเรา</strong><Link href="/about">เรื่องของ SKYMART</Link><Link href="/seller">เริ่มขายสินค้า</Link><Link href="/privacy">ความเป็นส่วนตัว</Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 SKYMART</span><span>ข้อมูลและสินค้าบนเว็บไซต์ตัวอย่างนี้เป็นข้อมูลจำลอง</span></div>
    </footer>
  );
}
