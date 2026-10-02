import Link from "next/link";

export default function NotFound() {
  return <div className="state-page"><span className="empty-orbit" /><h1>เส้นทางนี้ยังไม่มีปลายทาง</h1><p>ลองกลับไปหน้าแรกหรือค้นหาสินค้าที่ต้องการ</p><Link className="button button-primary" href="/">กลับหน้าแรก</Link></div>;
}
