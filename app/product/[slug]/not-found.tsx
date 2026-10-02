import Link from "next/link";

export default function ProductNotFound() {
  return <div className="state-page"><span className="empty-orbit" /><h1>สินค้านี้ไม่ได้อยู่บนรางแล้ว</h1><p>สินค้าอาจถูกซ่อน หมดสต็อก หรือย้ายไปยังหน้าใหม่</p><Link className="button button-primary" href="/search">เลือกดูสินค้าอื่น</Link></div>;
}
